export default function sitemap() {
  const base = 'https://heartcore.studio';
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
  ];
}