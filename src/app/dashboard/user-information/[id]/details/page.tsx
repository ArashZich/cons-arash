import React from 'react';
import { UserDetailsView } from 'src/sections/user/details/view';

export const metadata = {
  title: 'User Details',
};

type Props = {
  params: {
    id: string;
  };
};

function UserDetailsPage({ params }: Props) {
  const { id } = params;
  return <UserDetailsView id={id} />;
}

export default UserDetailsPage;
