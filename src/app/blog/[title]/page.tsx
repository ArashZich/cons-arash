import type { Metadata, ResolvingMetadata } from 'next';
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// sections
import { PostDetailsHomeView } from 'src/sections/blog/view';
// ----------------------------------------------------------------------

type Props = {
  params: { title: string };
};

// generateMetadata function
// در فایل app/blog/[title]/page.tsx
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { title } = params;

  // فیلترهای API
  const filters = JSON.stringify({
    title: { op: FilterOperatorsEnum.EQUALS, value: title },
  });

  try {
    // دریافت داده‌های پست
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REALITY_BASE_URL}/api/v1/posts?filters=${encodeURIComponent(
        filters
      )}&page=1&per_page=1&order=desc&order_by=id`,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const postData = await response.json();

    if (!postData?.data?.items?.length) {
      throw new Error('No post found');
    }

    const post = postData.data.items[0];
    const imageUrl = post.cover_url;

    // بازگرداندن متادیتای کامل با تصویر و توضیحات پست
    return {
      title: post.meta_title || post.title,
      description: post.meta_description || post.description,
      keywords: post.meta_keywords || post.tags,
      openGraph: {
        title: post.meta_title || post.title,
        description: post.meta_description || post.description,
        url: `https://armogroup.tech/blog/${post.title}`,
        siteName: 'ARmo',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: 'fa_IR',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.meta_title || post.title,
        description: post.meta_description || post.description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    // متادیتای پیش‌فرض در صورت خطا
    return {
      title: 'بلاگ ARmo',
      description: 'آخرین مطالب و مقالات در حوزه AR/VR/3D',
    };
  }
}

export default function PostDetailsHomePage({ params }: Props) {
  const { title } = params;
  return <PostDetailsHomeView title={title} />;
}
