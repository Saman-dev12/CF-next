"use client"
import Head from "@/components/Head";
import {Model} from "@/components/Model";
import { useState } from "react";
import GenImage from "./generatedImage";

export const runtime = "edge";


export default function Main() {
  const [image,setImage] = useState<string>('');
  const [loading,setLoading] = useState<boolean>(false);

  function generatedImage(data:string){
    setImage(data);
  }

  function setLoadingState(state:boolean){
    setLoading(state);
  }
  
  return (
    <>
      <Head />
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 h-screen p-4">
        <div className="flex w-full md:w-1/2 mb-4 md:mb-0">
          <Model generatedImage={generatedImage} setLoadingState={setLoadingState}/>
        </div>
        <div className="flex w-full md:w-1/2">
          <GenImage image={image} loading={loading}/>
        </div>
      </div>
    </>
  );
}
