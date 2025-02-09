"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const selectedProducts = [
  {
    label: "Oddle POS",
    description: "All-in-one cloud POS system with integrated payments, inventory, and staff management",
    commitmentFee: 499,
    usageFee: "2.5% per transaction"
  },
  {
    label: "Oddle Delivery",
    description: "Manage your own delivery fleet or leverage our delivery partners network",
    commitmentFee: 299,
    usageFee: "10% per order"
  },
  {
    label: "Oddle E-commerce",
    description: "Custom-branded online ordering website with marketing tools and analytics",
    commitmentFee: 399,
    usageFee: "5% per order"
  },
  {
    label: "Oddle Reserve",
    description: "Table management and reservation system with customer database",
    commitmentFee: 199,
    usageFee: "10 cents per booking"
  },
  {
    label: "Oddle Loyalty",
    description: "Customer loyalty program with points and rewards management",
    commitmentFee: 249,
    usageFee: (
      <div className="space-y-1">
        <div>35 cents per sign up</div>
        <div>70 cents per enrollment</div>
      </div>
    )
  }
]

const formSchema = z.object({
  salesRep: z.string().min(1, "Sales representative is required"),
  products: z.array(z.string()).optional(),
  productFees: z.record(z.number().min(0, "Fee must be positive")).optional(),
})

export default function PricingContent() {
  const router = useRouter()
  const totalFee = selectedProducts.reduce((sum, product) => sum + product.commitmentFee, 0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salesRep: "",
      products: selectedProducts.map(p => p.label),
      productFees: {},
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    router.push("/merchant-sign-up/details")
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">
            Get Started with Oddle
          </h1>
          <p className="text-muted-foreground mt-2">
            Review the following products and their pricing
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Selected Products Summary */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Selected Products</h2>
              <div className="space-y-4">
                {selectedProducts.map((product, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium">{product.label}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {product.description}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                          <div>
                            <div className="text-sm text-muted-foreground">Usage Fee</div>
                            <div className="font-medium">
                              {product.usageFee}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Commitment Fee</div>
                            <div className="text-primary font-semibold">
                              ${product.commitmentFee.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Total Section */}
            <div>
              <div className="flex justify-between items-center py-4 border-t">
                <div className="text-lg font-semibold">Total Commitment Fee</div>
                <div className="text-2xl font-bold text-primary">
                  ${totalFee.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Sales Representative moved here */}
            <FormField
              control={form.control}
              name="salesRep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sales Representative</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter sales representative name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              className="w-full"
              size="lg"
              type="submit"
            >
              Next
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 