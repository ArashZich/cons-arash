// sections

import { ChoosePlanView } from 'src/sections/organization/choose-plan/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Choose Package',
};

type Props = {
  params: {
    id: string;
  };
};

export default function ChoosePlanPage({ params }: Props) {
  const { id } = params;
  return <ChoosePlanView id={id} />;
}
