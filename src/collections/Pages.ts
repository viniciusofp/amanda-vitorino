
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import { CollectionConfig, Field } from 'payload';
import slugify from 'slugify';


export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  trash: true,
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
      name: 'content',
      label: 'Conteúdo',
      labels: { singular: 'Bloco', plural: 'Bloco' },
      type: 'blocks',
      blocks: [
      ]
    }
  ]
};
