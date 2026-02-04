import { Link } from "react-router-dom";
import { 
  Shield, Zap, Clock, Truck, FileText, Calculator, 
  AlertTriangle, BarChart3, Users, CheckCircle, ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";

const tiers = [
  {
    id: "wingman",
    name: "Wingman",
    tagline: "Essential ELD Monitoring",
    price: "$99",
    period: "/month",
    description: "Perfect for owner-operators who need reliable ELD monitoring and basic compliance tracking.",
    icon: Zap,
    features: [
      "ELD Monitoring & Reports",
      "Hours of Service Tracking",
      "Monthly Compliance Brief",
      "Email Support",
      "Support Ticket System",
    ],
    color: "primary",
  },
  {
    id: "guardian",
    name: "Guardian",
    tagline: "Complete Protection Package",
    price: "$249",
    period: "/month",
    description: "Comprehensive compliance management for small fleets who need IFTA and DQ file support.",
    icon: Shield,
    features: [
      "Everything in Wingman",
      "IFTA Quarterly Reporting",
      "DQ File Management",
      "Driver Qualification Tracking",
      "Priority Support",
      "Phone Support Access",
    ],
    color: "secondary",
    popular: true,
  },
  {
    id: "apex",
    name: "Apex Command",
    tagline: "Full Operations Control",
    price: "$499",
    period: "/month",
    description: "Enterprise-level compliance for fleets that demand complete oversight and proactive management.",
    icon: Truck,
    features: [
      "Everything in Guardian",
      "DataQ Dispute Management",
      "CSA Score Monitoring",
      "Proactive Violation Alerts",
      "Dedicated Account Manager",
      "24/7 Priority Support",
    ],
    color: "accent",
  },
];

const additionalServices = [
  {
    id: "dispatcher",
    name: "Virtual Dispatcher",
    description: "Full dispatch operations support including load scheduling, broker packet management, and revenue optimization.",
    icon: Users,
    features: [
      "Interactive Load Calendar",
      "Broker Packet Management",
      "Weekly Revenue Reports",
      "Lane Optimization Analysis",
      "Real-time Load Tracking",
    ],
    price: "Custom Pricing",
  },
  {
    id: "backoffice",
    name: "Back Office Command",
    description: "Complete back-office operations including invoicing, expenses, payroll integration, and permit management.",
    icon: Calculator,
    features: [
      "Invoice Generation & Tracking",
      "Expense Management",
      "Payroll Integration",
      "IRP/IFTA Filing Automation",
      "Permit Management",
      "Vehicle Maintenance Tracking",
    ],
    price: "Custom Pricing",
  },
  {
    id: "dotaudit",
    name: "DOT Readiness Audit",
    description: "Comprehensive compliance review to ensure your fleet is fully prepared for DOT inspections and audits.",
    icon: FileText,
    features: [
      "Full Compliance Review",
      "DQ File Gap Analysis",
      "Prioritized Action Plan",
      "Remediation Support",
      "Audit Preparation Guide",
    ],
    price: "One-time: $999",
  },
];

const alaCarteServices = [
  { name: "ELD Monitoring Only", description: "Monthly ELD brief report", icon: BarChart3 },
  { name: "IFTA Reporting", description: "Quarterly IFTA filing", icon: Calculator },
  { name: "DQ File Management", description: "Driver qualification file maintenance", icon: FileText },
  { name: "DataQ Dispute", description: "Single dispute management", icon: AlertTriangle },
  { name: "CSA Score Monitoring", description: "Monthly CSA score tracking", icon: Shield },
];

export default function Services() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute inset-0 cyber-grid opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-display cyber-gradient-text mb-6">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground">
              From essential monitoring to complete back-office command, we have the right solution for your fleet's compliance needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Tiers */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-subtitle cyber-gradient-text mb-4">
              Service Tiers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the level of support that matches your fleet's needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                id={tier.id}
                className={`relative p-8 rounded-2xl ${
                  tier.popular 
                    ? "cyber-gradient-border glow-multi scale-105" 
                    : "bg-card border border-border/50"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-gradient-to-r from-primary to-secondary text-background text-sm font-bold uppercase rounded-full">
                    Most Popular
                  </span>
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <tier.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display cyber-gradient-text">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground font-heading">{tier.tagline}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-5xl font-display text-foreground">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>

                <p className="text-muted-foreground mb-8">{tier.description}</p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={tier.popular ? "cyber" : "cyberOutline"} 
                  className="w-full"
                  asChild
                >
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-subtitle cyber-gradient-text mb-4">
              Specialized Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced solutions for fleets with specific operational needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {additionalServices.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="p-8 rounded-2xl bg-card border border-border/50 cyber-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-2xl font-display cyber-gradient-text mb-2">{service.name}</h3>
                <p className="text-primary font-heading text-lg mb-4">{service.price}</p>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                <ul className="space-y-2 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="cyberOutline" className="w-full" asChild>
                  <Link to="/contact">Learn More</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A La Carte */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-subtitle cyber-gradient-text mb-4">
              A La Carte Options
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Need just one specific service? We offer individual compliance solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {alaCarteServices.map((service) => (
              <div
                key={service.name}
                className="p-6 rounded-xl bg-card border border-border/50 text-center cyber-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading text-foreground mb-2">{service.name}</h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="cyber" size="lg" asChild>
              <Link to="/contact">
                Get Custom Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display cyber-gradient-text mb-6">
            Not Sure Which Tier?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a free consultation and we'll help you find the perfect compliance solution for your fleet.
          </p>
          <Button variant="cyber" size="xl" asChild>
            <Link to="/contact">
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
