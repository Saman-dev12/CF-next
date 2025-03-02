"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const FormSchema = z.object({
    prompt: z.string().min(1),
    model: z.string().min(1),
});
interface ModelProps {
  generatedImage: (data: string) => void;
  setLoadingState: (state:boolean) => void;
}

export const runtime = "edge";

export const Model: React.FC<ModelProps> = ({ generatedImage,setLoadingState }) => {

    // const [options, setOptions] = useState<string[]>([]);
  
    // useEffect(() => {
    //   const getModels = async () => {
    //     try {
    //       const response = await fetch("/api/models");
    //       const data:any = await response.json();
    //       setOptions(data.map((model: any) => model.name));
    //     } catch (error) {
    //       toast.error("Failed to fetch models");
    //       console.error(error);
    //     }
    //   };
    //   getModels();
    // }, []);
  
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        prompt: '',
        model: ''
      }
    });
  
    async function onSubmit(data: z.infer<typeof FormSchema>) {
      setLoadingState(true);
      try {
        
      const response: Response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const blob:any = await response.blob();
      // console.log(blob)
      const imageUrl = URL.createObjectURL(blob);
      console.log(imageUrl)

      await generatedImage(imageUrl);
      
      toast.success("Image generated successfully");
      } catch (error) {
        toast.error("Failed to generate image");
        console.error(error);
      }finally {
        setLoadingState(false);
      }
      
    }
  
    return (
      <div className='w-full h-screen flex flex-col pt-10'>
        <h1 className='text-2xl font-bold text-center'>Select model</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex justify-center flex-col gap-3 p-4'>
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* {options.map((option, index) => (
                          <SelectItem key={index} value={option}>{option}</SelectItem>
                        ))} */}
                        
                          <SelectItem  value={"@cf/black-forest-labs/flux-1-schnell"}>{"@cf/black-forest-labs/flux-1-schnell"}</SelectItem>
                    
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter your prompt'
                      className='p-2 border rounded mb-4'
                    />
                  </FormItem>
                )}
              />
              <Button type="submit">Generate</Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }