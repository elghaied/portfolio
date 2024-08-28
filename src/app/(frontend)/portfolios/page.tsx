import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import configPromise from '@payload-config'
import { Portfolio, Project, Service } from 'src/payload-types'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import Technologies from 'src/payload/collections/Projects/Technologies'
import { Boxes } from '@/components/ui/background-boxes'
import { cn } from '@/utilities/cn'
import ProjectCard from '@/components/ProjectCard'
import { HeroParallax } from '@/components/ui/hero-parallax'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/DynamicIcon'
import ServicesSection from '@/components/ServicesSection '
import SocialsSection from '@/components/SocialsSection'
import { Blocks } from '@/components/Blocks'

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

  let projects: Project[] | null

  const projectsResult = await payload.find({
    collection: 'projects',
    draft,
    limit: 6,
    overrideAccess: true,
  })

  projects = projectsResult.docs

  let services: Service[] | null
  const servicesResult = await payload.find({
    collection: 'services',
    draft,
    limit: 6,
    overrideAccess: true,
  })

  services = servicesResult.docs

  if (!portoflio) {
    return <PayloadRedirects url={url} />
  }

  const { banner, bio, skills,layout } = portoflio.content

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }
  return (
    <div className="">
      <div className="">
        <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

          <Boxes />
          <h1 className={cn('md:text-4xl text-xl text-white relative z-20')}>
            {banner.bannerTitle}
          </h1>
          <p className="text-center mt-2 text-neutral-300 relative z-20">
            {banner.bannerDescription}
          </p>
        </div>
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={typeof bio.pfp === 'string' ? bio.pfp : bio.pfp?.url}
                      alt={bio.devName}
                    />
                    <AvatarFallback>{getInitials(bio.devName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{bio.devName}</CardTitle>
                    <p className="text-sm text-muted-foreground">Software Developer</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{bio.aboutMe}</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Icon
                        name={typeof skill === 'string' ? skill : skill.name}
                        className="w-3 h-3"
                      />
                      <span className="text-xs">
                        {typeof skill === 'string' ? skill : skill.name}
                      </span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold mb-6">My Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </div>

        <div className="container mx-auto py-8">
          <ServicesSection services={services} />{' '}
        </div>
        <div>
        <Blocks blocks={layout} />
        </div>
        <div className="container mx-auto py-8">
        <SocialsSection />
        </div>
      </div>
    </div>
  )
}
