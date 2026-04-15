import { Metadata } from 'next';
import RedMountainClient from './RedMountainClient';

export const metadata: Metadata = {
  title: "Red Mountain Ranch Pool Removal Mesa AZ | Sloped Access & HOA Specialists",
  description: "Removing a pool in Red Mountain Ranch? We specialize in sloped desert terrain, hard rock caliche, and Red Mountain Ranch Social Club HOA compliance.",
};

export default function RedMountainPage() {
  return <RedMountainClient />;
}
