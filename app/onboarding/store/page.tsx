"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Store } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock store data - additional stores found
const additionalStores = [
  {
    id: "store2",
    name: "Paradise Dynasty - ION Orchard",
    address: "2 Orchard Turn, #04-12A ION Orchard",
    isAdded: true,
  },
  {
    id: "store3",
    name: "Paradise Dynasty - Suntec City",
    address: "3 Temasek Boulevard, #02-135",
    isAdded: false,
  }
]

export default function StorePage() {
  const router = useRouter()
  // Initialize with IDs of all stores that are either already added or available to add
  const [selectedStores, setSelectedStores] = useState<string[]>(
    additionalStores.map(store => store.id)
  )

  const handleStoreSelection = (storeId: string) => {
    setSelectedStores(prev => {
      if (prev.includes(storeId)) {
        return prev.filter(id => id !== storeId)
      }
      return [...prev, storeId]
    })
  }

  // Count of new stores to be added (excluding already added stores)
  const newStoresCount = selectedStores.filter(
    id => !additionalStores.find(store => store.id === id)?.isAdded
  ).length

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
          <h2 className="text-2xl font-semibold">Setup Your Stores with Oddle</h2>
          <p className="text-muted-foreground mt-2">
            We discovered these stores listed online that appear to be part of your brand. Add them to your account to start managing their orders.
          </p>
        </div>

        <div className="space-y-4">
          {/* Store List */}
          <div className="grid gap-4">
            {additionalStores.map((store) => (
              <div
                key={store.id}
                className={cn(
                  "rounded-lg border bg-card p-4 hover:shadow-md transition-shadow",
                  store.isAdded && "bg-primary/5 border-primary/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-2 ${
                      selectedStores.includes(store.id) ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      <Store className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{store.name}</h3>
                        {store.isAdded && (
                          <span className="text-xs text-muted-foreground border rounded px-1.5 py-0.5">Added</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{store.address}</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={selectedStores.includes(store.id)}
                    onCheckedChange={() => handleStoreSelection(store.id)}
                    disabled={store.isAdded}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Selection Summary */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="text-sm">
              Adding{" "}
              <span className="font-medium">{newStoresCount}</span>{" "}
              {newStoresCount === 1 ? 'store' : 'stores'} to your account
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.push("/onboarding/order-types")}
          >
            Skip For Now
          </Button>
          <Button
            className="flex-1"
            disabled={selectedStores.length === 0}
            onClick={() => router.push("/onboarding/menu?next=/onboarding/contact")}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 