import { getRequestContext } from '@cloudflare/next-on-pages'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  const messages = [
    {role:"system",content:"you are a helpful assistant"},
    {role:"user",content:"Hello, how are you?"}
]
  const res = await getRequestContext().env.AI.run("@hf/thebloke/deepseek-coder-6.7b-base-awq",{messages})



  // In the edge runtime you can use Bindings that are available in your application
  // (for more details see:
  //    - https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#use-bindings-in-your-nextjs-application
  //    - https://developers.cloudflare.com/pages/functions/bindings/
  // )
  //
  // KV Example:
  // const myKv = getRequestContext().env.MY_KV_NAMESPACE
  // await myKv.put('suffix', ' from a KV store!')
  // const suffix = await myKv.get('suffix')
  // return new Response(responseText + suffix)

  return Response.json(res)
}
