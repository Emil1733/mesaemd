import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Request a Mesa Pool Removal Estimate | Fast Quotes",
  description: "Get a real-time pool removal quote in Mesa, AZ. We handle Maricopa County permits and specialized caliche excavation. Lock your estimate today.",
};

export default function ContactPage() {
  return <ContactClient />;
}
