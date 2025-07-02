export function getShortenedLink(link: string, maxLength: number): string {
  if (link.length <= maxLength) {
    return link;
  }

  // Truncate the link and add ellipsis
  return `${link.substring(0, maxLength - 3)}...`;
}
