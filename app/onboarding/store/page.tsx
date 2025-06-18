"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useCallback } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Store, Loader2, Search, AlertCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PlaceResult {
  place_id: string
  name: string
  formatted_address: string
  types: string[]
  rating?: number
  user_ratings_total?: number
  isAdded?: boolean
}

// This would normally come from your backend which stores which locations are already added
const ALREADY_ADDED_PLACE_IDS = ["ChIJN1t_tDeuEmsRUsoyG83frY4"]

export default function StorePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [stores, setStores] = useState<PlaceResult[]>([])
  const [selectedStores, setSelectedStores] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isResearching, setIsResearching] = useState(false)

  // Async function to research business details
  const researchBusiness = useCallback(async (businessName: string) => {
    setIsResearching(true)
    try {
      const response = await fetch('/api/business/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessName }),
      })

      if (response.ok) {
        const data = await response.json()
        // Store in localStorage
        localStorage.setItem('businessResearch', JSON.stringify({
          timestamp: new Date().toISOString(),
          query: businessName,
          data: data
        }))
        // Silent success - only log in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Business research stored:', data)
        }
      }
      // Fail silently - no error handling or user notification
    } catch (error) {
      // Silent failure - only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to research business:', error)
      }
    } finally {
      setIsResearching(false)
    }
  }, [])

  const searchForStores = useCallback(async (query: string) => {
    if (!query.trim()) return
    
    setIsLoading(true)
    setError(null)
    
    // Trigger async business research (fire and forget)
    researchBusiness(query)
    
    try {
      // Use our backend API to avoid CORS issues
      const response = await fetch('/api/places/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch stores')
      }

      const data = await response.json()
      
      if (data.results && data.results.length > 0) {
        // Mark stores as already added based on place_id
        const transformedResults: PlaceResult[] = data.results.map((place: PlaceResult) => ({
          ...place,
          isAdded: ALREADY_ADDED_PLACE_IDS.includes(place.place_id)
        }))
        
        setStores(transformedResults)
        // Auto-select all stores by default
        setSelectedStores(transformedResults.map((store: PlaceResult) => store.place_id))
      } else {
        setStores([])
        setSelectedStores([])
        setError("No stores found. Try searching with a different query.")
      }
    } catch (err) {
      console.error("Error fetching stores:", err)
      
      // If API fails, use mock data as fallback
      console.warn("API failed, using mock data:", err)
      
      const mockResults: PlaceResult[] = [
        {
          place_id: "ChIJN1t_tDeuEmsRUsoyG83frY4",
          name: "Paradise Dynasty - ION Orchard",
          formatted_address: "2 Orchard Turn, #04-12A, ION Orchard, Singapore 238801",
          types: ["restaurant", "food", "point_of_interest", "establishment"],
          rating: 4.2,
          user_ratings_total: 1523,
          isAdded: true
        },
        {
          place_id: "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
          name: "Paradise Dynasty - Suntec City",
          formatted_address: "3 Temasek Boulevard, #02-135, Suntec City, Singapore 038983",
          types: ["restaurant", "food", "point_of_interest", "establishment"],
          rating: 4.1,
          user_ratings_total: 982
        },
        {
          place_id: "ChIJv1U1FCW12jERd6R3CZBk7FI",
          name: "Paradise Dynasty - VivoCity",
          formatted_address: "1 HarbourFront Walk, #02-149, VivoCity, Singapore 098585",
          types: ["restaurant", "food", "point_of_interest", "establishment"],
          rating: 4.0,
          user_ratings_total: 756
        },
        {
          place_id: "ChIJPwu4fEIZ2jERqLSVqYYD3HI",
          name: "Paradise Dynasty - Jewel Changi Airport",
          formatted_address: "78 Airport Boulevard, #02-256, Jewel Changi Airport, Singapore 819666",
          types: ["restaurant", "food", "point_of_interest", "establishment"],
          rating: 4.3,
          user_ratings_total: 445
        }
      ]
      
      // Mark stores as already added based on place_id
      const resultsWithStatus = mockResults.map(store => ({
        ...store,
        isAdded: ALREADY_ADDED_PLACE_IDS.includes(store.place_id)
      }))
      
      setStores(resultsWithStatus)
      setSelectedStores(resultsWithStatus.map(store => store.place_id))
    } finally {
      setIsLoading(false)
    }
  }, [researchBusiness])

  useEffect(() => {
    // Auto-search for demonstration - in production, you might want to search based on the business name
    searchForStores("Paradise Dynasty Singapore")
  }, [searchForStores])

  const handleStoreSelection = (storeId: string) => {
    setSelectedStores(prev => {
      if (prev.includes(storeId)) {
        return prev.filter(id => id !== storeId)
      }
      return [...prev, storeId]
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchForStores(searchQuery)
  }

  // Count of new stores to be added (excluding already added stores)
  const newStoresCount = selectedStores.filter(
    id => !stores.find(store => store.place_id === id)?.isAdded
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
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for your business name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </form>

          {error && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Results count and research indicator */}
          <div className="flex items-center justify-between">
            {stores.length > 0 && !isLoading && (
              <div className="text-sm text-muted-foreground">
                Found {stores.length} location{stores.length !== 1 ? 's' : ''} in Singapore
              </div>
            )}
            {isResearching && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>Researching business details...</span>
              </div>
            )}
          </div>

          {/* Store List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : stores.length > 0 ? (
            <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2">
              {stores.map((store) => (
                <div
                  key={store.place_id}
                  className={cn(
                    "rounded-lg border bg-card p-4 hover:shadow-md transition-shadow",
                    store.isAdded && "bg-primary/5 border-primary/50"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-2 ${
                        selectedStores.includes(store.place_id) ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
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
                        <p className="text-sm text-muted-foreground">{store.formatted_address}</p>
                        {store.rating && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>★ {store.rating}</span>
                            <span>•</span>
                            <span>{store.user_ratings_total} reviews</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Checkbox
                      checked={selectedStores.includes(store.place_id)}
                      onCheckedChange={() => handleStoreSelection(store.place_id)}
                      disabled={store.isAdded}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Store className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No stores found. Try searching with your business name.</p>
            </div>
          )}

          {/* Selection Summary */}
          {stores.length > 0 && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="text-sm">
                Adding{" "}
                <span className="font-medium">{newStoresCount}</span>{" "}
                {newStoresCount === 1 ? 'store' : 'stores'} to your account
              </div>
            </div>
          )}
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
            onClick={() => router.push("/onboarding/order-types")}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}