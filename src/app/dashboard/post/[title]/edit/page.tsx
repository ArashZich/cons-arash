// sections
import { PostEditView } from 'src/sections/blog/view';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Post Edit',
};

type Props = {
  params: {
    title: string;
  };
};

export default function PostEditPage({ params }: Props) {
  const { title } = params;

  return <PostEditView title={title} />;
}
