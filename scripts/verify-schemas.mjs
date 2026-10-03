async function verify() {
  const res = await fetch("http://localhost:3000/");
  const html = await res.text();
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  let count = 0;
  while ((match = regex.exec(html)) !== null) {
    count++;
    const schema = JSON.parse(match[1]);
    console.log(`\n================ SCHEMA ${count}: ${schema["@type"]} ================`);
    console.log(JSON.stringify(schema, null, 2));
  }
}

verify().catch(console.error);
