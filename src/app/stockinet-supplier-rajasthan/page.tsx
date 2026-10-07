import type { Metadata } from "next";
import { LANDING_PAGES } from "@/lib/landing-pages";
import { LandingPageView } from "@/components/pages/LandingPageView";
import { BUSINESS } from "@/lib/constants";

const data = LANDING_PAGES.find((p) => p.slug === "stockinet-supplier-rajasthan")!;

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: `${BUSINESS.siteUrl}/${data.slug}` },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: `${BUSINESS.siteUrl}/${data.slug}`,
    type: "website",
  },
};

export default function StockinetLandingPage() {
  return <LandingPageView data={data} />;
}
