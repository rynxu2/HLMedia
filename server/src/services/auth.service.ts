import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { signToken } from "../utils/jwt.js";

export async function login(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw Object.assign(new Error("Tên đăng nhập hoặc mật khẩu không đúng"), { status: 401 });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw Object.assign(new Error("Tên đăng nhập hoặc mật khẩu không đúng"), { status: 401 });

  const token = signToken({ userId: user.id, username: user.username });
  return {
    token,
    user: { id: user.id, username: user.username, displayName: user.displayName, role: user.role },
  };
}

export async function getMe(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });
  return { id: user.id, username: user.username, displayName: user.displayName, role: user.role };
}

export async function changePassword(userId: number, oldPassword: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });

  const valid = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!valid) throw Object.assign(new Error("Mật khẩu cũ không đúng"), { status: 400 });

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({ where: { id: userId }, data: { passwordHash } });
}
