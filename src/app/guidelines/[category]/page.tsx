// src/app/guideline/[category]/page.tsx

// sections
import { GuidelineCategoryView } from 'src/sections/guidelines/view';

// ----------------------------------------------------------------------

type Props = {
  params: {
    category: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { category } = params;

  return {
    title: `راهنمای ${category} | ARmo`,
    description: `راهنمای کامل استفاده از سرویس ${category} در پلتفرم آرمو`,
  };
}

export default function GuidelineCategoryPage({ params }: Props) {
  const { category } = params;

  return <GuidelineCategoryView category={category} />;
}
