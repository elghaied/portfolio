'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '../DynamicIcon';

interface Technology {
  id: string;
  name: string;
}

interface Project {
  title: string;
  preview?: {
    url: string;
  };
  description: string;
  technologies: Technology[];
  slug: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, preview, description, technologies, slug } = project;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="relative w-full h-48">
        {preview ? (
          <Image
            src={preview.url}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            No preview available
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2">
          <Link href={`/projects/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies?.map((tech) => (
            <div key={tech.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <Icon name={tech.name} className="mr-1" />
              <span className="text-xs">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
