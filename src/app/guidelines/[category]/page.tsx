// src/app/guideline/[category]/page.tsx

// sections
import { GuidelineCategoryView } from 'src/sections/guidelines/view';

// ----------------------------------------------------------------------

type Props = {
  params: {
    category: string;
  };
};

export async function generateMetadata() {
  return {
    title: `راهنمای استفاده`,
    description: `راهنمای کامل استفاده از پلتفرم آرمو`,
  };
}

export default function GuidelineCategoryPage({ params }: Props) {
  const { category } = params;

  return <GuidelineCategoryView category={category} />;
}
