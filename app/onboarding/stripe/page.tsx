"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { ArrowRight, Wallet, Mail } from "lucide-react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const inviteFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export default function StripePage() {
  const router = useRouter()
  const [isInviting, setIsInviting] = useState(false)

  const form = useForm<z.infer<typeof inviteFormSchema>>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof inviteFormSchema>) {
    setIsInviting(true)
    // TODO: Implement invite functionality
    console.log(values)
    setTimeout(() => {
      setIsInviting(false)
      form.reset()
    }, 1000)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Connect Payment Account</h2>
          <p className="text-muted-foreground mt-2">
            Set up your Stripe account to receive payments from your customers
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
            <Wallet className="h-6 w-6 mt-1 text-primary" />
            <div className="space-y-2">
              <h3 className="font-medium">Why connect with Stripe?</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Accept payments from customers worldwide</li>
                <li>• Secure payment processing with fraud protection</li>
                <li>• Automatic transfers to your bank account</li>
                <li>• Real-time payment tracking and reporting</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">What you'll need:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Business registration details</li>
              <li>• Bank account information</li>
              <li>• Personal identification document</li>
            </ul>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="invite">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Not the right person? Invite someone else</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Invite someone from your finance or accounting team who has access to the required business information.
                  </p>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="finance@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        variant="secondary"
                        disabled={isInviting}
                        className="w-full"
                      >
                        {isInviting ? "Sending Invite..." : "Send Invite"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              By connecting a Stripe account, you agree to Stripe's Terms of Service and acknowledge that you will be redirected to Stripe to complete the setup.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <Button 
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Button 
              className="w-full"
              onClick={() => {
                // TODO: Replace with actual Stripe Connect onboarding URL
                window.location.href = "https://connect.stripe.com/oauth/authorize"
              }}
            >
              Connect with Stripe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={() => router.push("/onboarding/store")}
          >
            Skip to Next Step
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 