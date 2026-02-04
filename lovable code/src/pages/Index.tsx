import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import heroImage from "@/assets/hero-truck.jpg";

const features = [
  {
    icon: Shield,
    title: "DOT Compliance",
    description: "Stay ahead of regulations with proactive monitoring and audit-ready documentation.",
  },
  {
    icon: Zap,
    title: "Real-Time ELD",
    description: "Live Hours of Service tracking with instant violation alerts and reports.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Your dedicated virtual wingman is always ready to assist with any compliance needs.",
  },
];

const services = [
  {
    name: "Wingman",
    tagline: "Essential Monitoring",
    price: "Starting at $99/mo",
    features: ["ELD Monitoring", "Basic Reports", "Support Tickets"],
    popular: false,
  },
  {
    name: "Guardian",
    tagline: "Complete Protection",
    price: "Starting at $249/mo",
    features: ["Everything in Wingman", "IFTA Reporting", "DQ File Management", "Priority Support"],
    popular: true,
  },
  {
    name: "Apex Command",
    tagline: "Full Operations",
    price: "Starting at $499/mo",
    features: ["Everything in Guardian", "DataQ Disputes", "CSA Monitoring", "Dedicated Account Manager"],
    popular: false,
  },
];

const stats = [
  { value: "500+", label: "Trucks Managed" },
  { value: "99.8%", label: "Compliance Rate" },
  { value: "24/7", label: "Support Available" },
  { value: "48", label: "States Served" },
];

export default function Index() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 cyber-grid opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="animate-slide-up">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-heading mb-6">
                YOUR VIRTUAL WINGMAN IN TRUCKING
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display mb-6 animate-slide-up delay-100">
              <span className="cyber-gradient-text">GHOST RIDER</span>
              <br />
              <span className="text-foreground">APEX OPERATIONS</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up delay-200 max-w-2xl font-body">
              Professional trucking compliance management. ELD monitoring, IFTA reporting, DOT audits, and complete back-office solutions—all in one powerful platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
              <Button variant="cyber" size="xl" asChild>
                <Link to="/signup">
                  Start Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="cyberOutline" size="xl" asChild>
                <Link to="/services">
                  View Services
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-display cyber-gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-heading text-sm tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-subtitle cyber-gradient-text mb-4">
              Why Choose Ghost Rider?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge technology with industry expertise to keep your fleet compliant and running.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-8 rounded-xl cyber-gradient-border cyber-hover animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-heading text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-subtitle cyber-gradient-text mb-4">
              Choose Your Tier
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From basic ELD monitoring to full back-office command, we have a solution for every fleet size.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.name}
                className={`relative p-8 rounded-xl animate-slide-up ${
                  service.popular 
                    ? "cyber-gradient-border glow-multi" 
                    : "bg-card border border-border/50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {service.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary text-background text-xs font-bold uppercase rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-display cyber-gradient-text mb-2">{service.name}</h3>
                <p className="text-muted-foreground font-heading text-sm mb-4">{service.tagline}</p>
                <p className="text-3xl font-display text-foreground mb-6">{service.price}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={service.popular ? "cyber" : "cyberOutline"} 
                  className="w-full"
                  asChild
                >
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="cyberGhost" size="lg" asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute inset-0 cyber-grid opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-display cyber-gradient-text mb-6">
              Ready to Ride?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join hundreds of trucking companies who trust Ghost Rider Apex Operations for their compliance needs. Schedule your free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cyber" size="xl" asChild>
                <Link to="/contact">
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="cyberOutline" size="xl" asChild>
                <Link to="/login">
                  Client Portal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
