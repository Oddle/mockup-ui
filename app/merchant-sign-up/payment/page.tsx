"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Mail, FileText } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

export default function Payment() {
  const router = useRouter()

  return (
    <div className="max-w-[600px] mx-auto py-10 px-4">
      <Card>
        <CardContent className="pt-6 space-y-8">
          <div>
            <h1 className="text-2xl font-semibold">
              Payment Options
            </h1>
            <p className="text-muted-foreground mt-2">
              Choose how you would like to proceed with the payment
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-4">
            <Button 
              className="w-full flex items-center gap-2"
              size="lg"
            >
              <CreditCard className="h-4 w-4" />
              Make Payment Now
            </Button>

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
                  console.log("Sending contract...")
                }}
              >
                <FileText className="h-4 w-4" />
                Send Contract to Email
              </Button>
            </div>
          </div>

          <Button 
            variant="outline"
            className="w-full"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 