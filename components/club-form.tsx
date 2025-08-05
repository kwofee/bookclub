"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

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
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import { User } from "@supabase/supabase-js"
import { useState } from "react"

const FormSchema = z.object({
  club_id: z.string().min(1, {
    message: "Club ID must be at least 2 characters.",
  }),
})

interface InputFormProps {
  user: User | null;
}

export function InputForm({user}: InputFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createSupabaseBrowserClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      club_id: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if(!user){
      toast("Not logged in");
    }else{

      setIsSubmitting(true);
      console.log("Before try");
      try{

        const {data: insertedData, error} = await supabase
        .from('requests')
        .insert({
          club_id_request: parseInt(data.club_id), 
          processed: false,
          request_user_id: user.id,
        })
        .select();
        console.log("After insertion");
        if(!insertedData){
          toast("Requested Club ID does not exist");
        }
        if(error){
          console.log("Error inserting ", error);
        }else{
          toast("Request submitted succesfully")
        }
      }catch(err){
        console.log("Unexpected error ", err);
      }finally{
        setIsSubmitting(false);
      }
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="club_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Club ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter valid Club ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting || !user}>
          {isSubmitting ? "Creating..." : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
