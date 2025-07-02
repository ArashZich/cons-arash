export function buildSiteTitle(value: string) {
  return `${value} | ${process.env.NEXT_APP_SITE_TITLE}`;
}
