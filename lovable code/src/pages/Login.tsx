import { useState } from "react";
import { Link } from "react-router-dom";
import { Truck, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
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
            Welcome Back
          </h1>
          <p className="text-xl text-muted-foreground max-w-md">
            Access your compliance dashboard, reports, and support tickets all in one place.
          </p>
          
          <div className="mt-16 space-y-4">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Real-time ELD monitoring</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span>Download compliance reports</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>24/7 support access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
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
            <h2 className="text-3xl font-display text-foreground mb-2">Sign In</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border bg-muted" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              variant="cyber" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="mt-8 text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-semibold">
              Sign up
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
