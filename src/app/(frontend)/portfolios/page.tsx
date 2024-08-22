import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import configPromise from '@payload-config'
import { Portfolio, Project } from 'src/payload-types'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import Technologies from 'src/payload/collections/Projects/Technologies'
export default async function Page() {
  const url = '/'

  let portoflio: Portfolio | null

  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const portoflioResult = await payload.find({
    collection: 'portfolios',
    draft,
    limit: 1,
    overrideAccess: true,

  })

  portoflio = portoflioResult.docs?.[0]

  let projects: Project | null

  const projectsResult = await payload.find({
    collection: 'projects',
    draft,
    limit: 6,
    overrideAccess: true,
  })

  projects = projectsResult.docs[0]

  if (!portoflio) {
    return <PayloadRedirects url={url} />
  }

  const { banner, bio, skills } = portoflio.content
  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{banner.bannerTitle}</h1>
          <h2>{banner.bannerDescription}</h2>

          <p>{bio.devName}</p>
          <p>{bio.aboutMe}</p>

          {skills && Array.isArray(skills) && skills.length > 0 && (
            <ul>
              {skills.map((skill, i) => {
                if (typeof skill === 'string') {
                  // Skill is a string
                  return <li key={i}>{skill}</li>
                } else if (typeof skill === 'object' && skill.name) {
                  // Skill is a Technology object
                  return <li key={i}>{skill.name}</li>
                }
                return null
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
