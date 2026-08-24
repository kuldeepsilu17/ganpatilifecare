const fs = require('fs');
let code = fs.readFileSync('src/app/locations/[city]/page.tsx', 'utf8');

const schemaInjection = `
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BUSINESS.siteUrl },
      { "@type": "ListItem", position: 2, name: "Areas We Serve", item: \`\${BUSINESS.siteUrl}/areas-we-serve\` },
      { "@type": "ListItem", position: 3, name: location.city, item: \`\${BUSINESS.siteUrl}/locations/\${location.slug}\` },
    ],
  };`;

code = code.replace(
  '  return (\n    <>\n      <script',
  schemaInjection + '\n\n  return (\n    <>\n      <script'
);

const scriptTag = `
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />`;

code = code.replace(
  'dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}\n      />\n      <Navbar />',
  'dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}\n      />' + scriptTag + '\n      <Navbar />'
);

const navHtml = `
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-medical">
                Home
              </Link>
              <span>/</span>
              <Link href="/areas-we-serve" className="hover:text-medical">
                Areas We Serve
              </Link>
              <span>/</span>
              <span className="font-semibold text-foreground">{location.city}</span>
            </nav>`;

code = code.replace(
  '          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">\n            <span',
  '          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">\n' + navHtml + '\n            <span'
);

code = code.replace(
  'href="/#products"\n                className="inline-flex items-center',
  'href="/products"\n                className="inline-flex items-center'
);

fs.writeFileSync('src/app/locations/[city]/page.tsx', code);
console.log('Done locations page update');
