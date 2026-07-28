import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
}

function getErrorMessage(err: unknown): string {
  if (!err) return 'Unknown error'
  if (typeof err === 'string') return err
  const anyErr = err as Record<string, unknown>
  const parts: string[] = []

  try {
    const names = Object.getOwnPropertyNames(err)
    for (const name of names) {
      const val = (err as Record<string, unknown>)[name]
      if (val !== undefined && val !== null && typeof val !== 'function') {
        const strVal = typeof val === 'object' ? JSON.stringify(val) : String(val)
        if (strVal && strVal !== '{}') {
          parts.push(`${name}: ${strVal}`)
        }
      }
    }
  } catch {
    // Fallback if property inspection fails
  }

  if (parts.length > 0) return parts.join(' | ')
  return String(err)
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function errorResponse(err: unknown, status = 400) {
  const msg = getErrorMessage(err)
  return new Response(JSON.stringify({ error: msg, message: msg, details: msg }), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'X-Error-Message': encodeURIComponent(msg),
    },
  })
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = 'https://uxfynvdyginufrsvkzmb.supabase.co'
    const rawKey = Deno.env.get('SERVICE_ROLE_KEY') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const serviceRoleKey = rawKey.trim().replace(/^["']|["']$/g, '')

    if (!serviceRoleKey) {
      return errorResponse('Chưa cấu hình secret SERVICE_ROLE_KEY cho Edge Function.', 500)
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization')
    if (!authHeader) {
      return errorResponse('Thiếu Authorization header', 401)
    }

    const token = authHeader.replace(/^Bearer\s+/i, '')
    const { data: { user: caller }, error: authError } = await supabaseAdmin.auth.getUser(token)

    if (authError || !caller) {
      return errorResponse(`Xác thực thất bại: ${getErrorMessage(authError || 'Token không hợp lệ')}`, 401)
    }

    const { data: callerProfile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', caller.id)
      .maybeSingle()

    if (profileError || !callerProfile) {
      return errorResponse(`Không tìm thấy profile của tài khoản admin (id: ${caller.id})`, 403)
    }

    if (callerProfile?.role !== 'super_admin') {
      return errorResponse(`Tài khoản của bạn có quyên '${callerProfile?.role || 'viewer'}', cần quyền 'super_admin' để thực hiện`, 403)
    }

    const url = new URL(req.url)
    const pathParts = url.pathname.split('/').filter(Boolean)
    const baseIdx = pathParts.indexOf('admin-users')
    const userId = (baseIdx !== -1 && pathParts[baseIdx + 1]) ? pathParts[baseIdx + 1] : null
    const action = (baseIdx !== -1 && pathParts[baseIdx + 2]) ? pathParts[baseIdx + 2] : null

    switch (req.method) {
      case 'GET': {
        const { data: listData, error: listError } = await supabaseAdmin.auth.admin.listUsers()
        if (listError) return errorResponse(listError, 400)

        const { data: profiles, error: pErr } = await supabaseAdmin.from('profiles').select('*')
        if (pErr) return errorResponse(pErr, 400)

        const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]))

        const users = listData.users.map((u) => ({
          id: u.id,
          email: u.email,
          display_name: profileMap.get(u.id)?.display_name ?? u.email,
          role: profileMap.get(u.id)?.role ?? 'viewer',
          is_active: profileMap.get(u.id)?.is_active ?? true,
          created_at: u.created_at,
          last_sign_in_at: u.last_sign_in_at,
        }))
        return jsonResponse(users)
      }

      case 'POST': {
        const body = await req.json().catch(() => ({}))

        if (action === 'reset-password' && userId) {
          if (!body.password || body.password.length < 6) {
            return errorResponse('Mật khẩu phải có ít nhất 6 ký tự', 400)
          }
          const { error: resetErr } = await supabaseAdmin.auth.admin.updateUserById(userId, {
            password: body.password,
          })
          if (resetErr) return errorResponse(resetErr, 400)
          return jsonResponse({ success: true })
        }

        const { email, password, display_name, role } = body
        if (!email || !password) {
          return errorResponse('Email và mật khẩu là bắt buộc', 400)
        }
        if (password.length < 6) {
          return errorResponse('Mật khẩu phải có ít nhất 6 ký tự', 400)
        }

        let resUser = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { display_name: display_name || email, role: role || 'viewer' },
        })

        if (resUser.error && (resUser.error.name === 'AuthRetryableFetchError' || String(resUser.error).includes('AuthRetryableFetchError'))) {
          resUser = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            user_metadata: { display_name: display_name || email, role: role || 'viewer' },
          })
        }

        if (resUser.error) {
          return errorResponse(resUser.error, 400)
        }

        const newUser = resUser.data

        if (newUser.user && (role || display_name)) {
          const { error: upErr } = await supabaseAdmin
            .from('profiles')
            .upsert({
              id: newUser.user.id,
              username: email,
              role: role || 'viewer',
              display_name: display_name || email,
            })
          if (upErr) return errorResponse(upErr, 400)
        }

        return jsonResponse(
          {
            id: newUser.user?.id,
            email: newUser.user?.email,
            display_name: display_name || email,
            role: role || 'viewer',
            is_active: true,
            created_at: newUser.user?.created_at,
            last_sign_in_at: null,
          },
          201
        )
      }

      case 'PATCH': {
        if (!userId) return errorResponse('User ID required', 400)

        const body = await req.json().catch(() => ({}))
        if (userId === caller.id && (body.role !== undefined || body.is_active !== undefined)) {
          return errorResponse('Không thể thay đổi quyền hoặc trạng thái của chính mình', 400)
        }

        const updateData: Record<string, unknown> = {}
        if (body.display_name !== undefined) updateData.display_name = body.display_name
        if (body.role !== undefined) updateData.role = body.role
        if (body.is_active !== undefined) updateData.is_active = body.is_active

        const { data: updated, error: updateError } = await supabaseAdmin
          .from('profiles')
          .upsert({ id: userId, ...updateData })
          .select()
          .single()
        if (updateError) return errorResponse(updateError, 400)

        if (body.is_active === false) {
          await supabaseAdmin.auth.admin.updateUserById(userId, { ban_duration: '876000h' })
        } else if (body.is_active === true) {
          await supabaseAdmin.auth.admin.updateUserById(userId, { ban_duration: 'none' })
        }

        return jsonResponse(updated)
      }

      case 'DELETE': {
        if (!userId) return errorResponse('User ID required', 400)
        if (userId === caller.id) return errorResponse('Không thể xóa tài khoản của chính mình', 400)

        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId)
        if (deleteError) return errorResponse(deleteError, 400)

        return jsonResponse({ success: true })
      }

      default:
        return jsonResponse({ error: 'Method not allowed' }, 405)
    }
  } catch (err: unknown) {
    return errorResponse(err, 500)
  }
})
