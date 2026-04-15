import { Metadata } from 'next';
import FullVsPartialClient from './FullVsPartialClient';

export const metadata: Metadata = {
  title: "Full vs. Partial Pool Removal Arizona | Pros, Cons & Cost Comparison",
  description: "Should you choose a full or partial pool removal (abandonment) for your Arizona home? Compare property value impact, costs, and city permit requirements.",
  openGraph: {
    title: "Full vs. Partial Pool Removal: The Arizona Property Value Guide",
    description: "Honest comparison of full vs. partial pool removal for Arizona homeowners. Don't ruin your property value with the wrong choice.",
    url: "https://mesapoolremoval.com/full-vs-partial-pool-removal-arizona",
    type: "article",
  },
};

export default function FullVsPartialPage() {
  return <FullVsPartialClient />;
}
