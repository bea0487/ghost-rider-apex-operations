import { Link } from "react-router-dom";
import { Shield, Target, Users, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";

const values = [
  {
    icon: Shield,
    title: "Reliability",
    description: "We're your constant co-pilot, ensuring your compliance never wavers. Count on us 24/7.",
  },
  {
    icon: Target,
    title: "Precision",
    description: "Every report, every file, every deadline tracked with military-grade accuracy.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We don't just work for you—we work with you as an extension of your team.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We hold ourselves to the highest standards because your success depends on it.",
  },
];

const timeline = [
  {
    year: "2019",
    title: "The Beginning",
    description: "Founded by industry veterans who saw the need for better compliance support.",
  },
  {
    year: "2020",
    title: "Virtual Wingman",
    description: "Pioneered the 'Virtual Wingman' concept—always-on compliance partnership.",
  },
  {
    year: "2022",
    title: "Tech Forward",
    description: "Launched integrated ELD monitoring and automated IFTA reporting systems.",
  },
  {
    year: "2024",
    title: "Full Command",
    description: "Expanded to full back-office operations serving fleets of all sizes.",
  },
];

export default function About() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent" />
        <div className="absolute inset-0 cyber-grid opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-heading mb-6">
              YOUR VIRTUAL WINGMAN
            </span>
            <h1 className="text-5xl md:text-7xl font-display cyber-gradient-text mb-6">
              About Us
            </h1>
            <p className="text-xl text-muted-foreground">
              We're not just another compliance company. We're your dedicated partner in navigating the complex world of trucking regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-subtitle cyber-gradient-text mb-6">
                The Virtual Wingman Philosophy
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                In aviation, a wingman is more than just backup—they're a trusted partner who watches your six, anticipates threats, and ensures mission success. That's exactly what we do for trucking companies.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Ghost Rider Apex Operations was built on a simple idea: trucking companies shouldn't have to navigate the maze of DOT regulations alone. You focus on moving freight. We focus on keeping you compliant.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From ELD monitoring to full back-office operations, we've assembled a team of industry experts and cutting-edge technology to become the virtual wingman every fleet needs.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl cyber-gradient-border p-1">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl font-display cyber-gradient-text mb-4">GR</div>
                    <div className="text-xl font-heading text-muted-foreground">APEX OPERATIONS</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-xl bg-gradient-to-br from-primary to-secondary blur-3xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-subtitle cyber-gradient-text mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-xl bg-card border border-border/50 cyber-hover text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-heading text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-subtitle cyber-gradient-text mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From startup to industry leader in trucking compliance
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="relative flex gap-8 pb-12 last:pb-0">
                {/* Line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-[39px] top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />
                )}
                
                {/* Year Badge */}
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="font-display text-lg text-background">{item.year}</span>
                </div>
                
                {/* Content */}
                <div className="pt-4">
                  <h3 className="text-2xl font-heading cyber-gradient-text mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display cyber-gradient-text mb-6">
            Ready to Join the Squadron?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us be your virtual wingman. Start your journey to stress-free compliance today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cyber" size="xl" asChild>
              <Link to="/signup">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="cyberOutline" size="xl" asChild>
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
