import { LUCIDE_ICONS } from "@/lib/lucide-icons";
import { Field } from "payload";
import { linkField } from "./link-field";

export const buttonsField: Field = {
  name: "buttons",
  label: "Botão",
  labels: { singular: "Botão", plural: "Botões" },
  type: "array",
  fields: [
    { name: "label", label: "Texto", type: "text", localized: true },
    {
      name: "iconSlug",
      label: "Ícone",
      type: "select",
      options: LUCIDE_ICONS as any,
      admin: {
        description: "Adicone um ícone https://lucide.dev/icons/",
      },
    },
    {
      name: "iconPosition",
      label: "Posição do Ícone",
      type: "radio",
      options: [
        { label: "À Direita", value: "right" },
        { label: "À Esquerda", value: "left" },
      ],
      defaultValue: "left",
    },
    {
      name: "variant",
      label: "Variante",
      type: "select",
      options: [
        { value: "default", label: "Padrão" },
        { value: "secondary", label: "Secundário" },
        { value: "outline", label: "Contorno" },
        { value: "ghost", label: "Fantasma" },
        { value: "link", label: "Link" },
      ],
      defaultValue: "default",
    },
    linkField,
  ],
};
