import { revalidateGlobal } from "@/lib/revalidatePage";
import type { Field, GlobalConfig } from "payload";
import richTextExtension from "./hooks/RichTextExtension";
import { LUCIDE_ICONS } from "@/lib/lucide-icons";

export const HomePage: GlobalConfig = {
  slug: "home",
  label: "Página Inicial",
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: "hero",
      label: "Abertura",
      type: "group",
      fields: [
        { name: "headline", label: "Título", type: "text" },
        {
          name: "lead",
          label: "Subtítulo",
          type: "richText",
          ...richTextExtension,
        } as Field,
      ],
    },
    {
      name: "about",
      label: "Sobre",
      type: "group",
      fields: [
        {
          name: "img",
          label: "Imagem da Bio",
          type: "upload",
          relationTo: "media",
        },
        { name: "shortBio", label: "Resumo", type: "textarea" },
        { name: "cta", label: "Chamada", type: "text" },
        {
          name: "bio",
          label: "Bio",
          type: "richText",
          ...richTextExtension,
        } as Field,
      ],
    },
    {
      name: "marquee",
      label: "Barra horizontal com rolagem",
      type: "array",
      labels: { singular: "Item", plural: "Itens" },
      fields: [{ name: "item", label: "Item", type: "text" }],
    },
    {
      name: "stackingCards",
      label: "Seção Cartões",
      type: "group",
      fields: [
        {
          name: "headline",
          label: "Título",
          type: "text",
        },
        {
          name: "lead",
          label: "Subtítulo",
          type: "richText",
          ...richTextExtension,
        } as Field,
        {
          name: "cards",
          labels: { singular: "Cartão", plural: "Cartões" },
          type: "array",
          fields: [
            {
              name: "iconSlug",
              label: "Ícone",
              type: "select",
              options: LUCIDE_ICONS as any,
              admin: {
                description: "Adicone um ícone https://lucide.dev/icons/",
              },
            },
            { name: "title", label: "Título", type: "text" },
            {
              name: "text",
              label: "Texto",
              type: "richText",
              ...richTextExtension,
            } as Field,
          ],
        },
      ],
    },
  ],
};
