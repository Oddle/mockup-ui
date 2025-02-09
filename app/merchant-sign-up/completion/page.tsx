"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CompletionPage() {
  return (
    <div className="container max-w-3xl mx-auto py-10 px-4">
      <Card>
        <CardContent className="pt-6 space-y-8">
          <div>
            <h1 className="text-2xl font-semibold">
              Activate Your Account
            </h1>
            <p className="text-muted-foreground mt-2">
              Complete your payment to secure dedicated onboarding assistance and activate your account
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-medium text-primary">1</span>
              </div>
              <div>
                <h3 className="font-medium">Instant Account Creation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your Oddle account will be created immediately after payment confirmation
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-medium text-primary">2</span>
              </div>
              <div>
                <h3 className="font-medium">Dedicated Onboarding Assistance</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Hassle-free setup with our dedicated team. We'll handle everything for you in 3 to 5 working days.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mt-2 pl-4 list-disc">
                  <li>
                    <span className="text-foreground font-medium">Quick Setup:</span>{" "}
                    Just send us your information, and we'll configure everything for you
                  </li>
                  <li>
                    <span className="text-foreground font-medium">Future Credits:</span>{" "}
                    Your setup fee will be converted to Oddle Credits, applicable to future services
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-medium text-primary">3</span>
              </div>
              <div>
                <h3 className="font-medium">Comprehensive Training</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Our team will guide you through the platform and train your staff for a smooth operation
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
              <Button 
                className="w-full"
                size="lg"
                onClick={() => window.location.href = "https://oddle.me/payment"}
              >
                Make Payment to Activate Your Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  )
} 