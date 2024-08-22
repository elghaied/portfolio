import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '../../fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import {  revalidatePortfolio } from './hooks/revalidatePortfolio'
import { Label } from '@/components/ui/label';

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
export const Portfolios: CollectionConfig = {
  slug: 'portfolios',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          path: `/${typeof data?.slug === 'string' ? data.slug : ''}`,
        })
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (doc) =>
      generatePreviewPath({ path: `/${typeof doc?.slug === 'string' ? doc.slug : ''}` }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label : 'Content',
          fields: [
            {
              name: 'banner',
              type: 'group',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',

                },
                {
                  name: 'bannerTitle',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'bannerDescription',
                  type: 'text',
                  required: true,
                }
              ],
            },
            {
              name: 'bio',
              type: 'group',
              fields: [
                {
                  name: 'devName',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'aboutMe',
                  type: 'text',
                  required: true,
                },
                {
                  name : 'pfp',
                  type: 'upload',
                  relationTo: 'media',
                },

              ],
            },
            {
              name: 'skills',
              type: 'relationship',
              relationTo: 'technologies',
              hasMany: true,
            },

          ]
        },

        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePortfolio],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
