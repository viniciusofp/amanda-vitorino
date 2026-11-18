import config from "@/payload.config";
import { getPayload } from "payload";

import { CustomRichText } from "@/components/CustomRichText";
import HomeMarquee from "@/components/HomeMarquee";
import Sidebar from "@/components/Sidebar";
import StackingCards from "@/components/StackingCards";
import { Media } from "@/payload-types";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";

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

  const { page, preview } = await searchParams;
  // const { docs, totalPages, nextPage, prevPage } = await payload.find({
  //   collection: "posts",
  //   limit: 100,
  //   where: {
  //     or: [
  //       {
  //         _status: { equals: user && Boolean(preview) ? "draft" : "published" },
  //       },
  //       {
  //         _status: {
  //           equals: user && Boolean(preview) ? "published" : "published",
  //         },
  //       },
  //     ],
  //   },
  //   pagination: false,
  //   depth: 2,
  //   draft: user && Boolean(preview) ? true : false,
  // });
  // const { docs: categories } = await payload.find({
  //   collection: "categories",
  //   limit: 100,
  // });

  const info = await payload.findGlobal({ slug: "blogInfo" });
  const home = await payload.findGlobal({ slug: "home" });

  return (
    <>
      <div className="grid md:flex">
        <Sidebar info={info} />
        <main className="w-full">
          <section className="bg-creme min-h-min w-full p-8 pb-24 md:h-[calc(100svh-3rem)]">
            <h2 className="text-petroleo mb-8 font-serif text-[clamp(2.5rem,4svw,4rem)] leading-[1.1] tracking-tight text-balance lg:max-w-5/6">
              {home.hero?.headline}
            </h2>
            <div className="prose-lg lg:prose-xl mb-16 leading-relaxed! text-pretty opacity-80 lg:max-w-5/6">
              <CustomRichText data={home.hero?.lead as any}></CustomRichText>
            </div>

            <Link href="/about" className="group relative block w-fit">
              <div className="pointer-events-none absolute top-0 left-0 z-1 h-full w-0 py-6 duration-300 ease-[cubic-bezier(.06,.71,.28,.99)] group-hover:w-full">
                <div className="h-full w-full rounded-xs bg-white shadow-sm [clip-path:polygon(0_0,97%_0,100%_50%,97%_100%,0_100%)]"></div>
              </div>
              <div className="relative z-2 flex w-fit items-center gap-8">
                <div className="border-creme-200 bg-creme relative w-36 shrink-0 overflow-hidden rounded-xs border p-1.5 lg:w-40">
                  <div className="bg-creme absolute top-0 left-0 z-2 h-full w-full mix-blend-color duration-150 group-hover:opacity-0"></div>
                  <ViewTransition name={"foto1"}>
                    <img
                      src={"/amanda.jpg"}
                      alt={
                        "Amanda Vitorino - Advogada - Consultoria Jurídica e Estratégica em Políticas Públicas"
                      }
                      className="w-full saturate-0 duration-150 group-hover:saturate-100"
                    />
                  </ViewTransition>
                </div>
                <div className="grid w-fit gap-3 text-sm leading-normal">
                  <p className="text-creme-800 max-w-prose text-pretty">
                    {home.about?.shortBio}
                  </p>
                  {home.about?.cta ? (
                    <p className="text-marrom font-bold group-hover:underline">
                      {home.about?.cta}
                      <ArrowRight className="-mt-1 ml-1.5 inline-block size-4 duration-150 ease-in-out group-hover:size-5 group-hover:translate-x-0.5" />
                    </p>
                  ) : null}
                </div>
              </div>
            </Link>
          </section>
          <HomeMarquee marquee={home.marquee as []} />
          {/* <section className="bg-petroleo text-creme w-full px-8 py-24">
            <h2 className="mx-auto font-serif text-[clamp(1.75rem,4svw,4rem)] leading-none tracking-tight text-balance lg:max-w-5/6">
              Minha missão é fortalecer a capacidade institucional de governos e
              organizações por meio de soluções jurídicas estratégicas e de
              gestão pública.
            </h2>
          </section> */}
          <StackingCards stackingCards={home.stackingCards} />
          <section className="bg-creme w-full p-8 py-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-rosa border-rosa-300 h-2 w-2 rounded-full border"></div>
              <h2 className="text-sm leading-none font-medium tracking-widest uppercase">
                Público-alvo
              </h2>
            </div>

            <p className="max-w-prose text-2xl leading-normal text-pretty lg:w-5/6 lg:text-3xl">
              Soluções para governança pública começam com a compreensão dos
              desafios e das oportunidades de cada instituição.
            </p>
            <div className="divide-petroleo/10 mt-8 grid divide-y">
              <div className="py-8">
                <h3 className="mb-2 text-lg leading-[1.2] font-bold text-balance">
                  Prefeituras e Secretarias Municipais
                </h3>
                <p className="max-w-prose text-pretty">
                  Soluções jurídicas e estratégicas para formular, implementar e
                  aprimorar políticas públicas, com foco em capacidade
                  institucional.
                </p>
              </div>
              <div className="py-8">
                <h3 className="mb-2 text-lg leading-[1.2] font-bold text-balance">
                  Câmaras Municipais e Mandatos
                </h3>
                <p className="max-w-prose text-pretty">
                  Apoio técnico para construir soluções legislativas alinhadas
                  às demandas sociais e aos princípios da boa governança.
                </p>
              </div>
              <div className="py-8">
                <h3 className="mb-2 text-lg leading-[1.2] font-bold text-balance">
                  Cultura e Fomento Público
                </h3>
                <p className="max-w-prose text-pretty">
                  Estruturação de programas e instrumentos de fomento para
                  promover segurança jurídica, eficiência e boa execução de
                  recursos públicos.
                </p>
              </div>
            </div>
          </section>
          <section className="flex min-h-svh items-center justify-center bg-white p-8">
            <div id="contact" className="">
              <h1 className="text-petroleo mb-4 text-center font-serif text-[clamp(2.5rem,4svw,4rem)] leading-[1.1] tracking-tight">
                Vamos conversar?
              </h1>

              <div className="prose-lg lg:prose-xl mx-auto mb-16 text-center leading-relaxed! text-pretty opacity-80 lg:max-w-5/6">
                <p>
                  Se sua prefeitura, órgão público ou mandato busca apoio para
                  estruturar políticas públicas, qualificar processos
                  legislativos ou desenvolver soluções institucionais com
                  segurança jurídica, vamos conversar.
                </p>
              </div>
              <div className="grid items-center justify-center gap-3 text-center text-2xl lg:text-3xl">
                <p>11 976970327</p>
                <p>contato@vitorinomeloadvg.com.br</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
