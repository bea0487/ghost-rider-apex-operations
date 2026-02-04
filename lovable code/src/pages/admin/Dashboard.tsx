import { Link } from "react-router-dom";
import { 
  LayoutDashboard, Users, FileText, Bell, Settings, LogOut, 
  Truck, Plus, Search, MoreHorizontal, TrendingUp, UserCheck,
  AlertTriangle, CheckCircle, Clock, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard", active: true },
  { name: "Clients", icon: Users, path: "/admin/clients" },
  { name: "Reports", icon: FileText, path: "/admin/reports" },
  { name: "Support Tickets", icon: Bell, path: "/admin/tickets", badge: 5 },
  { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

const recentClients = [
  { name: "ABC Trucking LLC", tier: "Apex Command", trucks: 25, status: "active" },
  { name: "Highway Express", tier: "Guardian", trucks: 12, status: "active" },
  { name: "Lone Star Transport", tier: "Wingman", trucks: 5, status: "pending" },
  { name: "Mountain Freight Co", tier: "Back Office", trucks: 45, status: "active" },
  { name: "Swift Logistics", tier: "Virtual Dispatcher", trucks: 18, status: "review" },
];

const pendingTasks = [
  { title: "Review IFTA Report - ABC Trucking", priority: "high", due: "Today" },
  { title: "Process DataQ Dispute - Highway Express", priority: "high", due: "Today" },
  { title: "DQ File Audit - Mountain Freight", priority: "medium", due: "Tomorrow" },
  { title: "CSA Score Update - All Clients", priority: "low", due: "This Week" },
];

const stats = [
  { label: "Total Clients", value: "127", trend: "+8%", icon: Users },
  { label: "Active Trucks", value: "1,842", trend: "+12%", icon: Truck },
  { label: "Open Tickets", value: "23", trend: "-5%", icon: Bell },
  { label: "Avg Compliance", value: "96.4%", trend: "+1.2%", icon: TrendingUp },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:w-64 flex-col fixed inset-y-0 z-50 bg-card border-r border-border/50">
        <div className="p-6 border-b border-border/50">
          <Link to="/" className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-accent" />
            <div>
              <span className="font-display text-lg cyber-gradient-text block">GHOST RIDER</span>
              <span className="text-xs text-accent tracking-widest">ADMIN PORTAL</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-heading transition-colors",
                link.active 
                  ? "bg-accent/10 text-accent" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
              {link.badge && (
                <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-destructive text-destructive-foreground rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
              <span className="text-xs font-bold text-background">BS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-heading text-foreground truncate">Britney Stovall</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-heading text-muted-foreground hover:bg-muted hover:text-destructive transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search clients, reports, tickets..." 
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="cyber" size="sm">
                <Plus className="w-4 h-4" />
                Add Client
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="p-6 rounded-xl bg-card border border-border/50 cyber-hover">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className={cn(
                    "text-sm",
                    stat.trend.startsWith("+") ? "text-green-400" : "text-red-400"
                  )}>{stat.trend}</span>
                </div>
                <p className="text-3xl font-display text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Clients */}
            <div className="lg:col-span-2 rounded-xl bg-card border border-border/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading text-foreground">Recent Clients</h2>
                <Button variant="cyberGhost" size="sm">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-2 text-sm font-heading text-muted-foreground">Client</th>
                      <th className="text-left py-3 px-2 text-sm font-heading text-muted-foreground">Tier</th>
                      <th className="text-left py-3 px-2 text-sm font-heading text-muted-foreground">Trucks</th>
                      <th className="text-left py-3 px-2 text-sm font-heading text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentClients.map((client, index) => (
                      <tr key={index} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-2">
                          <span className="font-heading text-foreground">{client.name}</span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="text-sm text-muted-foreground">{client.tier}</span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="text-sm text-muted-foreground">{client.trucks}</span>
                        </td>
                        <td className="py-4 px-2">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold uppercase",
                            client.status === "active" && "bg-green-500/20 text-green-400",
                            client.status === "pending" && "bg-yellow-500/20 text-yellow-400",
                            client.status === "review" && "bg-orange-500/20 text-orange-400"
                          )}>
                            {client.status === "active" && <CheckCircle className="w-3 h-3" />}
                            {client.status === "pending" && <Clock className="w-3 h-3" />}
                            {client.status === "review" && <AlertTriangle className="w-3 h-3" />}
                            {client.status}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right">
                          <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="rounded-xl bg-card border border-border/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading text-foreground">Pending Tasks</h2>
                <span className="px-2 py-1 text-xs font-bold bg-accent/20 text-accent rounded">
                  {pendingTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {pendingTasks.map((task, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-2",
                        task.priority === "high" && "bg-destructive",
                        task.priority === "medium" && "bg-yellow-500",
                        task.priority === "low" && "bg-green-500"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-heading text-foreground">{task.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">Due: {task.due}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="cyberOutline" className="w-full mt-4">
                View All Tasks
              </Button>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl cyber-gradient-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-display text-foreground">89%</p>
                  <p className="text-sm text-muted-foreground">Client Retention Rate</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl cyber-gradient-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-display text-foreground">2.4h</p>
                  <p className="text-sm text-muted-foreground">Avg Ticket Response</p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl cyber-gradient-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-display text-foreground">342</p>
                  <p className="text-sm text-muted-foreground">Reports This Month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
