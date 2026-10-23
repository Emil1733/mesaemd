import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Request a Mesa Pool Removal Estimate",
  description: "Request a Mesa pool removal estimate based on pool type, size, access, demolition method, and site conditions.",
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
