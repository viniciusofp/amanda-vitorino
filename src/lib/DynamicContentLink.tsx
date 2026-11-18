"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type DynamicContentLinkProps = {
  slug: string;
  collection: string;
  children: React.ReactNode | undefined;
  href?: string;
  className?: string;
  onClick?: any;
  target?: any;
};

export const collectionMap: any = {
  posts: "post",
};

export function DynamicContentLink(props: DynamicContentLinkProps) {
  const { slug, collection, children, href } = props;
  const { lang } = useParams();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (collectionMap[collection] !== undefined) {
      setUrl(`/${collectionMap[collection]}/${slug}`);
    } else {
      setUrl(`/${collection}/${slug}`);
    }
  }, [lang]);
  return (
    <Link {...props} href={href || url}>
      {children}
    </Link>
  );
}
