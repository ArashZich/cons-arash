// فایل pages/sitemap.xml.js

const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  // جایگزینی آدرس API با آدرس واقعی
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_REALITY_BASE_URL}/api/v1/posts?per_page=100&published=true`
  ).then((r) => r.json());

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.NEXT_PUBLIC_BASE_URL || 'https://armogroup.tech/'}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${process.env.NEXT_PUBLIC_BASE_URL || 'https://armogroup.tech/'}/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
      ${posts.data.items
        .map(
          (post) => `
        <url>
          <loc>${process.env.NEXT_PUBLIC_BASE_URL || 'https://armogroup.tech/'}/blog/${
            post.title
          }</loc>
          <lastmod>${new Date(post.updated_at || post.created_at).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
