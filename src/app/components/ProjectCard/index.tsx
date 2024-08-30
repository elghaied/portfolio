'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Icon from '../DynamicIcon'
import { Project, Technology } from 'src/payload-types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, preview, description, technologies, slug } = project

  return (
    <Card className="h-full flex flex-col">
      <div className="relative w-full pt-[56.25%]">
        <Image
          src={typeof preview === 'string' ? preview : preview?.url}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <div className="flex h-full items-center justify-center space-x-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white p-2 text-gray-800 transition-colors hover:bg-gray-200"
            >
              <ExternalLink size={24} />
            </a>
          </div>
        </div>
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex flex-wrap gap-2">
          {typeof technologies !== 'string' &&
            technologies?.map((tech: Technology) => (
              <Badge key={tech.id} variant="secondary" className="flex items-center gap-1">
                <Icon name={tech.name} className="w-3 h-3" />
                <span className="text-xs">{tech.name}</span>
              </Badge>
            ))}
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
