import { supabase } from './supabaseClient'

// Create a new client
export async function createClient({ email, companyName, clientId, tier = 'wingman' }) {
  try {
    // First, invite the user to create an account
    const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email)
    
    if (inviteError) {
      throw new Error(`Failed to invite user: ${inviteError.message}`)
    }
    
    // Create the client record
    const { data, error } = await supabase
      .from('clients')
      .insert({
        user_id: inviteData.user.id,
        email,
        company_name: companyName,
        client_id: clientId,
        tier
      })
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to create client: ${error.message}`)
    }
    
    return { success: true, client: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get all clients (admin only)
export async function getAllClients() {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw new Error(`Failed to fetch clients: ${error.message}`)
    }
    
    return { success: true, clients: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Update client tier
export async function updateClientTier(clientId, newTier) {
  try {
    const { data, error } = await supabase
      .from('clients')
      .update({ tier: newTier })
      .eq('id', clientId)
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to update client tier: ${error.message}`)
    }
    
    return { success: true, client: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Create ELD Report
export async function createELDReport({ clientId, weekStart, violations = 0, correctiveActions = '', reportNotes = '' }) {
  try {
    const { data, error } = await supabase
      .from('eld_reports')
      .insert({
        client_id: clientId,
        week_start: weekStart,
        violations,
        corrective_actions: correctiveActions,
        report_notes: reportNotes
      })
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to create ELD report: ${error.message}`)
    }
    
    return { success: true, report: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Get reports for a client based on their tier
export async function getClientReports(clientId, tier) {
  try {
    const reports = {}
    
    // All tiers get ELD reports and support tickets
    const { data: eldReports } = await supabase
      .from('eld_reports')
      .select('*')
      .eq('client_id', clientId)
      .order('week_start', { ascending: false })
    
    const { data: supportTickets } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
    
    reports.eldReports = eldReports || []
    reports.supportTickets = supportTickets || []
    
    // Guardian and above get IFTA and Driver Files
    if (['guardian', 'apex_command', 'virtual_dispatcher', 'back_office_command'].includes(tier)) {
      const { data: iftaRecords } = await supabase
        .from('ifta_records')
        .select('*')
        .eq('client_id', clientId)
        .order('year', { ascending: false })
      
      const { data: driverFiles } = await supabase
        .from('driver_files')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false })
      
      reports.iftaRecords = iftaRecords || []
      reports.driverFiles = driverFiles || []
    }
    
    // Apex Command gets CSA Scores and DataQ Disputes
    if (['apex_command', 'back_office_command'].includes(tier)) {
      const { data: csaScores } = await supabase
        .from('csa_scores')
        .select('*')
        .eq('client_id', clientId)
        .order('score_date', { ascending: false })
      
      const { data: dataqDisputes } = await supabase
        .from('dataq_disputes')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false })
      
      reports.csaScores = csaScores || []
      reports.dataqDisputes = dataqDisputes || []
    }
    
    // Virtual Dispatcher gets load schedules, broker packets, revenue reports
    if (['virtual_dispatcher', 'back_office_command'].includes(tier)) {
      const { data: loadSchedules } = await supabase
        .from('load_schedules')
        .select('*')
        .eq('client_id', clientId)
        .order('pickup_date', { ascending: false })
      
      const { data: brokerPackets } = await supabase
        .from('broker_packets')
        .select('*')
        .eq('client_id', clientId)
        .order('uploaded_at', { ascending: false })
      
      const { data: revenueReports } = await supabase
        .from('weekly_revenue_reports')
        .select('*')
        .eq('client_id', clientId)
        .order('week_start', { ascending: false })
      
      reports.loadSchedules = loadSchedules || []
      reports.brokerPackets = brokerPackets || []
      reports.revenueReports = revenueReports || []
    }
    
    // DOT Readiness Audit
    if (['dot_readiness_audit', 'back_office_command'].includes(tier)) {
      const { data: dotAudits } = await supabase
        .from('dot_audits')
        .select('*')
        .eq('client_id', clientId)
        .order('audit_date', { ascending: false })
      
      reports.dotAudits = dotAudits || []
    }
    
    return { success: true, reports }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Create support ticket
export async function createSupportTicket({ clientId, subject, message, priority = 'Medium' }) {
  try {
    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        client_id: clientId,
        subject,
        message,
        priority
      })
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to create support ticket: ${error.message}`)
    }
    
    return { success: true, ticket: data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}