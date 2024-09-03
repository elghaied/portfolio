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
import { FlipWords } from '@/components/ui/flip-words'

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

  const { banner, bio, skills, layout } = portoflio.content
  const words = [
    'Coding',
    'Designing',
    'Engineering',
    'Developing',
    'Architecting',
    'Programming',
    'Building',
    'Constructing',
    'Innovating',
    'Technologizing',
    'Integrating',
    'Optimizing',
    'Crafting',
    'Formulating',
    'Refining',
  ]
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }
  return (
    <div className=" ">
      <div className="">
        <div className=" h-80 md:h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

          <Boxes className="pointer-events-none md:pointer-events-auto" />

          <h1
            className={cn(
              'md:text-5xl text-xl text-white relative z-20 pointer-events-none shadow-md	',
            )}
          >
            {banner.bannerTitle} <FlipWords className="text-white" words={words} /> <br />
          </h1>
          <p className="md:text-2xl text-lg text-center mt-2 text-neutral-300 relative z-20 pointer-events-none shadow-md	">
            {banner.bannerDescription}
          </p>
        </div>

        {/* Start of grid */}
        <div className="min-h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className=" relative z-20 bg-clip-text   py-8">
            {/* bio */}
            <div className="container mx-auto py-8  ">
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
                {/* Skills */}
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
            {/* Projects */}
            <div className="container mx-auto py-8">
              <h2 className="text-3xl font-bold mb-6 text-center">My Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%] mx-auto">
                {projects.map((project, i) => (
                  <ProjectCard key={i} project={project} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 min-h-screen">
          <div className="container mx-auto py-8 ">
            <ServicesSection services={services} />{' '}
          </div>
        </div>
        <div className="py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact us</h2>
          <Blocks blocks={layout} />
        </div>
        <div className="  w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <div className="container mx-auto   text-4xl sm:text-7xl font-bold relative z-20  ">
              <SocialsSection />
            </div>

        </div>
      </div>
    </div>
  )
}
