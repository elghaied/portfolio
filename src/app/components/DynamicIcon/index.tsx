import React from 'react';
import { IconBaseProps, IconType } from 'react-icons';
import * as DiIcons from 'react-icons/di';
import { DiCode } from 'react-icons/di';

interface IconProps extends IconBaseProps {
  name: string; // The name of the icon, e.g., 'DiReact'
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  // Generate the correct icon key (e.g., 'DiReact')
  const iconKey = `Di${name.charAt(0).toUpperCase()}${name.slice(1)}`;

  // Look up the icon component in the DiIcons module
  const IconComponent = DiIcons[iconKey as keyof typeof DiIcons] as IconType;

  // If no matching icon is found, handle it gracefully (fallback to a default icon or nothing)
  if (!IconComponent) {
    console.warn(`Icon ${iconKey} not found in react-icons/di`);
    return <DiCode {...props} />; // or render a default icon, e.g., <DiCode {...props} />
  }

  return <IconComponent {...props} />;
};

export default Icon;
