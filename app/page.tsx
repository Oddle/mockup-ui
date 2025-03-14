"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { KeyRound, UserPlus, ClipboardCheck, Calendar } from "lucide-react"

export default function Home() {
  const router = useRouter()

  const mainPages = [
    { 
      name: "Onboarding", 
      path: "/onboarding/password",
      description: "Set up merchant password and security",
      icon: KeyRound
    },
    { 
      name: "Prefill", 
      path: "/signup/prefill",
      description: "Pre-populate merchant signup form",
      icon: ClipboardCheck
    },
    { 
      name: "Signup", 
      path: "/merchant-pricing",
      description: "View merchant pricing plans",
      icon: UserPlus
    },
    { 
      name: "Item Availability", 
      path: "/item-availability",
      description: "Manage menu item availability",
      icon: Calendar
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <main className="w-auto py-10 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">UI Mockups Navigation</h1>
          <p className="text-slate-500">Select a section to view its mockup</p>
        </div>
        
        <Card className="border-none shadow-lg w-fit mx-auto">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col items-center gap-4">
              {mainPages.map((page) => {
                const Icon = page.icon
                return (
                  <Button
                    key={page.path}
                    variant="outline"
                    size="lg"
                    className="w-[300px] h-24 text-lg relative group p-6 border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                    onClick={() => router.push(page.path)}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="font-semibold">{page.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-normal">
                        {page.description}
                      </p>
                    </div>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-slate-400 mt-8">
          Choose any section above to preview its interface
        </p>
      </main>
    </div>
  )
}
