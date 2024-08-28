import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name : 'description',
      type : 'text',
      required : true

    },
    {
      name : 'tags',
      type : 'relationship',
      relationTo : 'technologies',
      hasMany : true
    },
    {
      name : 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Frontend',
          value: 'frontend'
        },
        {
          label: 'Backend',
          value: 'backend'
        },
        {
          label: 'Database',
          value: 'database'
        },
        {
          label: "Devops",
          value: 'devops'
        },
        {
          label: 'Full Stack',
          value: 'full stack'
        },
        {
          label: 'Performance',
          value: 'performance'
        }
      ]
    }

  ],
}

export default Services
