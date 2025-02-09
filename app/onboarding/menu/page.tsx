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
import { useState } from "react"
import { Loader2, FileSpreadsheet, FileText, Globe, PenLine } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const formSchema = z.object({
  importSource: z.enum(["url", "sheet", "pdf", "manual"]),
  platformUrl: z.string().url("Please enter a valid URL").optional(),
  sheetUrl: z.string().url("Please enter a valid Google Sheet URL").optional(),
  pdfFile: z.any().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function MenuPage() {
  const router = useRouter()
  const [isImporting, setIsImporting] = useState(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      importSource: "url",
      platformUrl: "",
      sheetUrl: "",
    },
  })

  function onSubmit(values: FormValues) {
    setIsImporting(true)
    console.log(values)
    // Simulate import process
    setTimeout(() => {
      setIsImporting(false)
      if (values.importSource === "manual") {
        router.push("/onboarding/menu/manual")
      } else {
        router.push("/onboarding/success")
      }
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
              defaultValue="url" 
              className="w-full"
              onValueChange={(value: string) => {
                if (value) {
                  form.setValue("importSource", value as FormValues["importSource"])
                }
              }}
            >
              <AccordionItem value="url">
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
                        <FormLabel>Food Delivery Platform URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://food-platform.com/your-restaurant" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the URL of your restaurant page from GrabFood, Foodpanda, or Deliveroo
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sheet">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Import from Google Sheet</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <FormField
                    control={form.control}
                    name="sheetUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Sheet URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://docs.google.com/spreadsheets/d/..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Share your Google Sheet with edit access and paste the URL here
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pdf">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Import from PDF Menu</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <FormField
                    control={form.control}
                    name="pdfFile"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Upload PDF Menu</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const file = e.target.files?.[0]
                              onChange(file)
                            }}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Upload your existing menu in PDF format
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="manual">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <PenLine className="h-4 w-4" />
                    <span>Skip, I will key in manually</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    You will be redirected to a form where you can manually enter your menu items and categories.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex gap-4 pt-2">
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
                    {form.getValues("importSource") === "manual" ? "Proceeding..." : "Importing Menu..."}
                  </>
                ) : (
                  form.getValues("importSource") === "manual" ? "Continue to Manual Entry" : "Import Menu"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 