import { Field } from "payload";

export const imageField: Field = {
  name: "image",
  label: "Imagem",
  type: "upload",
  relationTo: "media",
};
