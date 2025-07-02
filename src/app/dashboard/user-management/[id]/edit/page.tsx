import React from 'react';
import { UserEditView } from 'src/sections/user/edit/view';

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
  return <UserEditView id={id} />;
}

export default UserDetailsPage;
