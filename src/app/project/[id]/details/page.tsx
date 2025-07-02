import React from 'react';
import { ProjectDetailsView } from 'src/sections/project/details/view';

export const metadata = {
  title: 'Projects Details',
};

type Props = {
  params: {
    id: string;
  };
};
export default function ProjectDetailsPage({ params }: Props) {
  const { id } = params;

  return <ProjectDetailsView uid={id} />;
}
