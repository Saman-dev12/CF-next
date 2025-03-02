import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { CFclient } from "@/lib/cf";
export const runtime = "edge";

export async function POST(request: NextRequest) {
    try {
        const data: { prompt: string; model: keyof AiModels } = await request.json();
        const { prompt, model } = data;

        // const response: any = await getRequestContext().env.AI.run(model, {
        //     prompt: prompt
        // });

        
        const response: any = await CFclient.ai.run(model, {
            account_id: process.env.CLOUDFLARE_ACCOUNT_ID as string,
            prompt: prompt,
        });
        
        const binaryString = atob(response.image);
        const img = Uint8Array.from(binaryString, (m) => m!.codePointAt(0)!);

        return new Response(img, {
            headers:{
                "content-type":"image/jpeg"
            }
        })
        // return NextResponse.json(url)
        // const dataURI = `data:image/jpeg;charset=utf-8;base64,${response.image}`;
        // return NextResponse.json({ image: dataURI });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}