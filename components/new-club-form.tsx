"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as RHF from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { da } from "zod/v4/locales"

const FormSchema = z.object({
  club_name: z.string().min(4, {
    message: "Club name must be at least 4 characters.",
  }),
  club_description: z.string().min(0),
})

interface InputFormProps {
  user: User | null;
}

export function InputForm({ user }: InputFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createSupabaseBrowserClient()
  const form = RHF.useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      club_name: "",
      club_description: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user) {
      toast.error("You must be logged in to create a club")
      return
    }

    setIsSubmitting(true)
    
    console.log("Info: ", user.id, data.club_name, data.club_description);
    
    try {
      const { data: insertedData, error } = await supabase
        .from('clubs')
        .insert({
          creator_id: user.id, 
          name: data.club_name, 
          description: data.club_description
        })
        .select()

      if (error) {
        console.error("Error from insertion:", error)
        toast.error(`Failed to create club: ${error.message}`)
      } else {
        toast.success("Club created successfully!", {
          description: `Created "${data.club_name}" club`
        })
        
        // Reset form after successful submission
        form.reset()
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      toast.error("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="club_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Club Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter valid Club name" 
                  {...field} 
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="club_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Club Description</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter a club description" 
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting || !user}>
          {isSubmitting ? "Creating..." : "Submit"}
        </Button>
        {!user && (
          <p className="text-sm text-red-500">
            You must be logged in to create a club
          </p>
        )}
      </form>
    </Form>
  )
}