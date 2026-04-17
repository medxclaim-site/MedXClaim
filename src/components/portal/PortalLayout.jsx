import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import {
  LayoutDashboard,
  FileText,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { auth } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/portal/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/portal/claims', label: 'Claim Status', Icon: FileText },
  { to: '/portal/settings', label: 'Settings', Icon: Settings },
];

const SUPER_ADMIN_NAV = [
  { to: '/portal/super-admin', label: 'Organizations', Icon: Building2 },
];

const NavItem = ({ to, label, Icon, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
        isActive
          ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`
    }
  >
    <Icon size={18} />
    {label}
  </NavLink>
);

const PortalLayout = () => {
  const { user, role, isSuperAdmin, workspace } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login', { replace: true });
  };

  const displayName =
    workspace?.profile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'User';
  const orgName = workspace?.organization?.name || 'MedXClaim Portal';

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10">
        <p className="text-xs uppercase tracking-widest text-blue-400 mb-0.5">MedXClaim</p>
        <p className="text-white font-semibold text-sm truncate">{orgName}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {isSuperAdmin ? (
          SUPER_ADMIN_NAV.map((item) => (
            <NavItem key={item.to} {...item} onClick={() => setMobileOpen(false)} />
          ))
        ) : (
          NAV_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} onClick={() => setMobileOpen(false)} />
          ))
        )}
      </nav>

      {/* User footer */}
      <div className="px-3 pb-4 border-t border-white/10 pt-4 space-y-2">
        {isSuperAdmin && (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-600/10 border border-purple-500/20">
            <Shield size={13} className="text-purple-400" />
            <span className="text-xs text-purple-300">{role}</span>
          </div>
        )}
        <div className="px-4 py-2">
          <p className="text-sm font-medium text-white truncate">{displayName}</p>
          <p className="text-xs text-slate-400 truncate">{user?.email}</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 flex-shrink-0 bg-slate-900/80 border-r border-white/10 backdrop-blur-sm">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-10 flex flex-col w-64 bg-slate-900 border-r border-white/10">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-slate-900/80 border-b border-white/10 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="text-slate-400 hover:text-white"
          >
            <Menu size={22} />
          </button>
          <span className="text-white font-semibold text-sm">MedXClaim</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
