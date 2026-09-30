import { roasts } from "@/data";
import RoastProductClient from "./client-page";

export function generateStaticParams() {
  return roasts.map((roast) => ({ slug: roast.id }));
}

export default function RoastProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <RoastProductClient slugPromise={params} />;
}