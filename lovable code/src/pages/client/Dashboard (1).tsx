import { Link } from "react-router-dom";
import { 
  LayoutDashboard, FileText, Upload, Download, MessageSquare, 
  Bell, Settings, LogOut, Truck, ChevronRight, AlertCircle,
  CheckCircle, Clock, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/client/dashboard", active: true },
  { name: "Reports", icon: FileText, path: "/client/reports" },
  { name: "Documents", icon: Upload, path: "/client/documents" },
  { name: "Downloads", icon: Download, path: "/client/downloads" },
  { name: "Messages", icon: MessageSquare, path: "/client/messages", badge: 2 },
  { name: "Support Tickets", icon: Bell, path: "/client/tickets", badge: 1 },
  { name: "Settings", icon: Settings, path: "/client/settings" },
];

const actionItems = [
  { 
    title: "Driver Medical Card Expiring", 
    description: "John Smith's medical card expires in 15 days",
    priority: "high",
    date: "Feb 19, 2026"
  },
  { 
    title: "IFTA Report Ready", 
    description: "Q4 2025 IFTA report is ready for review",
    priority: "medium",
    date: "Feb 3, 2026"
  },
  { 
    title: "ELD Violation Alert", 
    description: "HOS violation detected - Driver #1042",
    priority: "high",
    date: "Feb 4, 2026"
  },
];

const recentReports = [
  { name: "ELD Monitoring Report", date: "Feb 1, 2026", type: "ELD" },
  { name: "DQ File Summary", date: "Jan 28, 2026", type: "DQ" },
  { name: "CSA Score Update", date: "Jan 25, 2026", type: "CSA" },
];

const stats = [
  { label: "Compliance Score", value: "94%", trend: "+2%", icon: TrendingUp },
  { label: "Active Drivers", value: "12", trend: null, icon: CheckCircle },
  { label: "Pending Actions", value: "3", trend: null, icon: AlertCircle },
  { label: "Open Tickets", value: "1", trend: null, icon: Clock },
];

export default function ClientDashboard() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:w-64 flex-col fixed inset-y-0 z-50 bg-card border-r border-border/50">
        <div className="p-6 border-b border-border/50">
          <Link to="/" className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-primary" />
            <div>
              <span className="font-display text-lg cyber-gradient-text block">GHOST RIDER</span>
              <span className="text-xs text-muted-foreground tracking-widest">CLIENT PORTAL</span>
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
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
              {link.badge && (
                <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-accent text-accent-foreground rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Demo Client</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="cyberOutline" size="sm">
                <Bell className="w-4 h-4" />
                Notifications
              </Button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-sm font-bold text-background">DC</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="p-6 rounded-xl bg-card border border-border/50 cyber-hover">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  {stat.trend && (
                    <span className="text-sm text-green-400">{stat.trend}</span>
                  )}
                </div>
                <p className="text-3xl font-display text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Action Required */}
            <div className="rounded-xl bg-card border border-border/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading text-foreground">Action Required</h2>
                <Button variant="cyberGhost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {actionItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-2",
                      item.priority === "high" ? "bg-destructive" : "bg-yellow-500"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            <div className="rounded-xl bg-card border border-border/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading text-foreground">Recent Reports</h2>
                <Button variant="cyberGhost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-foreground">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-bold bg-primary/20 text-primary rounded">
                      {report.type}
                    </span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl cyber-gradient-border p-6">
            <h2 className="text-xl font-heading text-foreground mb-6">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="cyberOutline" className="h-auto py-4 flex-col gap-2">
                <Upload className="w-6 h-6" />
                Upload Document
              </Button>
              <Button variant="cyberOutline" className="h-auto py-4 flex-col gap-2">
                <MessageSquare className="w-6 h-6" />
                New Message
              </Button>
              <Button variant="cyberOutline" className="h-auto py-4 flex-col gap-2">
                <Bell className="w-6 h-6" />
                Create Ticket
              </Button>
              <Button variant="cyberOutline" className="h-auto py-4 flex-col gap-2">
                <Download className="w-6 h-6" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
