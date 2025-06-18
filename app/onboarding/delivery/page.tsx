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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Info } from "lucide-react"

const formSchema = z.object({
  minOrder: z.number().min(0).default(60),
  deliveryFee: z.number().min(0).default(6.8),
})

export default function DeliveryPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minOrder: 60,
      deliveryFee: 6.8,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    router.push("/onboarding/engagements")
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
          <h2 className="text-2xl font-semibold">Delivery Setup</h2>
          <p className="text-muted-foreground mt-2">
            Based on your location and industry data, we&apos;ve configured the optimal delivery settings to maximize your profitability. These settings are proven to work best for restaurants like yours.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Optimized Delivery Configuration</h3>
            <div className="rounded-lg border p-6 space-y-6">
              <div>
                <h4 className="font-medium mb-2">Deliver Islandwide in Singapore</h4>
                <div className="h-[200px] w-full rounded-lg bg-slate-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-2">Singapore Delivery Coverage Map</div>
                    <div className="text-xs text-slate-500">Islandwide Delivery Available</div>
                  </div>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2">What customers see:</h5>
                      <div className="text-sm text-muted-foreground">
                        Customers will need to make a min. purchase of ${form.watch("minOrder")} and pay ${form.watch("deliveryFee")} in delivery fees.
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium mb-2">What it means for you:</h5>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div>
                          For an order size of ${form.watch("minOrder")}, your effective logistics cost is up to ${form.watch("deliveryFee")} or up to {Math.round((form.watch("deliveryFee") / form.watch("minOrder")) * 100)}% of your revenue.
                        </div>
                        <div className="bg-green-50 text-green-700 p-2 rounded border border-green-200">
                          💡 <strong>Good news:</strong> An average order size with Oddle is $120, making your effective logistics cost just {Math.round((form.watch("deliveryFee") / 120) * 100)}%.
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="minOrder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Order</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5">$</span>
                                <Input
                                  type="number"
                                  min={0}
                                  className="pl-7"
                                  {...field}
                                  onChange={e => field.onChange(parseInt(e.target.value))}
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deliveryFee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Fee</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5">$</span>
                                <Input
                                  type="number"
                                  min={0}
                                  step="0.1"
                                  className="pl-7"
                                  {...field}
                                  onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4 flex gap-2">
                      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-700">
                        These settings are optimized based on successful restaurants in your area. Our data shows this configuration delivers the best balance of order volume and profitability for businesses like yours.
                      </div>
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
                        Start With This
                      </Button>
                    </div>

                    <Button 
                      variant="ghost"
                      className="w-full text-muted-foreground"
                      onClick={() => router.push("/onboarding/engagements")}
                    >
                      Skip to Next Step
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 