'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const DynamicIcon = ({ iconName }) => {
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    const importIcon = async () => {
      try {
        // This assumes all icons are in the 'di' directory. Adjust if needed.
        const { [iconName]: ImportedIcon } = await import(`@react-icons/di/${iconName}`);
        setIcon(() => ImportedIcon);
      } catch (err) {
        console.error(`Error importing icon: ${iconName}`, err);
      }
    };

    importIcon();
  }, [iconName]);

  if (!Icon) return null;
  return <Icon className="mr-1" />;
};

const ProjectCard = ({ project }) => {
  const { title, preview, description, technologies, slug } = project;

  return (
    <div className="project-card border border-border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300">
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
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">
          <Link href={`/projects/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies?.map((tech) => (
            <div key={tech.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <DynamicIcon iconName={tech.iconName} />
              <span className="text-xs">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
