async function checkSitemap() {
  const res = await fetch("http://localhost:3000/sitemap.xml");
  const xml = await res.text();
  const locRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1]);
  }

  console.log(`Found ${urls.length} URLs in sitemap.`);
  let failed = 0;

  for (const url of urls) {
    const localUrl = url.replace("https://www.ganpatilifecare.com", "http://localhost:3000");
    try {
      const pageRes = await fetch(localUrl, { redirect: "manual" });
      if (pageRes.status === 200) {
        // OK
      } else {
        console.error(`❌ FAIL: ${url} returned ${pageRes.status}`);
        failed++;
      }
    } catch (err) {
      console.error(`❌ ERROR: ${url} error:`, err.message);
      failed++;
    }
  }

  if (failed === 0) {
    console.log(`✅ All ${urls.length} sitemap URLs returned HTTP 200 OK!`);
  } else {
    console.log(`⚠️ ${failed} URLs failed.`);
  }
}

checkSitemap().catch(console.error);
