"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRouter } from "next/navigation"

const products = [
  { 
    id: "pos", 
    label: "Oddle POS",
    description: "All-in-one cloud POS system with integrated payments, inventory, and staff management",
    pricingDetails: {
      subscription: "Base subscription: $499 per month",
      hardware: [
        "iPad Terminal: $899 per device",
        "Receipt Printer: $299 per unit",
        "Cash Drawer: $199 per unit"
      ],
      transaction: "Payment Processing: 1.9% per transaction"
    },
    image: "/pos.jpg",
    setupFee: 1500,
    pricing: {
      type: "fixed",
      amount: 499,
      unit: "per month"
    }
  },
  { 
    id: "delivery", 
    label: "Oddle Delivery",
    description: "Manage your own delivery fleet or leverage our delivery partners network",
    pricingDetails: {
      commission: "10% of delivery value",
      additionalFees: [
        "Peak hour surcharge: $2 per order",
        "Extended distance (>5km): $1 per km",
        "Special handling: $5 per order"
      ]
    },
    image: "/delivery.jpg",
    setupFee: 800,
    pricing: {
      type: "percentage",
      amount: 10,
      unit: "of delivery value"
    }
  },
  { 
    id: "loyalty", 
    label: "Oddle Loyalty",
    description: "Comprehensive loyalty program management system",
    pricingDetails: {
      usageFees: {
        title: "Usage Fees",
        items: [
          "In-store First Check-in: $0.35 per enrolment",
          "Check-in Milestone Rewards: $0.70 per redemption",
          "Return Rewards: $0.70 per redemption",
          "General: $0.70 per claim",
          "Partnership: $0.70 per claim",
          "Voucher Pack: $0.70 per claim"
        ]
      },
      paymentFees: {
        title: "Payment Fees",
        items: [
          "General: 3.4% per transaction"
        ]
      }
    },
    image: "/loyalty.jpg",
    setupFee: 900,
    pricing: {
      type: "usage_based",
      amount: 0.35,
      unit: "per enrolment"
    }
  },
  { 
    id: "ecommerce", 
    label: "Oddle E-commerce",
    description: "Custom-branded online ordering website with marketing tools and analytics",
    pricingDetails: {
      subscription: "Base platform: $399 per month",
      transaction: [
        "Online orders: 2% per transaction",
        "Payment processing: 2.9% + $0.30 per transaction"
      ],
      addOns: [
        "Custom domain: $20 per month",
        "Advanced analytics: $49 per month",
        "Multi-language support: $29 per month"
      ]
    },
    image: "/ecommerce.jpg",
    setupFee: 1200,
    pricing: {
      type: "fixed",
      amount: 399,
      unit: "per month"
    }
  },
  { 
    id: "reservations", 
    label: "Oddle Reservations",
    description: "Table management and reservation system with customer database",
    pricingDetails: {
      bookingFees: [
        "Online reservations: $0.30 per booking",
        "No-show fee collection: 3% of charged amount",
        "SMS notifications: $0.05 per message"
      ],
      optional: [
        "Premium table allocation: $0.50 per booking",
        "Special requests handling: $0.20 per request"
      ]
    },
    image: "/reservations.jpg",
    setupFee: 750,
    pricing: {
      type: "per_booking",
      amount: 0.30,
      unit: "per booking"
    }
  }
]

export default function PricingPage() {
  const router = useRouter()
  
  // Calculate total setup fee
  const totalSetupFee = products.reduce((sum, product) => sum + product.setupFee, 0)

  const renderPricingDetails = (details: any) => {
    if (!details) return null

    return (
      <div className="space-y-4 text-sm">
        {details.subscription && (
          <div>
            <div className="font-medium mb-1">Subscription</div>
            <div className="text-muted-foreground">{details.subscription}</div>
          </div>
        )}
        
        {details.usageFees && (
          <div>
            <div className="font-medium mb-1">{details.usageFees.title}</div>
            <ul className="space-y-1 text-muted-foreground">
              {details.usageFees.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {details.paymentFees && (
          <div>
            <div className="font-medium mb-1">{details.paymentFees.title}</div>
            <ul className="space-y-1 text-muted-foreground">
              {details.paymentFees.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {details.commission && (
          <div>
            <div className="font-medium mb-1">Commission</div>
            <div className="text-muted-foreground">{details.commission}</div>
          </div>
        )}

        {details.transaction && (
          <div>
            <div className="font-medium mb-1">Transaction Fees</div>
            <ul className="space-y-1 text-muted-foreground">
              {Array.isArray(details.transaction) 
                ? details.transaction.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))
                : <li>{details.transaction}</li>
              }
            </ul>
          </div>
        )}

        {details.bookingFees && (
          <div>
            <div className="font-medium mb-1">Booking Fees</div>
            <ul className="space-y-1 text-muted-foreground">
              {details.bookingFees.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {details.additionalFees && (
          <div>
            <div className="font-medium mb-1">Additional Fees</div>
            <ul className="space-y-1 text-muted-foreground">
              {details.additionalFees.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {details.addOns && (
          <div>
            <div className="font-medium mb-1">Add-ons (Optional)</div>
            <ul className="space-y-1 text-muted-foreground">
              {details.addOns.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Get Started with Oddle</h1>
        <p className="text-xl text-muted-foreground">
          Review the products and pricing selected by your Oddle representative
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="grid grid-cols-[1fr,2fr,1fr] gap-6 px-6 py-3 bg-muted/50 rounded-lg">
            <div className="font-semibold">Product</div>
            <div className="font-semibold">Pricing Details</div>
            <div className="font-semibold text-right">Setup Fee</div>
          </div>
          
          {/* Products */}
          {products.map((product) => (
            <div 
              key={product.id}
              className="grid grid-cols-[1fr,2fr,1fr] gap-6 px-6 py-4 border rounded-lg"
            >
              <div>
                <div className="text-lg font-semibold mb-2">{product.label}</div>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
              
              <div className="text-sm">
                {renderPricingDetails(product.pricingDetails)}
              </div>

              <div className="text-right">
                <div className="text-lg font-semibold text-primary">${product.setupFee}</div>
                <div className="text-sm text-muted-foreground">One-time fee</div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Total Setup Fee</h3>
                <p className="text-sm text-muted-foreground">One-time payment</p>
              </div>
              <div className="text-3xl font-bold text-primary">${totalSetupFee}</div>
            </div>
          </CardContent>
        </Card>

        {/* Representative Contact Card */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Your Representative</h3>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">John Smith</p>
                  <p className="text-muted-foreground">Account Executive</p>
                  <p className="text-muted-foreground">john.smith@oddle.me</p>
                  <p className="text-muted-foreground">+65 9123 4567</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/contact-sales")}
                className="shrink-0"
              >
                Contact Representative
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <Button 
            size="lg"
            className="w-full max-w-md"
            onClick={() => router.push("/merchant-sign-up/details")}
          >
            Accept and Continue
          </Button>
        </div>
      </div>
    </div>
  )
} 