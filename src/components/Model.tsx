"use client"
import type React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "./ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const FormSchema = z.object({
  prompt: z.string().min(1),
  model: z.string().min(1),
})

interface ModelProps {
  generatedImage: (data: string) => void
  setLoadingState: (state: boolean) => void
}

export const runtime = "edge"

export const Model: React.FC<ModelProps> = ({ generatedImage, setLoadingState }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
      model: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoadingState(true)
    try {
      const response: Response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const blob: any = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      console.log(imageUrl)

      await generatedImage(imageUrl)

      toast.success("Image generated successfully")
    } catch (error) {
      toast.error("Failed to generate image")
      console.error(error)
    } finally {
      setLoadingState(false)
    }
  }

  return (
    <div className="w-full min-h-[50vh] flex flex-col justify-start items-center py-6 px-4 sm:px-6 md:px-10 lg:px-16">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6">Select model</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto space-y-4 sm:space-y-6"
        >
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="w-full">
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full h-11 sm:h-12">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"@cf/black-forest-labs/flux-1-schnell"}>
                      {"@cf/black-forest-labs/flux-1-schnell"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input {...field} type="text" placeholder="Enter your prompt" className="w-full h-11 sm:h-12 p-3" />
              </FormItem>
            )}
          />

          <div className="flex justify-center sm:justify-end w-full pt-2">
            <Button type="submit" className="w-full sm:w-auto px-6 py-2 h-11 sm:h-12 text-base" size="lg">
              Generate
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

