import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FileText,
  Shield,
  Fuel,
  AlertTriangle,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Settings,
} from 'lucide-react'
import { useAuth } from '../portal/context/AuthContext'
import { signOutAndRedirect } from '../lib/signOutUtils'

export default function AdminLayout({ children }) {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Clients', path: '/admin/clients', icon: Users },
    { name: 'ELD Reports', path: '/admin/eld-reports', icon: FileText },
    { name: 'CSA Scores', path: '/admin/csa-scores', icon: Shield },
    { name: 'IFTA', path: '/admin/ifta', icon: Fuel },
    { name: 'DataQ Disputes', path: '/admin/dataq', icon: AlertTriangle },
    { name: 'Driver Files', path: '/admin/driver-files', icon: Users },
    { name: 'Support Tickets', path: '/admin/tickets', icon: HelpCircle },
  ]

  async function handleSignOut() {
    try {
      console.log('Admin sign out initiated...')
      setSidebarOpen(false)
      
      // Use the comprehensive sign out utility
      await signOutAndRedirect()
      
    } catch (e) {
      console.error('Admin sign out error:', e)
      // Fallback: force redirect even if sign out fails
      window.location.href = `/login?_cb=${Date.now()}`
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {sidebarOpen ? (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      ) : null}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0d0d14] border-r border-fuchsia-500/20
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-fuchsia-500/20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-400 to-purple-500 flex items-center justify-center">
                <span className="font-orbitron font-bold text-black">GR</span>
              </div>
              <div>
                <h1 className="font-orbitron font-bold text-white text-sm">GHOST RIDER</h1>
                <p className="text-fuchsia-400 text-xs">Admin Portal</p>
              </div>
            </Link>

            <button
              className="absolute top-4 right-4 lg:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
              type="button"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 border-b border-fuchsia-500/20">
            <p className="text-white font-rajdhani font-semibold">Admin Dashboard</p>
            <p className="text-fuchsia-400 text-sm">{user?.email}</p>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                const Icon = item.icon

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg font-rajdhani font-medium
                        transition-all duration-200
                        ${isActive ? 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                      `}
                    >
                      <Icon size={20} />
                      <span>{item.name}</span>
                      {isActive ? <ChevronRight size={16} className="ml-auto" /> : null}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 pt-4 border-t border-cyan-500/30">
              <p className="text-xs text-cyan-400 font-rajdhani uppercase tracking-wider mb-2 px-4">Client Portal</p>
              <Link
                to="/app"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-rajdhani font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all duration-200"
              >
                <LayoutDashboard size={20} />
                <span>View as Client</span>
                <ChevronRight size={16} className="ml-auto" />
              </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-fuchsia-500/20">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-rajdhani font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
              type="button"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-fuchsia-500/20 px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)} type="button">
              <Menu size={24} />
            </button>

            <div className="ml-auto text-right">
              <p className="text-sm text-gray-400 font-rajdhani">Administrator</p>
              <p className="text-white font-rajdhani font-semibold">{user?.email}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>

        <footer className="border-t border-fuchsia-500/20 px-4 py-4 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-rajdhani">
            © 2026 Ghost Rider: Apex Operations • Admin Portal
          </p>
        </footer>
      </div>
    </div>
  )
}