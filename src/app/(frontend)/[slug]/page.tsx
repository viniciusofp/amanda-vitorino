import { getPayload } from "payload";

import ExpandableContent from "@/components/ExpandableContent";
import PreviewAlert from "@/components/PreviewAlert";
import { RefreshRouteOnSave } from "@/components/RefreshRouteOnSave";
import { Category, Post } from "@/payload-types";
import config from "@/payload.config";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import { Metadata, ResolvingMetadata } from "next";
import { headers as getHeaders } from "next/headers";
import Link from "next/link";

export type BlogPostProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview: string }>;
};

export async function generateMetadata(
  { params, searchParams }: BlogPostProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const { preview } = await searchParams;
  const blogInfo = await payload.findGlobal({ slug: "blogInfo" });
  const slug = (await params).slug;

  // fetch post information
  const { docs: posts } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
  });
  const post: Post = posts[0];
  if (post) {
    const createdAt = new Date(post.createdAt);
    const plaintext = convertLexicalToPlaintext({
      data: post.content as SerializedEditorState,
    }).replaceAll("&nbsp;", " ");

    return {
      title: `${preview ? "PREVIEW: " : ""}${
        post.title
          ? `${post.title} - ${blogInfo.name} - ${blogInfo.description}`
          : `${createdAt.toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })} - ${createdAt.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })} - ${blogInfo.name} - ${blogInfo.description}`
      }`,
      description:
        plaintext.length > 160 ? `${plaintext.slice(0, 154)} (...)` : plaintext,
    };
  }
  return {};
}
export default async function BlogPost({
  params,
  searchParams,
}: BlogPostProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { slug } = await params;

  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });
  const { preview } = await searchParams;

  const { docs } = await payload.find({
    collection: "posts",
    where: {
      slug: { equals: slug },
      _status: { equals: user && Boolean(preview) ? "draft" : "published" },
    },
    depth: 1,
    draft: user && Boolean(preview) ? true : false,
  });
  const post = docs[0];

  if (!post)
    return (
      <div className="my-8">
        <p>
          Publicação não encontrada.
          <br />
          <Link href="/" className="font-medium hover:underline">
            Voltar pra casa.
          </Link>
        </p>
      </div>
    );

  const createdAt = new Date(post.createdAt);
  const updatedAt = new Date(post.updatedAt);
  return (
    <div className="">
      <RefreshRouteOnSave />
      {preview ? <PreviewAlert /> : null}

      <div className="mx-auto w-full max-w-3xl px-4">
        <h1 className="my-4 mb-6 font-serif text-3xl text-balance sm:text-4xl md:my-8 md:text-5xl">
          {post.title}
        </h1>
        {post.metadata ? (
          <div className="meta flex flex-col flex-wrap gap-y-3 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:gap-x-12">
            {post.metadata.type ? (
              <div className="">
                <p className="mb-px font-mono text-[10px] tracking-wider text-stone-400 uppercase">
                  Category
                </p>
                <p className="font-mono text-xs tracking-wider uppercase">
                  {(post.metadata?.type as Category)?.name}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}

        {post.content ? <ExpandableContent content={post.content} /> : null}
      </div>
      {/* <About /> */}
    </div>
  );
}
