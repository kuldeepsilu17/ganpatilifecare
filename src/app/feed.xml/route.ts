import { BLOG_POSTS } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export async function GET() {
  const feedItems = BLOG_POSTS.map((post) => {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>info@ganpatilifecare.com (${post.author})</author>
      <category>${post.category}</category>
    </item>`;
  }).join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ganpati Lifecare — Medical &amp; Surgical Knowledge Hub</title>
    <link>${SITE_URL}/blog</link>
    <description>Clinical insights, orthopedic cotton guides, surgical dressing guides, and hospital supply standards from Ganpati Lifecare, Goluwala, Hanumangarh, Rajasthan.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${feedItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
