import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps extends LucideIcons.LucideProps {
  name: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  const toPascalCase = (str: string) => str.replace(/(^\w|-\w)/g, clearAndUpper);
  const clearAndUpper = (text: string) => text.replace(/-/, "").toUpperCase();
  
  const IconComponent = (LucideIcons as any)[toPascalCase(name)];

  if (!IconComponent) {
    return <LucideIcons.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};
