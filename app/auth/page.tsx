"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [user, setUser] = useState<any>(null)

  const supabase = createClient()

  const handleSignUp = async () => {
    try {
      setLoading(true)
      setMessage(null)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      setMessage({
        type: "success",
        text: "Check your email for the confirmation link!",
      })
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.error_description || error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async () => {
    try {
      setLoading(true)
      setMessage(null)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      setUser(data.user)
      setMessage({
        type: "success",
        text: "Successfully signed in!",
      })
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.error_description || error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setMessage({
        type: "success",
        text: "Successfully signed out!",
      })
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.error_description || error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Sign up or sign in with your email and password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <p className="font-medium">Signed in as:</p>
                <p className="text-sm mt-1">{user.email}</p>
              </div>
              <Button onClick={handleSignOut} disabled={loading} className="w-full">
                {loading ? "Loading..." : "Sign Out"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-md ${
                    message.type === "error" ? "bg-destructive/15 text-destructive" : "bg-green-100 text-green-800"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={handleSignIn} disabled={loading} className="flex-1">
                  {loading ? "Loading..." : "Sign In"}
                </Button>
                <Button onClick={handleSignUp} disabled={loading} variant="outline" className="flex-1">
                  {loading ? "Loading..." : "Sign Up"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

