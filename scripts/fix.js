/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "src");

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".tsx")) fix(p);
  }
}

function fix(file) {
  let t = fs.readFileSync(file, "utf8");
  const o = t;
  const mo = "<motion.div";
  const d = "<div";
  const mc = "</motion.div>";
  const dc = "</div>";
  t = t.replaceAll(`${mo} className="mt-10`, `${d} className="mt-10`);
  t = t.replaceAll(`${mo} className="relative aspect`, `${d} className="relative aspect`);
  t = t.replaceAll(`${mo} className="flex flex-1`, `${d} className="flex flex-1`);
  t = t.replaceAll(
    `${mo} className="relative mx-auto flex max-w-7xl flex-col items-center`,
    `${d} className="relative mx-auto flex max-w-7xl flex-col items-center`
  );
  t = t.replaceAll(`${mo} className="mx-auto max-w-3xl`, `${d} className="mx-auto max-w-3xl`);
  t = t.replaceAll(`${mo} className="grid gap-10`, `${d} className="grid gap-10`);
  t = t.replaceAll(`        ${mc}\n\n        <ul`, `        ${dc}\n\n        <ul`);
  t = t.replaceAll(
    `                ${mc}\n                ${mo} className="flex flex-1`,
    `                ${dc}\n                ${d} className="flex flex-1`
  );
  t = t.replaceAll(`                ${mc}\n              </motion.li>`, `                ${dc}\n              </motion.li>`);
  t = t.replaceAll(`      ${mc}\n    </section>`, `      ${dc}\n    </section>`);
  t = t.replaceAll(`      ${mc}\n\n      <WaveDivider`, `      ${dc}\n\n      <WaveDivider`);
  t = t.replaceAll(`        ${mc}\n        <motion.div className="mt-10`, `        ${dc}\n        <div className="mt-10`);
  t = t.replaceAll(`        ${mc}\n        <div className="mt-10`, `        ${dc}\n        <motion.div className="mt-10`);
  if (t !== o) {
    fs.writeFileSync(file, t);
    console.log("fixed", path.relative(ROOT, file));
  }
}

walk(ROOT);
