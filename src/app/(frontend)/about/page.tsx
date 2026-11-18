import config from "@/payload.config";
import { getPayload } from "payload";

import { CustomRichText } from "@/components/CustomRichText";
import { Media } from "@/payload-types";
import { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";

export type BlogPageProps = {
  searchParams: Promise<{ page: string; preview: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const blogInfo = await payload.findGlobal({ slug: "blogInfo" });

  return {
    title: `${blogInfo.name} - ${blogInfo.description}`,
    description: `${blogInfo.description}`,
  };
}
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const home = await payload.findGlobal({ slug: "blogInfo" });

  return (
    <section className="flex min-h-[calc(100svh-160px)] items-center justify-center p-4 lg:p-6 xl:p-8 2xl:p-10">
      <div className="grid items-center gap-8 md:flex">
        <div className="w-sm max-w-full min-w-xs">
          <Link href="/">
            <ViewTransition name={"foto1"}>
              <img
                src={"/amanda.jpg"}
                alt={
                  "Amanda Vitorino - Advogada - Consultoria Jurídica e Estratégica em Políticas Públicas"
                }
                className="w-full rounded-xs"
              />
            </ViewTransition>
          </Link>
        </div>
        <CustomRichText data={home.about} className="prose text-pretty" />
      </div>
    </section>
  );
}
