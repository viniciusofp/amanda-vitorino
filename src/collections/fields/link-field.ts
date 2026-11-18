import { Field } from "payload";
import urlField from "./url-field";

export const linkField: Field = {
  name: "link",
  type: "group",
  fields: [
    {
      name: "linkType",
      label: "Tipo de link",
      type: "select",
      options: [
        { value: "external", label: "Link Externo" },
        { value: "internal", label: "Link Interno" },
      ],
      defaultValue: "external",
    },
    {
      ...urlField,
      admin: {
        condition: (data, siblingData, { blockData, path, user }) => {
          if (siblingData.linkType === "external") {
            return true;
          }
          return false;
        },
      },
      required: true,
    } as Field,
    {
      name: "internalContent",
      label: "Conteúdo Interno",
      type: "relationship",
      relationTo: ["posts"],
      admin: {
        condition: (data, siblingData, { blockData, path, user }) => {
          if (siblingData.linkType === "internal") {
            return true;
          }
          return false;
        },
      },
      required: true,
    },
    {
      name: "targetBlank",
      type: "checkbox",
      label: "Abrir em uma nova guia",
      defaultValue: true,
    },
  ],
};
