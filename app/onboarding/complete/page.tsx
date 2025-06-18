"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { getStoredBusinessResearch, type StoredBusinessResearch } from "@/lib/business-research"
import { 
  CheckCircle2, 
  Store, 
  Globe, 
  Instagram, 
  Facebook, 
  Clock,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  Quote,
  Newspaper,
  ChefHat,
  Sparkles
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function CompletePage() {
  const router = useRouter()
  const [businessData, setBusinessData] = useState<StoredBusinessResearch | null>(null)

  useEffect(() => {
    const data = getStoredBusinessResearch()
    setBusinessData(data)
  }, [])

  if (!businessData) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-semibold">Setup Complete!</h2>
            <p className="text-muted-foreground">
              Your onboarding is complete. No business research data was found.
            </p>
            <Button onClick={() => router.push("/")}>Go to Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { brand, stores } = businessData.data

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <div>
              <h1 className="text-2xl font-semibold">Onboarding Complete!</h1>
              <p className="text-muted-foreground">
                We&apos;ve gathered information about {brand.name}. Here&apos;s what we found:
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="brand" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="brand">Brand Info</TabsTrigger>
          <TabsTrigger value="metadata">Details</TabsTrigger>
          <TabsTrigger value="stores">Locations</TabsTrigger>
          <TabsTrigger value="raw">Raw Data</TabsTrigger>
        </TabsList>

        <TabsContent value="brand" className="space-y-4">
          {/* Brand Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-6">
                {brand.squareLogo && (
                  <img 
                    src={brand.squareLogo} 
                    alt={`${brand.name} logo`}
                    className="w-24 h-24 rounded-lg object-contain border"
                  />
                )}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      {brand.name}
                      <div 
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: brand.primaryColour }}
                        title="Primary Color"
                      />
                    </h3>
                    <p className="text-muted-foreground mt-1">{brand.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {brand.website && (
                      <a href={brand.website} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Globe className="h-4 w-4 mr-2" />
                          Website
                        </Button>
                      </a>
                    )}
                    {brand.socialLinks.instagram && (
                      <a href={brand.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Instagram className="h-4 w-4 mr-2" />
                          Instagram
                        </Button>
                      </a>
                    )}
                    {brand.socialLinks.facebook && (
                      <a href={brand.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Facebook className="h-4 w-4 mr-2" />
                          Facebook
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {brand.metadata.slogans.length > 0 && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Quote className="h-5 w-5 text-muted-foreground mb-2" />
                  <p className="italic">{brand.metadata.slogans.join(" • ")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-4">
          {/* Brand History & Philosophy */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  History
                </h4>
                <p className="text-sm text-muted-foreground">{brand.metadata.brand_history}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Identity & Philosophy
                </h4>
                <p className="text-sm text-muted-foreground">{brand.metadata.identity_and_philosophy}</p>
              </div>
            </CardContent>
          </Card>

          {/* Menu Information */}
          <Card>
            <CardHeader>
              <CardTitle>Menu Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <ChefHat className="h-4 w-4" />
                  Signature Dishes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {brand.metadata.signature_dishes.map((dish, index) => (
                    <Badge key={index} variant="secondary">{dish}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Menu Summary:</span> {brand.metadata.menu_summary}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Seasonal Offerings */}
          {brand.metadata.seasonal_offerings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Offerings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {brand.metadata.seasonal_offerings.map((offering, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-4">
                      <h4 className="font-medium">{offering.item}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(offering.start_date).toLocaleDateString()} - {new Date(offering.end_date).toLocaleDateString()}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{offering.notes}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Media Mentions */}
          {brand.metadata.media_mentions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Media Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {brand.metadata.media_mentions.map((mention, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Newspaper className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <a 
                          href={mention.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium hover:underline"
                        >
                          {mention.title}
                        </a>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{mention.source}</span>
                          <span>•</span>
                          <span>{new Date(mention.date_published).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="stores" className="space-y-4">
          {/* Store Locations */}
          {stores.map((store, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  {store.store_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">{store.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{store.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Price Level: {"$".repeat(store.googlerelated.pricelevel)}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Opening Hours</h4>
                  <div className="grid gap-1 text-sm">
                    {Object.entries(store.googlerelated.openingHours).map(([day, hours]) => (
                      <div key={day} className="grid grid-cols-[100px,1fr] gap-2">
                        <span className="font-medium">{day}:</span>
                        <span className="text-muted-foreground">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="raw">
          <Card>
            <CardHeader>
              <CardTitle>Raw Data (JSON)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                {JSON.stringify(businessData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => router.push("/onboarding/password")}
        >
          Start Over
        </Button>
        <Button onClick={() => router.push("/")}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}