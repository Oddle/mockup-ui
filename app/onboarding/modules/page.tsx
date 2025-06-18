"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  KeyRound, 
  CreditCard, 
  Store, 
  ShoppingCart, 
  Truck, 
  Clock,
  ChefHat,
  ArrowLeft,
  Settings,
  Sparkles
} from "lucide-react"

export default function OnboardingModulesPage() {
  const router = useRouter()

  const modules = [
    {
      id: "password",
      title: "Password & Security",
      description: "Set up merchant account password and security settings",
      icon: KeyRound,
      path: "/onboarding/password",
      status: "available",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      category: "Security"
    },
    {
      id: "stripe",
      title: "Payment Integration",
      description: "Connect Stripe account for payment processing",
      icon: CreditCard,
      path: "/onboarding/stripe",
      status: "available",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      category: "Payments"
    },
    {
      id: "stores",
      title: "Store Setup",
      description: "Add and configure your store locations",
      icon: Store,
      path: "/onboarding/store",
      status: "available",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      category: "Locations"
    },
    {
      id: "order-types",
      title: "Order Types",
      description: "Configure pickup and delivery options",
      icon: ShoppingCart,
      path: "/onboarding/order-types",
      status: "available",
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
      category: "Operations"
    },
    {
      id: "pickup",
      title: "Pickup Configuration",
      description: "Set up customer pickup hours and policies",
      icon: Clock,
      path: "/onboarding/pickup",
      status: "available",
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600",
      category: "Operations"
    },
    {
      id: "delivery",
      title: "Delivery Setup",
      description: "Configure delivery areas, fees, and minimums",
      icon: Truck,
      path: "/onboarding/delivery",
      status: "available",
      color: "bg-cyan-50 border-cyan-200",
      iconColor: "text-cyan-600",
      category: "Operations"
    },
    {
      id: "engagements",
      title: "Marketing Automation",
      description: "Set up automated engagements and promotions",
      icon: Sparkles,
      path: "/onboarding/engagements",
      status: "available",
      color: "bg-violet-50 border-violet-200",
      iconColor: "text-violet-600",
      category: "Marketing"
    },
    {
      id: "menu",
      title: "Menu Import",
      description: "Import and manage your restaurant menu",
      icon: ChefHat,
      path: "/onboarding/menu",
      status: "available",
      color: "bg-pink-50 border-pink-200",
      iconColor: "text-pink-600",
      category: "Menu"
    }
  ]

  const categories = ["Security", "Payments", "Locations", "Operations", "Marketing", "Menu"]

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push("/onboarding")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Settings className="h-8 w-8 text-primary" />
                Onboarding Modules
              </h1>
              <p className="text-muted-foreground mt-1">
                Access individual setup modules from your merchant dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map(category => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">{category}</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {modules
                  .filter(module => module.category === category)
                  .map((module) => {
                    const Icon = module.icon
                    return (
                      <Card 
                        key={module.id} 
                        className={`${module.color} hover:shadow-lg transition-all duration-200 cursor-pointer group`}
                        onClick={() => router.push(module.path)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className={`w-12 h-12 rounded-lg bg-white flex items-center justify-center`}>
                              <Icon className={`h-6 w-6 ${module.iconColor}`} />
                            </div>
                            <Badge 
                              variant="secondary" 
                              className="text-xs capitalize"
                            >
                              {module.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {module.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground text-sm">
                            {module.description}
                          </p>
                          <Button 
                            size="sm" 
                            className="w-full group-hover:bg-primary/90 transition-colors"
                          >
                            Configure
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Usage Note */}
        <Card className="bg-slate-100 border-slate-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Settings className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Module Usage</h3>
                <p className="text-sm text-muted-foreground">
                  These modules can be accessed independently from your merchant dashboard. 
                  You can configure or reconfigure any section at any time after initial onboarding. 
                  Changes made in individual modules will be reflected across your entire setup.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.push("/onboarding")}
          >
            ← Back to Entry Points
          </Button>
          <Button 
            onClick={() => router.push("/")}
          >
            Main Menu
          </Button>
        </div>
      </div>
    </div>
  )
}