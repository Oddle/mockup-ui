"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, UserPlus, Settings, CheckCircle } from "lucide-react"

export default function OnboardingStartPage() {
  const router = useRouter()

  const entryPoints = [
    {
      title: "Onboarding Form Initiated",
      description: "Complete merchant onboarding flow from the beginning",
      icon: FileText,
      action: "Start Full Onboarding",
      path: "/onboarding/password",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      title: "Sign Up Form Submitted",
      description: "Continue onboarding after merchant sign-up completion",
      icon: UserPlus,
      action: "Continue from Sign Up",
      path: "/onboarding/password",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600"
    },
    {
      title: "Modularised Steps",
      description: "Access individual onboarding modules from merchant dashboard",
      icon: Settings,
      action: "View Module Options",
      path: "/onboarding/modules",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600"
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Merchant Onboarding</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The onboarding flow can be initiated from multiple entry points. 
            Choose how you want to proceed with the merchant setup process.
          </p>
        </div>

        {/* Entry Points */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {entryPoints.map((entry, index) => {
            const Icon = entry.icon
            return (
              <Card key={index} className={`${entry.color} hover:shadow-lg transition-all duration-200`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full bg-white mx-auto flex items-center justify-center mb-4`}>
                    <Icon className={`h-8 w-8 ${entry.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl">{entry.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {entry.description}
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => router.push(entry.path)}
                  >
                    {entry.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Flow Overview */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-center">Complete Onboarding Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Password Setup</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Stripe Integration</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Store Setup</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Order Types</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <span>Pickup/Delivery</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">6</span>
                <span>Marketing Automation</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">7</span>
                <span>Menu Import</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => router.push("/")}
          >
            ← Back to Main Menu
          </Button>
        </div>
      </div>
    </div>
  )
}