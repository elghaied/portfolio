'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../DynamicIcon';
import { Project, Technology } from 'src/payload-types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';



interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, preview, description, technologies , slug } = project;

  return (
    <Card className="h-full flex flex-col">
    <div className="relative w-full pt-[56.25%]">
      {preview ? (
        <Image
          src={typeof preview === 'string' ? preview : preview?.url}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center rounded-t-lg">
          No preview available
        </div>
      )}
    </div>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
    <CardFooter className="flex flex-col items-start gap-4">
      <div className="flex flex-wrap gap-2">
        {typeof technologies !== 'string' && technologies?.map((tech: Technology) => (
          <Badge key={tech.id} variant="secondary" className="flex items-center gap-1">
            <Icon name={tech.name} className="w-3 h-3" />
            <span className="text-xs">{tech.name}</span>
          </Badge>
        ))}
      </div>
      <Button asChild className="w-full">
        <Link href={`/projects/${slug}`}>View Project</Link>
      </Button>
    </CardFooter>
  </Card>
  );
};

export default ProjectCard;
