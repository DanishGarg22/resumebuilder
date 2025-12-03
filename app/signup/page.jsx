import { SignupForm } from "../components/auth/signupform.jsx"; 
import { Link } from "react-router-dom"; 

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary inline-block mb-2"
          >
            Resume Builder
          </Link>

          <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">
            Get started building your professional resume
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 glass-effect">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
