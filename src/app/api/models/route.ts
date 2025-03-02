import { NextResponse } from 'next/server';
import { CFclient } from '@/lib/cf';

export const runtime = 'edge';

export async function GET() {
  try {
    const models = await CFclient.ai.models.list({
      account_id: process.env.CLOUDFLARE_ACCOUNT_ID as string,
    });
    const imageModels = models.result.filter((model: any) => model.task.name === 'Text-to-Image');

    return NextResponse.json(imageModels);
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
  }
}
