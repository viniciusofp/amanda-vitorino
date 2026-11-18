import { trimRichTextContent } from "@/lib/utils";
import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { Field } from "payload";
import urlField from "../fields/url-field";
import { imageField } from "../fields/image-field";
import { buttonsField } from "../fields/buttons-field";

const richTextExtension: Partial<Field> = {
  editor: lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      FixedToolbarFeature({
        applyToFocusedEditor: false, // Apply to focused editor
        customGroups: {
          format: {
            // Custom configuration for format group
          },
        },
      }),
      BlocksFeature({
        blocks: [
          {
            slug: "videoEmbed",
            fields: [urlField, imageField],
          },
          {
            slug: "code",
            fields: [{ name: "code", type: "code", label: "Código" }],
          },
          {
            slug: "buttons",
            labels: { singular: "Botões", plural: "Botões" },
            fields: [{ ...buttonsField }],
          },
        ],
      }),
    ],
  }),
  hooks: {
    beforeValidate: [
      ({ value }) => {
        return value ? trimRichTextContent(value) : undefined;
      },
    ],
  },
};

export default richTextExtension;
