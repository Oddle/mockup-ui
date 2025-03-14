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
import { useState, Suspense } from "react"
import { Loader2, FileText, Globe } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const formSchema = z.object({
  importSource: z.enum(["platform", "url", "file"]),
  platformUrl: z.string().url("Please enter a valid URL").optional(),
  websiteUrl: z.string().url("Please enter a valid URL").optional(),
  menuFile: z.any().optional(),
})

type FormValues = z.infer<typeof formSchema>

// Separate component that uses useSearchParams
import { useSearchParams } from "next/navigation"

function MenuForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPage = searchParams.get("next") || "/onboarding/contact"
  const [isImporting, setIsImporting] = useState(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      importSource: "platform",
      platformUrl: "",
      websiteUrl: "",
    },
  })

  function onSubmit(values: FormValues) {
    setIsImporting(true)
    console.log(values)
    // Simulate import process
    setTimeout(() => {
      setIsImporting(false)
      // Always navigate to contact page regardless of import method
      router.push(nextPage)
    }, 2000)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Import Your Menu</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Choose how you want to import your menu items
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Accordion 
              type="single" 
              collapsible 
              defaultValue="platform" 
              className="w-full"
              onValueChange={(value: string) => {
                if (value) {
                  form.setValue("importSource", value as FormValues["importSource"])
                }
              }}
            >
              <AccordionItem value="platform">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Import from Food Platforms</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <FormField
                    control={form.control}
                    name="platformUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Food Platform URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://food-platform.com/your-restaurant" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Enter your restaurant&apos;s URL from GrabFood, Foodpanda, or Deliveroo
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="url">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Import from Existing URL</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://your-restaurant.com/menu" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the URL of your menu from your website
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="file">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Upload File</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <FormField
                    control={form.control}
                    name="menuFile"
                    render={({ field: { onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Upload Menu File</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.xlsx,.xls,.csv"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const file = e.target.files?.[0]
                              onChange(file)
                            }}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Upload your menu in PDF, Excel, or CSV format
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.back()}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isImporting}
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Importing Menu...
                    </>
                  ) : (
                    "Import Menu"
                  )}
                </Button>
              </div>
              
              <Button 
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => router.push(nextPage)}
              >
                Skip to Next Step
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

// Main component with Suspense boundary
export default function MenuPage() {
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
      <MenuForm />
    </Suspense>
  )
} 