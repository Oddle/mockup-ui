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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"

// Sample data for random generation
const sampleFirstNames = [
  "Alex", "Jamie", "Jordan", "Taylor", "Morgan", "Casey", "Sam", "Drew", 
  "Riley", "Avery", "Charlie", "Frankie", "Quinn", "Parker", "Blake",
  "Sarah", "Michael", "David", "Emma", "Olivia", "James", "William",
  "Sophia", "Isabella", "Daniel", "Joseph", "Emily", "Madison"
]

const sampleDomains = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com",
  "company.com", "business.net", "example.org"
]

const generateRandomTeamMember = () => {
  const firstName = sampleFirstNames[Math.floor(Math.random() * sampleFirstNames.length)]
  const domain = sampleDomains[Math.floor(Math.random() * sampleDomains.length)]
  const email = `${firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}@${domain}`
  const phoneNumber = `+65${Math.floor(Math.random() * 90000000 + 10000000)}`

  return {
    firstName,
    email,
    phoneNumber
  }
}

const teamMemberSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(8, "Phone number is required"),
})

const formSchema = z.object({
  teamMembers: z.array(teamMemberSchema).min(1, "At least one team member is required"),
})

type TeamMember = {
  firstName: string
  email: string
  phoneNumber: string
}

export default function ContactPage() {
  const router = useRouter()
  const initialMember = generateRandomTeamMember()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([initialMember])
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamMembers: teamMembers
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    router.push("/onboarding/store")
  }

  const addTeamMember = () => {
    const newMember = generateRandomTeamMember()
    setTeamMembers([...teamMembers, newMember])
    form.setValue("teamMembers", [...teamMembers, newMember])
  }

  const removeTeamMember = (index: number) => {
    const newTeamMembers = teamMembers.filter((_, i) => i !== index)
    setTeamMembers(newTeamMembers)
    form.setValue("teamMembers", newTeamMembers)
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Invite Your Team</h2>
          <p className="text-muted-foreground mt-2">
            Add team members who will help manage your online store
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              {teamMembers.map((_, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium">Team Member {index + 1}</h3>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTeamMember(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`teamMembers.${index}.firstName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`teamMembers.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`teamMembers.${index}.phoneNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={addTeamMember}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
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
                Continue to Store Details
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 