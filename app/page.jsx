import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Resume Builder</div>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-foreground hover:text-primary transition-smooth"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-smooth font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Build Your Professional Resume in Minutes
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Create attractive, ATS-friendly resumes that help you land your dream job. No design experience needed.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-smooth font-semibold text-lg"
          >
            Start Building Now
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-card border-y border-border">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why Choose Resume Builder?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-input border border-border">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Fast & Easy
              </h3>
              <p className="text-muted-foreground">
                Create a professional resume in just minutes with our intuitive interface.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-input border border-border">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Multiple Templates
              </h3>
              <p className="text-muted-foreground">
                Choose from professionally designed templates that impress employers.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-input border border-border">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                ATS Optimized
              </h3>
              <p className="text-muted-foreground">
                Our resumes pass Applicant Tracking Systems to ensure your application gets seen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2025 Resume Builder. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
