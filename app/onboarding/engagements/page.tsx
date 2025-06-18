"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  Target, 
  Gift, 
  MessageSquare,
  Users,
  ArrowRight
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EngagementsPage() {
  const router = useRouter()

  const engagementTypes = [
    {
      id: "abandoned-cart",
      title: "Abandoned Cart Recovery",
      description: "Re-engage customers who left items in their cart",
      icon: MessageSquare,
      category: "Recovery Campaigns",
      benefits: ["15% cart recovery rate", "Reduced lost sales"],
      automationType: "Behavior-triggered"
    },
    {
      id: "lapsed-customer",
      title: "Lapsed Customer Reminder",
      description: "Automated reminders to bring back inactive customers",
      icon: Users,
      category: "Customer Retention",
      benefits: ["25% customer reactivation rate", "Increased lifetime value"],
      automationType: "Time-based"
    }
  ]

  const handleContinue = () => {
    router.push("/onboarding/menu")
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2"
            >
              ← Back
            </Button>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Automated Engagements & Promotions</h2>
              <p className="text-muted-foreground mt-1">
                We&apos;ll create intelligent marketing campaigns to grow your business automatically
              </p>
            </div>
          </div>
        </div>

        <Alert className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <Target className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-800">
            <strong>Pre-Created Promotional Campaigns:</strong> We&apos;ll set up first-time customer and lapsed customer promotional campaigns in your dashboard. These proven offers help attract new customers and bring back previous ones to boost your revenue.
          </AlertDescription>
        </Alert>

        {/* Pre-created Campaigns Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Pre-Created Promotions</h3>
          <p className="text-sm text-muted-foreground">
            These campaigns will be automatically available in your dashboard and can be activated immediately after onboarding.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            {/* First-Time Customer Promo Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div>
                      <h4 className="font-semibold text-blue-800">First-Time Customer Promo</h4>
                      <p className="text-lg font-bold text-blue-700">$6 off $60</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Ready to launch</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lapsed Customer Re-engagement Card */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div>
                      <h4 className="font-semibold text-purple-800">Lapsed Customer Re-engagement</h4>
                      <p className="text-lg font-bold text-purple-700">15% off</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Ready to launch</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Additional Marketing Automations</h3>
          <p className="text-sm text-muted-foreground">
            These marketing automations will be automatically configured for your business. You can enable or disable them anytime from your dashboard.
          </p>
          
          <div className="grid gap-4">
            {engagementTypes.map((engagement) => {
              const Icon = engagement.icon
              
              return (
                <div
                  key={engagement.id}
                  className="rounded-lg border p-4 bg-muted/20 border-muted"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{engagement.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {engagement.description}
                          </p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                          Included
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {engagement.category}
                        </span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {engagement.automationType}
                        </span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <strong>Benefits:</strong> {engagement.benefits.join(" • ")}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Marketing Suite Summary */}
        <div className="rounded-lg border bg-gradient-to-r from-purple-50 to-pink-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="font-medium text-purple-800">Your Complete Marketing Suite</span>
          </div>
          <div className="text-sm text-purple-700 space-y-1">
            <div>🎁 <strong>2 promotional campaigns</strong> pre-created and ready to launch</div>
            <div>📊 <strong>{engagementTypes.length} marketing automations</strong> will be configured for your business</div>
            <div className="pt-1 text-xs">All campaigns and automations will be available in your dashboard for management.</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <Button 
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push("/onboarding/delivery")}
            >
              Back
            </Button>
            <Button 
              className="w-full"
              onClick={handleContinue}
            >
              Continue to Menu Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={() => router.push("/onboarding/menu")}
          >
            Skip Marketing Setup
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}