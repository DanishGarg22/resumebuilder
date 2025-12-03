import { LoginForm } from "../components/auth/loginform.jsx"
import { Link } from "react-router-dom"; 

export const metadata = {
  title: "Sign In - Resume Builder",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold text-primary inline-block mb-2">
            Resume Builder
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to continue building your resume</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 glass-effect">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
