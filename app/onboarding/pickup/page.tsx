"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, Suspense } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Clock, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"

const formSchema = z.object({
  pickupStartBuffer: z.number().min(0).default(30),
  pickupEndBuffer: z.number().min(0).default(30),
})

// Mock store data
const mockStores = [
  {
    id: "store1",
    name: "Paradise Dynasty - ION Orchard",
    openingHours: {
      sunday: "11 AM to 2 PM, 5 to 10 PM",
      monday: "11 AM to 2 PM, 5 to 10 PM",
      tuesday: "11 AM to 2 PM, 5 to 10 PM",
      wednesday: "11 AM to 2 PM, 5 to 10 PM",
      thursday: "11 AM to 2 PM, 5 to 10 PM",
      friday: "11 AM to 2 PM, 5 to 10 PM",
      saturday: "11 AM to 2 PM, 5 to 10 PM",
    }
  },
  {
    id: "store2",
    name: "Paradise Dynasty - Suntec City",
    openingHours: {
      sunday: "11 AM to 2 PM, 5 to 10 PM",
      monday: "11 AM to 2 PM, 5 to 10 PM",
      tuesday: "11 AM to 2 PM, 5 to 10 PM",
      wednesday: "11 AM to 2 PM, 5 to 10 PM",
      thursday: "11 AM to 2 PM, 5 to 10 PM",
      friday: "11 AM to 2 PM, 5 to 10 PM",
      saturday: "11 AM to 2 PM, 5 to 10 PM",
    }
  }
]

// Helper function to parse time string to minutes
function parseTimeToMinutes(timeStr: string): number {
  const [timeComponent, periodStr] = timeStr.trim().split(" ")
  const [hourStr, minuteStr = "0"] = timeComponent.split(":")
  let hour = parseInt(hourStr)
  const minutes = parseInt(minuteStr)
  
  let period = periodStr
  if (!period) {
    period = hour < 12 ? "PM" : "AM"
  }
  
  if (period === "PM" && hour < 12) hour += 12
  if (period === "AM" && hour === 12) hour = 0
  
  return (hour * 60) + minutes
}

// Helper function to format minutes to 12-hour time
function formatMinutesToTime(totalMinutes: number): string {
  const hour = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const period = hour >= 12 ? "PM" : "AM"
  
  let displayHour = hour
  if (hour > 12) displayHour -= 12
  if (hour === 0) displayHour = 12
  
  return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`
}

// Helper function to adjust time string with buffer
function adjustTimeWithBuffer(timeStr: string, startBuffer: number, endBuffer: number, isEnd: boolean): string {
  const minutes = parseTimeToMinutes(timeStr)
  const adjustedMinutes = isEnd ? minutes - endBuffer : minutes + startBuffer
  return formatMinutesToTime(adjustedMinutes)
}

// Helper function to format time periods with buffer
function formatTimePeriodsWithBuffer(periods: string, startBuffer: number, endBuffer: number): string {
  return periods.split(", ").map(period => {
    const [start, end] = period.split(" to ")
    const adjustedStart = adjustTimeWithBuffer(start, startBuffer, 0, false)
    const adjustedEnd = adjustTimeWithBuffer(end, 0, endBuffer, true)
    return `${adjustedStart} to ${adjustedEnd}`
  }).join(", ")
}

// Separate component that uses useSearchParams
function PickupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const hasDelivery = searchParams.has("delivery")
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [weeklyHours, setWeeklyHours] = useState<Record<string, string>>({
    sunday: "10:00",
    monday: "10:00",
    tuesday: "10:00",
    wednesday: "10:00",
    thursday: "10:00",
    friday: "10:00",
    saturday: "10:00",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupStartBuffer: 30,
      pickupEndBuffer: 30,
    },
  })

  // Get preview store for buffer calculations
  const previewStore = mockStores[0]
  const startBuffer = form.watch("pickupStartBuffer")
  const endBuffer = form.watch("pickupEndBuffer")

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    if (hasDelivery) {
      router.push("/onboarding/delivery")
    } else {
      router.push("/onboarding/engagements")
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/onboarding/order-types")}
              className="gap-2"
            >
              ← Back
            </Button>
          </div>
          <h2 className="text-2xl font-semibold">When can an order be picked up by customers/drivers?</h2>
          <p className="text-muted-foreground mt-2">
            Set when orders can be picked up from your stores
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">How would you like to set pickup hours?</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                className={cn(
                  "p-4 rounded-lg border text-left transition-all hover:border-primary/50",
                  !isCustomizing && "border-primary bg-primary/5"
                )}
                onClick={() => setIsCustomizing(false)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Based on operating hours</p>
                    <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">
                      Recommended
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Set pickup windows relative to your stores&apos; opening and closing times (e.g., 30 mins after open, 1 hour before close)
                  </p>
                </div>
              </button>

              <button
                className={cn(
                  "p-4 rounded-lg border text-left transition-all hover:border-primary/50",
                  isCustomizing && "border-primary bg-primary/5"
                )}
                onClick={() => setIsCustomizing(true)}
              >
                <div>
                  <p className="font-medium">Custom time windows</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Set specific pickup time slots independent of operating hours (e.g., 11:30 AM - 2:30 PM, 5:30 PM - 9:30 PM)
                  </p>
                </div>
              </button>
            </div>
          </div>

          {!isCustomizing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column - Buffer Settings */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Buffer Settings</h4>
                      <FormField
                        control={form.control}
                        name="pickupStartBuffer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preparation Time</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Input 
                                  type="number"
                                  min={0}
                                  className="w-24"
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value))}
                                />
                                <span className="text-sm text-muted-foreground">minutes</span>
                              </div>
                            </FormControl>
                            <FormDescription>
                              Time needed to prepare orders before first pickup
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="pickupEndBuffer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Order Buffer</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Input 
                                  type="number"
                                  min={0}
                                  className="w-24"
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value))}
                                />
                                <span className="text-sm text-muted-foreground">minutes</span>
                              </div>
                            </FormControl>
                            <FormDescription>
                              Time needed before closing for final pickups
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Right Column - Preview */}
                    {previewStore && (
                      <div className="space-y-3 border-l pl-6">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Preview of Pickup Hours
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(previewStore.openingHours).map(([day, hours]) => (
                            <div key={day} className="grid grid-cols-[80px,1fr] gap-2 text-sm">
                              <div className="font-medium capitalize">{day}</div>
                              <div className="text-muted-foreground">
                                {formatTimePeriodsWithBuffer(hours, startBuffer, endBuffer)}
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          * Preview based on {previewStore.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Button 
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push("/onboarding/order-types")}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="w-full">
                      Continue to {hasDelivery ? "Delivery Setup" : "Menu Details"}
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost"
                    className="w-full text-muted-foreground"
                    onClick={() => {
                      if (hasDelivery) {
                        router.push("/onboarding/delivery")
                      } else {
                        router.push("/onboarding/engagements")
                      }
                    }}
                  >
                    Skip to Next Step
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="space-y-6">
              <div className="rounded-lg border p-4 space-y-6">
                {mockStores.map((store) => (
                  <div key={store.id} className="space-y-4">
                    <h4 className="font-medium">{store.name}</h4>
                    {Object.entries(weeklyHours).map(([day, hours]) => (
                      <div key={day} className="grid grid-cols-[auto,1fr,auto,1fr,auto] items-center gap-4">
                        <Checkbox
                          id={`${store.id}-${day}`}
                          className="ml-2"
                          checked={true}
                          disabled
                        />
                        <label htmlFor={`${store.id}-${day}`} className="font-medium capitalize">
                          {day}
                        </label>
                        <Input
                          type="time"
                          value={hours}
                          onChange={(e) => setWeeklyHours(prev => ({
                            ...prev,
                            [day]: e.target.value
                          }))}
                          className="w-32"
                        />
                        <Input
                          type="time"
                          value={hours}
                          onChange={(e) => setWeeklyHours(prev => ({
                            ...prev,
                            [day]: e.target.value
                          }))}
                          className="w-32"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/onboarding/order-types")}
                  >
                    Back
                  </Button>
                  <Button className="w-full" onClick={() => {
                    if (hasDelivery) {
                      router.push("/onboarding/delivery")
                    } else {
                      router.push("/onboarding/menu")
                    }
                  }}>
                    Continue to {hasDelivery ? "Delivery Setup" : "Menu Details"}
                  </Button>
                </div>
                
                <Button 
                  variant="ghost"
                  className="w-full text-muted-foreground"
                  onClick={() => {
                    if (hasDelivery) {
                      router.push("/onboarding/delivery")
                    } else {
                      router.push("/onboarding/menu")
                    }
                  }}
                >
                  Skip to Next Step
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Main component with Suspense boundary
export default function PickupPage() {
  return (
    <Suspense fallback={
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    }>
      <PickupForm />
    </Suspense>
  )
} 