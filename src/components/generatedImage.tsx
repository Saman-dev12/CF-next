"use client"
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Download } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

function GenImage({ image, loading }: { image: string, loading: boolean }) {

  const handleDownload = () => {
    try {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = image;
      
      // Extract file type from the data URL
      const fileExtension = image.split(';')[0].split('/')[1];
      
      // Set download attribute with filename
      link.download = `generated-image-${Date.now()}.${fileExtension}`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Image downloaded successfully");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download image");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full aspect-square">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full p-6 space-y-4">
              <Skeleton className="h-48 w-full rounded-md" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ) : image ? (
            <div className="relative group">
              <img 
                src={image} 
                alt="Generated image" 
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-2 right-2 opacity-80 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleDownload}
                  className="bg-background/80 backdrop-blur-sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
              <p className="text-center px-4">No image generated yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default GenImage
