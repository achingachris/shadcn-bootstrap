export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /dashboard/
Disallow: /api/
Disallow: /admin/

# Allow important pages
Allow: /
Allow: /events
Allow: /about
Allow: /artists-organizers
Allow: /login
Allow: /signup

# Sitemap location
Sitemap: https://haaafla.com/sitemap.xml

# Crawl delay
Crawl-delay: 1`

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
