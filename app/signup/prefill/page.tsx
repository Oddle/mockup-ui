"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect, useCallback, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

const products = [
  { 
    id: "pos", 
    label: "Oddle POS",
    description: "All-in-one cloud POS system with integrated payments, inventory, and staff management",
    image: "/pos.jpg",
    commitmentFee: 499
  },
  { 
    id: "delivery", 
    label: "Oddle Delivery",
    description: "Manage your own delivery fleet or leverage our delivery partners network",
    image: "/delivery.jpg",
    commitmentFee: 299
  },
  { 
    id: "ecommerce", 
    label: "Oddle E-commerce",
    description: "Custom-branded online ordering website with marketing tools and analytics",
    image: "/ecommerce.jpg",
    commitmentFee: 399
  },
  { 
    id: "payments", 
    label: "Oddle Payments",
    description: "Integrated payment solution with competitive rates and quick settlements",
    image: "/payments.jpg",
    commitmentFee: 199
  },
  { 
    id: "reservations", 
    label: "Oddle Reservations",
    description: "Table management and reservation system with customer database",
    image: "/reservations.jpg",
    commitmentFee: 299
  },
  { 
    id: "marketing", 
    label: "Oddle Marketing",
    description: "CRM and marketing tools to grow your customer base and increase loyalty",
    image: "/marketing.jpg",
    commitmentFee: 249
  }
]

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
  userId: z.string().optional(),
  accountType: z.enum(["new", "existing"]),
  accountId: z.string().optional(),
  brandType: z.enum(["new", "existing"]).optional(),
  country: z.string().min(1, "Please select a country"),
  products: z.array(z.string()).min(1, "Please select at least one product"),
  productFees: z.record(z.number().min(0, "Fee must be positive")).optional(),
  productPlanCodes: z.record(z.string()).optional(),
  planCodeInput: z.string().optional(),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(5, "Phone number is required"),
  role: z.string().min(2, "Role is required"),
  brand: z.string().optional(),
  salesRep: z.string().min(2, "Sales Rep is required"),
  email: z.string().email("Invalid email address"),
  billingType: z.enum(["new", "existing"]).optional(),
  companyName: z.string().optional(),
  registrationNumber: z.string().optional(),
  address: z.string().optional(),
  billingCountry: z.string().optional(),
  postal: z.string().optional(),
})

function PrefillForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const accountId = searchParams.get('account_id')
  
  const [step, setStep] = useState(1)
  const [accountType, setAccountType] = useState<"new" | "existing">("new")
  const [selectedAccount, setSelectedAccount] = useState<string>("")
  const [billingType, setBillingType] = useState<"new" | "existing">("new")
  const [brandType, setBrandType] = useState<"new" | "existing">("existing")

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products: [],
      productFees: {},
      productPlanCodes: {},
      planCodeInput: "",
    },
  })

  // Use useWatch for form values that need to be watched
  const productFees = useWatch({
    control: form.control,
    name: "productFees",
    defaultValue: {}
  }) as Record<string, number>

  const productPlanCodes = useWatch({
    control: form.control,
    name: "productPlanCodes",
    defaultValue: {}
  }) as Record<string, string>

  useEffect(() => {
    if (accountId) {
      setAccountType("existing")
      setSelectedAccount(accountId)
      setBillingType("existing")
      setBrandType("existing")
      
      const account = existingAccounts.find(a => a.value === accountId)
      if (account) {
        form.setValue("accountType", "existing")
        form.setValue("accountId", accountId)
        form.setValue("billingType", "existing")
        form.setValue("brandType", "existing")
        
        form.setValue("companyName", account.billing.companyName)
        form.setValue("registrationNumber", account.billing.regNumber)
        form.setValue("address", account.billing.address)
        form.setValue("billingCountry", account.billing.country)
        form.setValue("postal", account.billing.postal)
      }
    } else {
      setAccountType("new")
      setBillingType("new")
      setBrandType("new")
      form.setValue("accountType", "new")
      form.setValue("billingType", "new")
      form.setValue("brandType", "new")
    }
  }, [accountId, form])

  async function onSubmit() {
    try {
      // Add your API call here
      // await submitForm(values)
      
      // Redirect to merchant pricing page after successful submission
      router.push("/merchant-pricing")
    } catch (error) {
      console.error("Error submitting form:", error)
      // Handle error (you might want to show an error message to the user)
    }
  }

  const handleApplyPlanCode = useCallback(() => {
    const planCode = form.getValues("planCodeInput")
    if (!planCode) return
    
    // Find product matching plan code and update its fee
    // This is where you would typically make an API call to validate the plan code
    // For now, we'll just update the first selected product as an example
    const selectedProducts = form.getValues('products')
    if (selectedProducts.length > 0) {
      const productId = selectedProducts[0]
      
      // Update plan code
      form.setValue(`productPlanCodes.${productId}`, planCode)
      
      // Here you would typically get the new fee from the API
      // For now, we'll just modify the fee as an example
      form.setValue(`productFees.${productId}`, 299)
      
      // Clear the input
      form.setValue("planCodeInput", "")
    }
  }, [form])

  const handleRemovePlanCode = useCallback((productId: string, commitmentFee: number) => {
    // Remove plan code
    const currentPlanCodes = form.getValues("productPlanCodes") || {}
    const { [productId]: removed, ...rest } = currentPlanCodes
    console.log(removed, rest)
    form.setValue("productPlanCodes", rest)
    
    // Reset to default fee
    form.setValue(`productFees.${productId}`, commitmentFee)
  }, [form])

  return (
    <div className="max-w-[600px] mx-auto py-10 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 ? (
            <>
              {/* Step 1: Country and Products */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Select Country & Products
                  </h2>
                  <p className="text-muted-foreground">
                    Select the country and products to generate the sign up form for
                  </p>
                </div>

                <Card>
                  <CardContent className="pt-6 space-y-6">
                    {/* Country Selection */}
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange}>
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

                    {/* Products Multi-Select */}
                    <FormField
                      control={form.control}
                      name="products"
                      render={() => (
                        <FormItem>
                          <FormLabel>Products</FormLabel>
                          {/* Horizontal scrolling products */}
                          <div className="overflow-x-auto pb-4 -mx-6">
                            <div className="flex gap-4 px-6 min-w-full">
                              {products.map((product) => (
                                <FormField
                                  key={product.id}
                                  control={form.control}
                                  name="products"
                                  render={({ field }) => (
                                    <FormItem className="space-y-0 flex-shrink-0 w-[280px]">
                                      <FormControl>
                                        <Card 
                                          className={`cursor-pointer transition-colors h-[300px] ${
                                            field.value?.includes(product.id) 
                                              ? 'border-primary bg-primary/5' 
                                              : 'hover:bg-muted/50'
                                          }`}
                                        >
                                          <CardContent className="p-6 flex flex-col h-full">
                                            <div className="flex items-start gap-4">
                                              <Checkbox
                                                checked={field.value?.includes(product.id)}
                                                onCheckedChange={(checked: boolean) => {
                                                  const updatedProducts = checked
                                                    ? [...(field.value || []), product.id]
                                                    : field.value?.filter((value: string) => value !== product.id)
                                                  field.onChange(updatedProducts)
                                                  
                                                  if (checked) {
                                                    form.setValue(`productFees.${product.id}`, product.commitmentFee)
                                                  } else {
                                                    // Remove fees and plan codes when unchecking
                                                    const currentFees = form.getValues("productFees") || {}
                                                    const { [product.id]: removedFee, ...restFees } = currentFees
                                                    console.log(removedFee, restFees)
                                                    form.setValue("productFees", restFees)

                                                    const currentPlanCodes = form.getValues("productPlanCodes") || {}
                                                    const { [product.id]: removedPlanCode, ...restPlanCodes } = currentPlanCodes
                                                    console.log(removedPlanCode, restPlanCodes)
                                                    form.setValue("productPlanCodes", restPlanCodes)
                                                  }
                                                }}
                                              />
                                              <div>
                                                <h4 className="font-medium text-base">{product.label}</h4>
                                                <p className="text-sm text-muted-foreground mt-2">
                                                  {product.description}
                                                </p>
                                              </div>
                                            </div>
                                            
                                            <div className="mt-auto">
                                              {productPlanCodes[product.id] && (
                                                <div className="text-sm text-muted-foreground">
                                                  Plan: {productPlanCodes[product.id]}
                                                  <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-4 px-2 ml-2"
                                                    onClick={(e) => {
                                                      e.stopPropagation()
                                                      handleRemovePlanCode(product.id, product.commitmentFee)
                                                    }}
                                                  >
                                                    Remove
                                                  </Button>
                                                </div>
                                              )}
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Fee Summary Section - Only show selected products */}
                          <Card>
                            <CardContent className="p-4">
                              <h4 className="font-medium mb-4">Commitment Fees</h4>
                              <div className="space-y-3">
                                {Object.entries(productFees).map(([productId, fee]) => (
                                  <div key={productId} className="flex items-center justify-between">
                                    <span className="text-sm">{products.find(p => p.id === productId)?.label}</span>
                                    <span className="text-sm font-medium">${fee}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          {/* Plan Code Input */}
                          <div className="pt-4 space-y-4">
                            <div className="flex gap-2">
                              <FormField
                                control={form.control}
                                name="planCodeInput"
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input
                                        placeholder="Enter plan code"
                                        {...field}
                                        value={field.value || ""}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="button"
                                onClick={handleApplyPlanCode}
                              >
                                Apply Code
                              </Button>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Enter a plan code to modify product pricing
                            </div>
                          </div>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    form.trigger(['country', 'products']).then((isValid) => {
                      if (isValid) {
                        setStep(2)
                      }
                    })
                  }}
                >
                  Continue to Details
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Step 2: Merchant Details */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Enter Merchant Details
                  </h2>
                  <p className="text-muted-foreground">
                    Prefill the merchant info to make it easier for them to complete the sign up form
                  </p>
                </div>

                {/* Merchant Info Card */}
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <h3 className="text-lg font-semibold">Merchant Info</h3>
                    
                    {accountType === "existing" ? (
                      <>
                        <FormField
                          control={form.control}
                          name="userId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Select User</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value)
                                  const account = existingAccounts.find(a => a.value === accountId)
                                  const user = account?.users.find(u => u.id === value)
                                  if (user) {
                                    form.setValue("firstName", user.name.split(" ")[0])
                                    form.setValue("lastName", user.name.split(" ")[1])
                                    form.setValue("email", user.email)
                                    form.setValue("role", user.role)
                                    form.setValue("phone", user.phone)
                                  }
                                }}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an existing user" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {existingAccounts
                                    .find(a => a.value === accountId)
                                    ?.users.map((user) => (
                                      <SelectItem key={user.id} value={user.id}>
                                        {user.name} - {user.role}
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
                          name="brandType"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Brand</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={(value: "new" | "existing") => {
                                    field.onChange(value)
                                    setBrandType(value)
                                    if (value === "new") {
                                      form.setValue("brand", "")
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
                                      New Brand
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="existing" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Use Existing Brand
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {brandType === "new" && (
                          <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Brand Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </>
                    ) : (
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    )}

                    {/* Row 2: First Name | Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={accountType === "existing"} />
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
                              <Input {...field} disabled={accountType === "existing"} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row 3: Phone | Email */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={accountType === "existing"} />
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
                              <Input {...field} type="email" disabled={accountType === "existing"} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Row 4: Role */}
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={accountType === "existing"} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Row 5: Sales Rep */}
                    <FormField
                      control={form.control}
                      name="salesRep"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sales Rep</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Account & Billing Card */}
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <h3 className="text-lg font-semibold">Account & Billing Information</h3>

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
                                        form.setValue("billingCountry", account.billing.country)
                                        form.setValue("postal", account.billing.postal)
                                      }
                                    } else {
                                      form.setValue("companyName", "")
                                      form.setValue("registrationNumber", "")
                                      form.setValue("address", "")
                                      form.setValue("billingCountry", "")
                                      form.setValue("postal", "")
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
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
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
                          name="billingCountry"
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
                          name="postal"
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
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="w-full">
                    Generate Form
                  </Button>
                </div>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  )
}

export default function SignUpPrefill() {
  return (
    <Suspense fallback={
      <div className="max-w-[600px] mx-auto py-10 px-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <PrefillForm />
    </Suspense>
  )
} 