"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState, useEffect } from "react"

const countries = [
  { value: "sg", label: "Singapore" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
]

const existingAccounts = [
  { 
    value: "acc_01HNYP2K5RWJF8V9X6Q3M7B4ZD", 
    label: "Jumbo Group", 
    billing: { 
      companyName: "Jumbo Group Holdings Pte Ltd",
      regNumber: "199503898K",
      billingEmail: "accounts@jumbogroup.sg",
      address: "4 Kaki Bukit Ave 1",
      country: "sg",
      postal: "417939"
    },
    users: [
      { 
        id: "usr_01HNYP4M6TN8D2XJVK5RQWC3FB", 
        name: "Angeline Tan", 
        email: "angeline.tan@jumbogroup.sg", 
        role: "Finance Director",
        phone: "+6591234567"
      },
      { 
        id: "usr_01HNYP6P7WM9E3YHUL4SQVN2GC", 
        name: "Marcus Lee", 
        email: "marcus.lee@jumbogroup.sg", 
        role: "Operations Manager",
        phone: "+6598765432"
      }
    ]
  },
  {
    value: "acc_01HNYPB8X5KH7M4WVTQ2PJNR9E",
    label: "Paradise Group",
    billing: {
      companyName: "Paradise Group Holdings Pte Ltd",
      regNumber: "200307297Z",
      billingEmail: "finance@paradisegroup.com",
      address: "91 Defu Lane 10",
      country: "sg",
      postal: "539221"
    },
    users: [
      {
        id: "usr_01HNYPD9Y6LJ8N5XWUR3QKMS0F",
        name: "Sarah Wong",
        email: "sarah.wong@paradisegroup.com",
        role: "Finance Manager",
        phone: "+6590001111"
      },
      {
        id: "usr_01HNYPF0Z7MK9P6YXVS4RLNT1G",
        name: "David Lim",
        email: "david.lim@paradisegroup.com",
        role: "Regional Director",
        phone: "+6592223333"
      }
    ]
  }
]

const formSchema = z.object({
  // Your Details
  userId: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  
  // Brand Details
  brandName: z.string().min(1, "Brand name is required"),
  storeAddress: z.string().min(1, "Store address is required"),
  storeCountry: z.string().min(1, "Country is required"),
  storePostal: z.string().min(1, "Postal code is required"),
})

export default function DetailsContent() {
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "Sarah",
      lastName: "Wong",
      role: "Operations Director",
      email: "sarah.wong@jumbogroup.sg",
      phone: "+65 9123 4567",
      brandName: "Paradise Dynasty",
      storeAddress: "2 Orchard Turn #04-12 ION Orchard",
      storeCountry: "sg",
      storePostal: "238801"
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    router.push("/merchant-sign-up/billing")
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">
            Your Details
          </h1>
          <p className="text-muted-foreground mt-2">
            Enter your contact information and brand details
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Merchant Information Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Merchant Information</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  You confirmed that you are authorised to subscribe to Oddle services.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={true} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={true} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={true} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Brand Section */}
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Restaurant Information</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your brand and first store details. You may add additional brands/stores later.
                </p>
              </div>

              <FormField
                control={form.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your brand name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter store address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="storeCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storePostal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter postal code" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 