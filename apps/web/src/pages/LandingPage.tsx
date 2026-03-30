import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Rocket, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight">
            Welcome to MyApp
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            A modern web application with authentication, dashboard, and more.
            Built with React, TypeScript, and Tailwind CSS.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/signin">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Features
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Rocket className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Fast & Responsive</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built with modern technologies for optimal performance and user experience.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Secure Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Protected routes and secure session management keep your data safe.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Modern UI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Clean, accessible design with Tailwind CSS and Radix UI components.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}