import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Home() {
  const supabase = createClient()

  // Check connection by getting the current user (will be null for anonymous users)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Supabase + Next.js</CardTitle>
          <CardDescription>
            Your Supabase connection is {session ? "active with a logged-in user" : "active (anonymous)"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This is a simple Next.js application connected to your Supabase project. You can explore different features
            using the links below.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/instruments" className="w-full">
            <Button className="w-full">View Instruments</Button>
          </Link>
          <Link href="/auth" className="w-full">
            <Button variant="outline" className="w-full">
              Authentication Demo
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}

