"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client"

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
import { Loader2 } from "lucide-react"
import { redirect } from "next/navigation"

const ProfileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})

export default function FirstTimeUser() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: "",
    },
  })
  async function checkFirstTime(){
    const { data: { user } } = await supabase.auth.getUser()
    if(!user){
        redirect("/login")
    }

    const { data: profileData, error: profileError } = await supabase.from("profiles").select("*").eq("user_id", user.id)
    // console.log("Profile data", profileData)
    if(profileData && profileData.length > 0){
        redirect("/home")
    }
  }
  async function onSubmit(data: z.infer<typeof ProfileFormSchema>) {
    setIsSubmitting(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      toast.error("You must be logged in to create a profile.")
      setIsSubmitting(false)
      return
    }

    const { error } = await supabase
      .from('profiles')
      .insert({ 
        name: data.name,
        user_id: user.id
       })

    if (error) {
      toast.error(`Failed to update profile: ${error.message}`)
    } else {
      toast.success("Profile created successfully!")
      router.push('/home')
    }

    setIsSubmitting(false)
  }
  checkFirstTime();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-muted-foreground">Let's set up your profile.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Save and Continue"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}