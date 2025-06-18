"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Store, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function OrderTypesPage() {
  const router = useRouter()
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["pickup", "delivery"])

  const orderTypes = [
    {
      id: "pickup",
      icon: Store,
      title: "Pickup",
      description: "Customers will order online and pickup directly at your store.",
    },
    {
      id: "delivery",
      icon: MapPin,
      title: "Delivery",
      description: "Customers will order online and our delivery partners will get them delivered on your behalf.",
    },
  ]

  const handleTypeClick = (typeId: string) => {
    setSelectedTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId)
      }
      return [...prev, typeId]
    })
  }

  const handleContinue = () => {
    if (selectedTypes.includes("pickup") && selectedTypes.includes("delivery")) {
      router.push("/onboarding/pickup?delivery=true")
    } else if (selectedTypes.includes("pickup")) {
      router.push("/onboarding/pickup")
    } else if (selectedTypes.includes("delivery")) {
      router.push("/onboarding/delivery")
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">What types of orders can your customers place?</h1>
          <p className="text-muted-foreground mt-2">
            Let us know if your store offers pickup and/or delivery
          </p>
        </div>

        <div className="grid gap-4">
          {orderTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedTypes.includes(type.id)
            
            return (
              <button
                key={type.id}
                className={`p-6 rounded-lg border text-left transition-all hover:shadow-md ${
                  isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"
                }`}
                onClick={() => handleTypeClick(type.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-full p-2 ${
                    isSelected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{type.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {type.description}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div className={`h-6 w-6 rounded-full border-2 transition-colors ${
                      isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}>
                      {isSelected && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
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
              disabled={selectedTypes.length === 0}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
          
          <Button 
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={() => router.push("/onboarding/pickup")}
          >
            Skip to Next Step
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 