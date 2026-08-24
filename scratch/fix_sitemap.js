const fs = require('fs');
let code = fs.readFileSync('src/app/sitemap.ts', 'utf8');

const regex = /\{\s*url:\s*`\$\{BUSINESS\.siteUrl\}\/contact`[\s\S]*?\},/g;
code = code.replace(regex, '');

const contactBlock = `    {
      url: \`\${BUSINESS.siteUrl}/contact\`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },`;

code = code.replace(
  '    {\n      url: `${BUSINESS.siteUrl}/areas-we-serve`,',
  contactBlock + '\n    {\n      url: `${BUSINESS.siteUrl}/areas-we-serve`,'
);

fs.writeFileSync('src/app/sitemap.ts', code);
console.log('Fixed sitemap.ts');
