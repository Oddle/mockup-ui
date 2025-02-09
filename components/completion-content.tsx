"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, CreditCard, Mail, FileText } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function CompletionContent() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-semibold mt-4">
            Thank You! You're Almost Ready to Start
          </h1>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Next Steps:</h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">1. Check Your Email</h3>
              <p className="text-muted-foreground">
                We've sent you an email with the signed agreement forms and the next steps.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">2. Dedicated Onboarding Assistance</h3>
              <p className="text-muted-foreground">
                Pay the commitment fee to secure dedicated onboarding assistance from our team. 
                Plus, this fee will be credited back to you for future services.
              </p>
              <ul className="space-y-2 text-muted-foreground pl-6 list-disc">
                <li>
                  <span className="font-medium text-foreground">Hassle-Free Onboarding:</span>{" "}
                  Send over the required information, and we'll have everything set up for you in 3 to 5 working days.
                </li>
                <li>
                  <span className="font-medium text-foreground">Oddle Credits:</span>{" "}
                  Oddle Credits can be applied to offset future fees.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            className="w-full flex items-center gap-2"
            onClick={() => window.location.href = "/payment"}
            size="lg"
          >
            <CreditCard className="h-4 w-4" />
            Make Payment Now
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Alternatively
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => {
              // Add your invoice email sending logic here
              console.log("Sending invoice...")
            }}
          >
            <Mail className="h-4 w-4" />
            Send Invoice to Email
          </Button>

          <Button 
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => {
              // Add your contract email sending logic here
              console.log("Sending contract...")
            }}
          >
            <FileText className="h-4 w-4" />
            Send Contract to Email
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 