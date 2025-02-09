"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Loader2, Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// Mock Google Places data
const mockGooglePlaces = [
  {
    id: "place1",
    name: "Paradise Dynasty - ION Orchard",
    address: "2 Orchard Turn, #04-12A ION Orchard, Singapore 238801",
    rating: 4.3,
    photos: ["/restaurant1.jpg"],
    openingHours: "10:00 AM - 10:00 PM",
    phone: "+65 6509 9118",
    website: "https://paradisegp.com",
  },
  {
    id: "place2",
    name: "Paradise Dynasty - Suntec City",
    address: "3 Temasek Boulevard, #02-135 Suntec City, Singapore 038983",
    rating: 4.2,
    photos: ["/restaurant2.jpg"],
    openingHours: "11:00 AM - 10:00 PM",
    phone: "+65 6509 9786",
    website: "https://paradisegp.com",
  },
  {
    id: "place3",
    name: "Paradise Dynasty - VivoCity",
    address: "1 HarbourFront Walk, #01-53 VivoCity, Singapore 098585",
    rating: 4.4,
    photos: ["/restaurant3.jpg"],
    openingHours: "11:00 AM - 10:00 PM",
    phone: "+65 6376 8871",
    website: "https://paradisegp.com",
  },
]

const formSchema = z.object({
  storeName: z.string().min(2, "Store name is required"),
  selectedStores: z.array(z.string()).min(1, "Please select at least one store"),
})

export default function StorePage() {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof mockGooglePlaces>([])
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "Paradise Dynasty", // Prefilled brand name
      selectedStores: [],
    },
  })

  // Trigger initial search with prefilled brand name
  useEffect(() => {
    if (form.getValues("storeName")) {
      searchPlaces(form.getValues("storeName"))
    }
  }, [])

  // Simulate Google Places search
  const searchPlaces = (brandName: string) => {
    setIsSearching(true)
    // Simulate API delay
    setTimeout(() => {
      setSearchResults(mockGooglePlaces.filter(place => 
        place.name.toLowerCase().includes(brandName.toLowerCase())
      ))
      setIsSearching(false)
    }, 1000)
  }

  // Watch for store name changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "storeName" && value.storeName && value.storeName.length > 2) {
        searchPlaces(value.storeName)
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    router.push("/onboarding/menu")
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Store Details</h2>
          <p className="text-muted-foreground mt-2">
            Select the stores you want to enable for online ordering
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} disabled />
                        {isSearching && (
                          <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                        {!isSearching && (
                          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Your brand name is used to find your stores
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {searchResults.length > 0 && (
                <FormField
                  control={form.control}
                  name="selectedStores"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Select Your Stores</FormLabel>
                        <FormDescription>
                          Choose the stores that you want to enable online ordering for
                        </FormDescription>
                      </div>
                      <div className="space-y-4">
                        {searchResults.map((place) => (
                          <FormField
                            key={place.id}
                            control={form.control}
                            name="selectedStores"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={place.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(place.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, place.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== place.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-base">
                                      {place.name}
                                    </FormLabel>
                                    <FormDescription>
                                      {place.address}
                                      <br />
                                      {place.phone} • {place.openingHours}
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="flex gap-4">
              <Button 
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button type="submit" className="w-full">
                Continue to Menu Details
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 