import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Edit2, Trash2, Lock, Unlock, X, 
  CheckCircle, AlertCircle, Plus, Shield
} from "lucide-react";
import { userApi } from "../../lib/api";
import { useAuth } from "../../contexts/AuthContext";

const F = "'Plus Jakarta Sans', sans-serif";
const FB = "'Barlow Condensed', sans-serif";

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return 'Chưa đăng nhập';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Vừa xong';
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ngày trước`;
  return new Date(dateStr).toLocaleDateString('vi-VN');
}

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("Tất cả");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    display_name: "",
    role: "viewer",
    status: "active"
  });
  const [resetPassword, setResetPassword] = useState("");

  // Toasts
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" }[]>([]);

  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userApi.list();
      setUsers(data);
    } catch (error) {
      showToast("Lỗi khi tải danh sách người dùng", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openCreateModal = () => {
    setIsEditMode(false);
    setFormData({ email: "", password: "", display_name: "", role: "viewer", status: "active" });
    setIsModalOpen(true);
  };

  const openEditModal = (user: any) => {
    setIsEditMode(true);
    setSelectedUserId(user.id);
    setFormData({
      email: user.email,
      password: "",
      display_name: user.display_name,
      role: user.role,
      status: user.is_active ? "active" : "inactive"
    });
    setResetPassword("");
    setIsModalOpen(true);
  };

  const confirmDelete = (user: any) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await userApi.delete(userToDelete.id);
      showToast("Xóa người dùng thành công", "success");
      setDeleteModalOpen(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (error: any) {
      showToast(error.message || "Lỗi khi xóa người dùng", "error");
    }
  };

  const handleToggleStatus = async (user: any) => {
    try {
      const newIsActive = !user.is_active;
      await userApi.update(user.id, { is_active: newIsActive });
      showToast(`Đã ${newIsActive ? "kích hoạt" : "vô hiệu hóa"} người dùng`, "success");
      fetchUsers();
    } catch (error: any) {
      showToast(error.message || "Lỗi khi cập nhật trạng thái", "error");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && selectedUserId) {
        await userApi.update(selectedUserId, {
          display_name: formData.display_name,
          role: formData.role,
          is_active: formData.status === "active"
        });
        if (resetPassword) {
          await userApi.resetPassword(selectedUserId, resetPassword);
        }
        showToast("Cập nhật người dùng thành công", "success");
      } else {
        let finalEmail = formData.email.trim();
        if (!finalEmail.includes("@")) {
          finalEmail = `${finalEmail}@hlmedia.com.vn`;
        }
        await userApi.create({
          email: finalEmail,
          password: formData.password,
          display_name: formData.display_name,
          role: formData.role
        });
        showToast("Thêm người dùng thành công", "success");
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      showToast(error.message || "Đã xảy ra lỗi", "error");
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = (u.display_name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (u.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    const roleMapping: Record<string, string> = { "Super Admin": "super_admin", "Admin": "admin", "Viewer": "viewer" };
    const matchesRole = roleFilter === "Tất cả" || u.role === roleMapping[roleFilter];
    const matchesStatus = statusFilter === "Tất cả" || (statusFilter === "Hoạt động" ? u.is_active : !u.is_active);
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#e8edf7] shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#0d1b2a]" style={{ fontFamily: FB }}>Quản lý người dùng</h1>
          <p className="text-[#5a6a85] text-sm mt-1" style={{ fontFamily: F }}>
            {users.length} người dùng trong hệ thống
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-[#ff6b35] hover:bg-[#e65a28] text-white px-5 py-2.5 rounded-xl font-medium transition-all"
          style={{ fontFamily: F }}
        >
          <Plus size={18} />
          Thêm người dùng
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a6a85]" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e8edf7] bg-white focus:outline-none focus:border-[#0a2463] transition-colors"
            style={{ fontFamily: F }}
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-[#e8edf7] bg-white focus:outline-none focus:border-[#0a2463] text-[#0d1b2a] transition-colors"
          style={{ fontFamily: F }}
        >
          <option>Tất cả</option>
          <option>Super Admin</option>
          <option>Admin</option>
          <option>Viewer</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-[#e8edf7] bg-white focus:outline-none focus:border-[#0a2463] text-[#0d1b2a] transition-colors"
          style={{ fontFamily: F }}
        >
          <option>Tất cả</option>
          <option>Hoạt động</option>
          <option>Bị khóa</option>
        </select>
      </div>

      {/* Users List */}
      <div className="bg-white border border-[#e8edf7] rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-[#5a6a85]">
            <span className="w-8 h-8 border-3 border-[#0a2463]/20 border-t-[#0a2463] rounded-full animate-spin inline-block" />
            <p className="mt-4" style={{ fontFamily: F }}>Đang tải dữ liệu...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-[#f4f6fb] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-[#5a6a85]" />
            </div>
            <p className="text-[#0d1b2a] font-medium" style={{ fontFamily: F }}>Không tìm thấy người dùng nào</p>
            <p className="text-[#5a6a85] text-sm mt-1" style={{ fontFamily: F }}>Vui lòng thay đổi bộ lọc hoặc thêm mới.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#f4f6fb] border-b border-[#e8edf7] text-sm text-[#5a6a85]" style={{ fontFamily: F }}>
                  <th className="py-3 px-6 font-medium">Người dùng</th>
                  <th className="py-3 px-6 font-medium">Vai trò</th>
                  <th className="py-3 px-6 font-medium">Trạng thái</th>
                  <th className="py-3 px-6 font-medium">Đăng nhập lần cuối</th>
                  <th className="py-3 px-6 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const isSelf = currentUser?.id === u.id;
                  
                  return (
                    <tr key={u.id} className="border-b border-[#e8edf7] hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${
                            u.role === 'super_admin' ? 'bg-[#0a2463]' :
                            u.role === 'admin' ? 'bg-[#10b981]' : 'bg-[#94a3b8]'
                          }`} style={{ fontFamily: FB }}>
                            {(u.display_name || u.email).charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-[#0d1b2a] flex items-center gap-2" style={{ fontFamily: F }}>
                              {u.display_name}
                              {isSelf && <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">(Bạn)</span>}
                            </div>
                            <div className="text-sm text-[#5a6a85]" style={{ fontFamily: F }}>{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          u.role === 'super_admin' ? 'bg-[#0a2463]/10 text-[#0a2463]' :
                          u.role === 'admin' ? 'bg-[#10b981]/10 text-[#10b981]' :
                          'bg-[#94a3b8]/10 text-[#64748b]'
                        }`} style={{ fontFamily: F }}>
                          {u.role === 'super_admin' ? 'Super Admin' : u.role === 'admin' ? 'Admin' : 'Viewer'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          u.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`} style={{ fontFamily: F }}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                          {u.is_active ? 'Hoạt động' : 'Bị khóa'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-[#5a6a85]" style={{ fontFamily: F }}>
                        {timeAgo(u.last_sign_in_at)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {!isSelf && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleToggleStatus(u)}
                              className={`p-2 rounded-lg transition-colors ${
                                u.is_active ? 'text-amber-500 hover:bg-amber-50' : 'text-green-500 hover:bg-green-50'
                              }`}
                              title={u.is_active ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                            >
                              {u.is_active ? <Lock size={18} /> : <Unlock size={18} />}
                            </button>
                            <button
                              onClick={() => openEditModal(u)}
                              className="p-2 text-[#0a2463] hover:bg-[#0a2463]/10 rounded-lg transition-colors"
                              title="Chỉnh sửa"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => confirmDelete(u)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Xóa tài khoản"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add/Edit */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#e8edf7]">
                <h2 className="text-xl font-bold text-[#0d1b2a]" style={{ fontFamily: FB }}>
                  {isEditMode ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-[#5a6a85] hover:text-[#0d1b2a] transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0d1b2a] mb-1.5" style={{ fontFamily: F }}>Email</label>
                  <input
                    type="text"
                    required
                    disabled={isEditMode}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Nhập tên email (vd: hung hoặc hung@hlmedia.com.vn)"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e8edf7] bg-white focus:outline-none focus:border-[#0a2463] disabled:bg-gray-100 disabled:text-gray-500 transition-colors"
                    style={{ fontFamily: F }}
                  />
                  {!isEditMode && formData.email.trim() && (
                    <p className="text-xs text-[#5a6a85] mt-1 font-medium" style={{ fontFamily: F }}>
                      Email sẽ tạo: <span className="text-[#0a2463] font-bold">{formData.email.includes('@') ? formData.email.trim() : `${formData.email.trim()}@hlmedia.com.vn`}</span>
                    </p>
                  )}
                </div>
                {!isEditMode && (
                  <div>
                    <label className="block text-sm font-medium text-[#0d1b2a] mb-1.5" style={{ fontFamily: F }}>Mật khẩu</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e8edf7] bg-white focus:outline-none focus:border-[#0a2463] transition-colors"
                      style={{ fontFamily: F }}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-[#0d1b2a] mb-1.5" style={{ fontFamily: F }}>Tên hiển thị</label>
                  <input
                    type="text"
                    required
                    value={formData.display_name}
                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e8edf7] bg-white focus:outline-none focus:border-[#0a2463] transition-colors"
                    style={{ fontFamily: F }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0d1b2a] mb-1.5" style={{ fontFamily: F }}>Vai trò</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e8edf7] bg-white focus:outline-none focus:border-[#0a2463] transition-colors"
                    style={{ fontFamily: F }}
                  >
                    <option value="viewer">Viewer</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                {isEditMode && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#0d1b2a] mb-1.5" style={{ fontFamily: F }}>Trạng thái</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e8edf7] bg-white focus:outline-none focus:border-[#0a2463] transition-colors"
                        style={{ fontFamily: F }}
                      >
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Vô hiệu hóa</option>
                      </select>
                    </div>
                    <div className="pt-4 border-t border-[#e8edf7]">
                      <label className="block text-sm font-medium text-[#0d1b2a] mb-1.5" style={{ fontFamily: F }}>Đổi mật khẩu mới (tùy chọn)</label>
                      <input
                        type="password"
                        minLength={6}
                        placeholder="Để trống nếu không muốn đổi"
                        value={resetPassword}
                        onChange={(e) => setResetPassword(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e8edf7] bg-white focus:outline-none focus:border-[#0a2463] transition-colors"
                        style={{ fontFamily: F }}
                      />
                    </div>
                  </>
                )}
                
                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-[#5a6a85] hover:text-[#0d1b2a] transition-colors"
                    style={{ fontFamily: F }}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-[#0a2463] hover:bg-[#0a2463]/90 rounded-xl transition-all"
                    style={{ fontFamily: F }}
                  >
                    {isEditMode ? "Lưu thay đổi" : "Thêm người dùng"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} />
              </div>
              <h2 className="text-xl font-bold text-[#0d1b2a] mb-2" style={{ fontFamily: FB }}>Xác nhận xóa</h2>
              <p className="text-[#5a6a85] text-sm mb-6" style={{ fontFamily: F }}>
                Bạn có chắc chắn muốn xóa user <span className="font-semibold text-[#0d1b2a]">{userToDelete?.display_name}</span>? Hành động này không thể hoàn tác.
              </p>
              
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleDelete}
                  className="w-full py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all"
                  style={{ fontFamily: F }}
                >
                  Xóa người dùng
                </button>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="w-full py-2.5 text-sm font-medium text-[#5a6a85] hover:bg-gray-100 rounded-xl transition-all"
                  style={{ fontFamily: F }}
                >
                  Hủy bỏ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toasts */}
      <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${
                toast.type === "success" 
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
              style={{ fontFamily: F }}
            >
              {toast.type === "success" ? <CheckCircle size={20} className="text-green-500" /> : <AlertCircle size={20} className="text-red-500" />}
              <p className="text-sm font-medium">{toast.message}</p>
              <button 
                onClick={() => setToasts(toasts.filter(t => t.id !== toast.id))}
                className="ml-2 text-current opacity-50 hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
