import { trimRichTextContent } from "@/lib/utils";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import type { CollectionConfig, Field } from "payload";
import slugify from "slugify";
import urlField from "./fields/url-field";

export const Posts: CollectionConfig = {
  slug: "posts",
  defaultPopulate: { slug: true },
  trash: true,
  orderable: true,
  admin: {
    useAsTitle: "title",
    components: {
      edit: {
        beforeDocumentControls: [
          "@/components/payload/ui/BeforeControls#VisitContent",
        ],
      },
    },
    livePreview: {
      url: ({ data, collectionConfig, req }) =>
        `${req.protocol}//${req.host}/${data.slug}?preview=true`,
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1000,
      },
    },
    maxPerDoc: 10,
  },

  fields: [
    {
      name: "title",
      label: "Título",
      type: "text",
      required: true,
    },

    {
      name: "slug",
      type: "text",
      admin: { position: "sidebar", style: { opacity: 0.5 } },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (value) {
              return value;
            }
            if (siblingData.title) {
              return slugify(siblingData.title, {
                lower: true,
                strict: true,
                locale: "pt-BR",
              });
            }
            if (siblingData.content) {
              const plaintext = convertLexicalToPlaintext({
                data: siblingData.content,
              });
              return slugify(plaintext.slice(0, 80), {
                lower: true,
                strict: true,
                locale: "pt-BR",
              });
            }
            return undefined;
          },
        ],
      },
      required: true,
      unique: true,
    },
    {
      name: "content",
      label: "Conteúdo",
      type: "richText",
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
        ],
      }),
      hooks: {
        beforeValidate: [
          ({ value }) => {
            return value ? trimRichTextContent(value) : undefined;
          },
        ],
      },
    },
    {
      name: "metadata",
      label: "Informações",
      type: "group",
      fields: [
    
            {
              name: "type",
              label: "Categoria",
              type: "relationship",
              relationTo: "categories",
              admin: {
                description: "Ex.: curta-metragem, longa-metragem, etc...",
              },
              required: true,
            },
      ],
    },
  ],
};
