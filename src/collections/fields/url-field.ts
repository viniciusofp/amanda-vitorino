import { Field } from "payload";

const urlField: Field = {
  name: "url",
  label: "Site / Link",
  type: "text",
  validate: (value: any) => {
    const errorMsg = "Digite um URL válido.";

    if (!value) return true;

    // Accept anchors
    if (/^#[\w-]+$/.test(value)) return true;

    // Validate URLs
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:" || errorMsg;
    } catch (_) {
      return errorMsg;
    }
  },
};

export default urlField;
