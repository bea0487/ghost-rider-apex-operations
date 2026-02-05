import { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Mail, Lock, User, Building, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Backend Required",
      description: "Enable Lovable Cloud to add authentication functionality.",
    });
    
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        <div className="relative z-10 flex flex-col justify-center p-12">
          <Link to="/" className="flex items-center gap-4 mb-12">
            <Truck className="w-12 h-12 text-primary" />
            <div>
              <span className="font-display text-3xl cyber-gradient-text block">GHOST RIDER</span>
              <span className="text-sm text-muted-foreground tracking-widest">APEX OPERATIONS</span>
            </div>
          </Link>
          
          <h1 className="text-5xl font-display text-foreground mb-6">
            Join the Squadron
          </h1>
          <p className="text-xl text-muted-foreground max-w-md">
            Get access to professional trucking compliance management and let us be your virtual wingman.
          </p>
          
          <div className="mt-16 space-y-4">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>DOT compliance made simple</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span>Expert support team</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>Start with a free consultation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-12 text-center">
            <Link to="/" className="inline-flex items-center gap-3">
              <Truck className="w-10 h-10 text-primary" />
              <div>
                <span className="font-display text-2xl cyber-gradient-text block">GHOST RIDER</span>
                <span className="text-xs text-muted-foreground tracking-widest">APEX OPERATIONS</span>
              </div>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-display text-foreground mb-2">Create Account</h2>
            <p className="text-muted-foreground">
              Sign up to get started with your compliance portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-heading text-muted-foreground mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="pl-11 bg-muted/50 border-border focus:border-primary h-12"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-heading text-muted-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-11 bg-muted/50 border-border focus:border-primary h-12"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-heading text-muted-foreground mb-2">
                Company Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="pl-11 bg-muted/50 border-border focus:border-primary h-12"
                  placeholder="Trucking Co. LLC"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-heading text-muted-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-11 pr-11 bg-muted/50 border-border focus:border-primary h-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-heading text-muted-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pl-11 bg-muted/50 border-border focus:border-primary h-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                variant="cyber" 
                size="lg" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-muted-foreground text-sm">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">Terms</Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </div>

          <div className="mt-6 text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-semibold">
              Sign in
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
