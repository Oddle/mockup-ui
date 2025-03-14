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
  { value: "account1", label: "Account 1", 
    billing: { 
      companyName: "Company 1",
      regNumber: "REG123",
      address: "123 Street",
      country: "us",
      postal: "12345"
    }
  },
]

const formSchema = z.object({
  accountType: z.enum(["new", "existing"]),
  accountId: z.string().optional(),
  companyName: z.string().min(1, "Company name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  billingType: z.enum(["new", "existing"]).optional(),
})

export default function BillingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const accountId = searchParams.get('account_id')
  
  const [accountType, setAccountType] = useState<"new" | "existing">("new")
  const [selectedAccount, setSelectedAccount] = useState<string>("")
  const [billingType, setBillingType] = useState<"new" | "existing">("new")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "Restaurant Group LLC",
      registrationNumber: "REG123456",
      email: "billing@company.com",
      address: "123 Restaurant Street",
      country: "us",
      postalCode: "12345",
    },
  })

  useEffect(() => {
    if (accountId) {
      setAccountType("existing")
      setSelectedAccount(accountId)
      setBillingType("existing")
      
      const account = existingAccounts.find(a => a.value === accountId)
      if (account) {
        form.setValue("accountType", "existing")
        form.setValue("accountId", accountId)
        form.setValue("billingType", "existing")
        
        form.setValue("companyName", account.billing.companyName)
        form.setValue("registrationNumber", account.billing.regNumber)
        form.setValue("address", account.billing.address)
        form.setValue("country", account.billing.country)
        form.setValue("postalCode", account.billing.postal)
      }
    } else {
      setAccountType("new")
      setBillingType("new")
      form.setValue("accountType", "new")
      form.setValue("billingType", "new")
    }
  }, [accountId, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    router.push("/merchant-sign-up/completion")
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">
            Billing Organisation
          </h1>
          <p className="text-muted-foreground mt-2">
            Invoices and payouts will be made to the following billing organisation
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Show account info if it's an existing account */}
            {accountType === "existing" && (
              <div className="text-sm text-muted-foreground pb-4">
                Using existing account: {
                  existingAccounts.find(a => a.value === accountId)?.label || accountId
                }
              </div>
            )}

            {/* Billing Information */}
            <div className="space-y-4">
              {accountType === "existing" && (
                <FormField
                  control={form.control}
                  name="billingType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Billing Account</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value: "new" | "existing") => {
                            field.onChange(value)
                            setBillingType(value)
                            
                            if (value === "existing" && selectedAccount) {
                              const account = existingAccounts.find(a => a.value === selectedAccount)
                              if (account) {
                                form.setValue("companyName", account.billing.companyName)
                                form.setValue("registrationNumber", account.billing.regNumber)
                                form.setValue("address", account.billing.address)
                                form.setValue("country", account.billing.country)
                                form.setValue("postalCode", account.billing.postal)
                              }
                            } else {
                              form.setValue("companyName", "")
                              form.setValue("registrationNumber", "")
                              form.setValue("address", "")
                              form.setValue("country", "")
                              form.setValue("postalCode", "")
                            }
                          }}
                          defaultValue={field.value}
                          className="flex flex-row space-x-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="new" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              New Billing Account
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="existing" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Use Existing Billing
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        disabled={accountType === "existing" && billingType === "existing"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        disabled={accountType === "existing" && billingType === "existing"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="email" 
                        disabled={accountType === "existing" && billingType === "existing"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Address</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        disabled={accountType === "existing" && billingType === "existing"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={accountType === "existing" && billingType === "existing"}
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
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          disabled={accountType === "existing" && billingType === "existing"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Payment Summary Section */}
            <div className="space-y-4 pt-4 mt-8 border-t">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Commitment Fee</span>
                  <span>$5,150.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">GST/VAT (9%)</span>
                  <span>$412.00</span>
                </div>
                <div className="flex justify-between items-center pt-2 mt-2 border-t font-medium">
                  <span>Total Amount</span>
                  <span className="text-lg text-primary">$5,562.00</span>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg mt-4">
                <p className="text-sm text-muted-foreground">
                  By clicking &quot;Submit&quot;, you agree to Oddle&apos;s Terms of Service. An invoice will then be sent to both the billing emails and you for payment to be made.
                </p>
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
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 