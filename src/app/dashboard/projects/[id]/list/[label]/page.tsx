import React from 'react';
import { ProjectListView } from 'src/sections/dashboard/project/list/view';

export const metadata = {
  title: 'Projects List',
};

type Props = {
  params: {
    id: string;
  };
};
export default function ProjectListPage({ params }: Props) {
  const { id } = params;

  return <ProjectListView ID={id} />;
}
