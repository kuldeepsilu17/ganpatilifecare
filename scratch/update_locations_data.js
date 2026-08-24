const fs = require('fs');
let code = fs.readFileSync('src/lib/locations.ts', 'utf8');

const newLocations = `  },
  {
    city: "Pilibanga",
    slug: "pilibanga",
    region: "Rajasthan",
    description: "Reaching hospitals and primary health centres across Pilibanga tehsil with orthopedic cotton rolls, stockinet, and everyday hospital consumables.",
    hospitalCount: "Local Clinics & Hospitals",
  },
  {
    city: "Sangaria",
    slug: "sangaria",
    region: "Rajasthan",
    description: "Supplying surgical dressing materials, bandages, and healthcare staff uniforms to clinics and nursing homes across Sangaria.",
    hospitalCount: "Local Clinics & Hospitals",
  },
  {
    city: "Bhadra",
    slug: "bhadra",
    region: "Rajasthan",
    description: "A dependable source of orthopedic padding, gauze bandages, and hospital uniforms for healthcare facilities throughout Bhadra tehsil.",
    hospitalCount: "Local Clinics & Hospitals",
  }
];`;

code = code.replace(/\},\s*\{\s*city:\s*"Rawatsar"[\s\S]*?\}\s*\];/, '},' + code.match(/\{\s*city:\s*"Rawatsar"[\s\S]*?\}/)[0] + '\n' + newLocations.replace('  },', ''));

fs.writeFileSync('src/lib/locations.ts', code);
console.log('Done modifying locations.ts');
