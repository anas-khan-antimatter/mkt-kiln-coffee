import { brewGuides } from "@/data";
import BrewGuideDetail from "./client-page";

export function generateStaticParams() {
  return brewGuides.map((guide) => ({ slug: guide.id }));
}

export default function BrewGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <BrewGuideDetail slugPromise={params} />;
}