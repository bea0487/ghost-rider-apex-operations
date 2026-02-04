import React, { useState, useEffect } from 'react'
import { useAuth } from '../portal/context/AuthContext'
import { getAllClients, createClient, updateClientTier, createELDReport } from '../lib/clientManagement'
import { supabase } from '../lib/supabaseClient'
import AdminLayout from '../components/AdminLayout'
import AdminSetup from '../components/AdminSetup'
import Button from './Button'
import Input from './Input'
import Field from './Field'
import Modal from './Modal'

const TIER_OPTIONS = [
  { value: 'wingman', label: 'Wingman' },
  { value: 'guardian', label: 'Guardian' },
  { value: 'apex_command', label: 'Apex Command' },
  { value: 'virtual_dispatcher', label: 'Virtual Dispatcher' },
  { value: 'ala_carte', label: 'A La Carte' },
  { value: 'eld_monitoring_only', label: 'ELD Monitoring Only' },
  { value: 'back_office_command', label: 'Back Office Command' },
  { value: 'dot_readiness_audit', label: 'DOT Readiness Audit' }
]

export default function AdminDashboard() {
  const { isAdmin } = useAuth()
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // New client form
  const [newClient, setNewClient] = useState({
    email: '',
    companyName: '',
    clientId: '',
    tier: 'wingman'
  })

  // New report form
  const [newReport, setNewReport] = useState({
    weekStart: '',
    violations: 0,
    correctiveActions: '',
    reportNotes: ''
  })

  useEffect(() => {
    if (isAdmin) {
      loadClients()
    }
  }, [isAdmin])

  const loadClients = async () => {
    setLoading(true)
    const result = await getAllClients()
    if (result.success) {
      setClients(result.clients)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  const handleCreateClient = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    console.log('Creating client with data:', newClient)

    // Validate required fields
    if (!newClient.email || !newClient.companyName || !newClient.clientId) {
      setError('All fields are required')
      return
    }

    try {
      // Check if user is actually admin
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Current session user:', session?.user?.email)
      console.log('User app_metadata:', session?.user?.app_metadata)
      
      if (!session?.user?.app_metadata?.role === 'admin') {
        setError('You must be an admin to create clients. Please refresh the page after setting up admin access.')
        return
      }

      const result = await createClient(newClient)
      console.log('Client creation result:', result)
      
      if (result.success) {
        setSuccess(result.message || 'Client created successfully!')
        setNewClient({ email: '', companyName: '', clientId: '', tier: 'wingman' })
        setShowCreateModal(false)
        loadClients()
      } else {
        setError(result.error || 'Failed to create client')
      }
    } catch (err) {
      console.error('Client creation error:', err)
      setError(err.message || 'An unexpected error occurred')
    }
  }

  const handleUpdateTier = async (clientId, newTier) => {
    const result = await updateClientTier(clientId, newTier)
    if (result.success) {
      setSuccess('Client tier updated successfully!')
      loadClients()
    } else {
      setError(result.error)
    }
  }

  const handleCreateReport = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const result = await createELDReport({
      clientId: selectedClient.id,
      ...newReport
    })

    if (result.success) {
      setSuccess('ELD Report created successfully!')
      setNewReport({ weekStart: '', violations: 0, correctiveActions: '', reportNotes: '' })
      setShowReportModal(false)
      setSelectedClient(null)
    } else {
      setError(result.error)
    }
  }

  if (!isAdmin) {
    return (
      <AdminLayout>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
          <AdminSetup />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex space-x-3">
          <Button onClick={() => window.location.reload()} variant="cyberOutline">
            Refresh Page
          </Button>
          <Button onClick={() => setShowCreateModal(true)} variant="cyber">
            Create New Client
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="text-gray-400">Loading clients...</div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Client ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {client.company_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {client.client_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={client.tier}
                      onChange={(e) => handleUpdateTier(client.id, e.target.value)}
                      className="bg-gray-600 text-white rounded px-2 py-1 text-sm"
                    >
                      {TIER_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button
                      size="sm"
                      variant="cyberOutline"
                      onClick={() => {
                        setSelectedClient(client)
                        setShowReportModal(true)
                      }}
                    >
                      Create Report
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Client Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Client"
      >
        <form onSubmit={handleCreateClient} className="space-y-4">
          <Field label="Email">
            <Input
              type="email"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              required
            />
          </Field>
          
          <Field label="Company Name">
            <Input
              value={newClient.companyName}
              onChange={(e) => setNewClient({ ...newClient, companyName: e.target.value })}
              required
            />
          </Field>
          
          <Field label="Client ID">
            <Input
              value={newClient.clientId}
              onChange={(e) => setNewClient({ ...newClient, clientId: e.target.value })}
              placeholder="DOT Number or custom ID"
              required
            />
          </Field>
          
          <Field label="Service Tier">
            <select
              value={newClient.tier}
              onChange={(e) => setNewClient({ ...newClient, tier: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {TIER_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="cyberGhost" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="cyber">Create Client</Button>
          </div>
        </form>
      </Modal>

      {/* Create Report Modal */}
      <Modal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false)
          setSelectedClient(null)
        }}
        title={`Create ELD Report for ${selectedClient?.company_name}`}
      >
        <form onSubmit={handleCreateReport} className="space-y-4">
          <Field label="Week Start Date">
            <Input
              type="date"
              value={newReport.weekStart}
              onChange={(e) => setNewReport({ ...newReport, weekStart: e.target.value })}
              required
            />
          </Field>
          
          <Field label="Violations Count">
            <Input
              type="number"
              min="0"
              value={newReport.violations}
              onChange={(e) => setNewReport({ ...newReport, violations: parseInt(e.target.value) || 0 })}
            />
          </Field>
          
          <Field label="Corrective Actions">
            <textarea
              value={newReport.correctiveActions}
              onChange={(e) => setNewReport({ ...newReport, correctiveActions: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="3"
            />
          </Field>
          
          <Field label="Report Notes">
            <textarea
              value={newReport.reportNotes}
              onChange={(e) => setNewReport({ ...newReport, reportNotes: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="3"
            />
          </Field>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="cyberGhost" 
              onClick={() => {
                setShowReportModal(false)
                setSelectedClient(null)
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="cyber">Create Report</Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  )
}