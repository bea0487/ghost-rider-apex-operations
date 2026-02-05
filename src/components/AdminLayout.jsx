import React from 'react'
import { useAuth } from '../portal/context/AuthContext'
import { signOutAndRedirect } from '../lib/signOutUtils'
import Button from './Button'

export default function AdminLayout({ children, right }) {
  const { user } = useAuth()

  async function handleSignOut() {
    try {
      console.log('Admin sign out initiated...')
      await signOutAndRedirect()
    } catch (e) {
      console.error('Admin sign out error:', e)
      // Fallback: force redirect even if sign out fails
      window.location.href = `/login?_cb=${Date.now()}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Ghost Rider Admin</h1>
            {user?.email && (
              <p className="text-sm text-gray-400">Logged in as: {user.email}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {right}
            <Button 
              onClick={handleSignOut}
              variant="cyberOutline"
              size="sm"
              type="button"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}