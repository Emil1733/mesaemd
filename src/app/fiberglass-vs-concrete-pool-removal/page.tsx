import { Metadata } from 'next';
import FiberglassVsConcreteClient from './FiberglassVsConcreteClient';

export const metadata: Metadata = {
  title: "Fiberglass vs. Concrete Pool Removal Mesa AZ | Cost & Method Comparison",
  description: "Should you remove a fiberglass or concrete pool? Compare costs, demolition methods, and backyard restoration timelines for Mesa, AZ homeowners.",
  openGraph: {
    title: "Fiberglass vs. Concrete Pool Removal: Which is Faster & Cheaper in Mesa?",
    description: "Honest comparison of removal costs and methods for fiberglass vs. concrete pools in Arizona's desert soil.",
    url: "https://mesapoolremoval.com/fiberglass-vs-concrete-pool-removal",
    type: "article",
  },
};

export default function FiberglassVsConcretePage() {
  return <FiberglassVsConcreteClient />;
}
