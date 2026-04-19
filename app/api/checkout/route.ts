import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: 'Missing STRIPE_SECRET_KEY in .env.local' },
        { status: 500 }
      );
    }

    const { priceId } = await request.json();
    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${request.headers.get('origin')}/subscribe/success`,
      cancel_url: `${request.headers.get('origin')}/subscribe/cancel`,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe session created without checkout URL' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create checkout session';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
