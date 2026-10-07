/**
 * IndexNow submission script for Ganpati Lifecare
 * Submits URL list to IndexNow API (Bing, Yandex, Seznam, Naver)
 */

const HOST = "www.ganpatilifecare.com";
const KEY = "39294e5a959141049ad5fba9d167f185";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const CORE_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/company-facts`,
  `https://${HOST}/products`,
  `https://${HOST}/categories/orthopedic`,
  `https://${HOST}/categories/surgical`,
  `https://${HOST}/categories/hospital-uniforms`,
  `https://${HOST}/categories/healthcare-essentials`,
  `https://${HOST}/products/orthocot-cotton-roll`,
  `https://${HOST}/products/stockinet`,
  `https://${HOST}/products/skin-traction-kit`,
  `https://${HOST}/products/gamjee-roll`,
  `https://${HOST}/products/sponge-pad`,
  `https://${HOST}/products/orthopedic-gauze-bandages`,
  `https://${HOST}/products/bandages`,
  `https://${HOST}/products/surgical-dressing-materials`,
  `https://${HOST}/products/doctor-coats`,
  `https://${HOST}/products/nurse-uniforms`,
  `https://${HOST}/products/ot-dresses`,
  `https://${HOST}/products/staff-uniforms`,
  `https://${HOST}/products/medical-disposables`,
  `https://${HOST}/products/hospital-consumables`,
  `https://${HOST}/locations`,
  `https://${HOST}/locations/hanumangarh`,
  `https://${HOST}/locations/sri-ganganagar`,
  `https://${HOST}/locations/suratgarh`,
  `https://${HOST}/locations/bikaner`,
  `https://${HOST}/locations/nohar`,
  `https://${HOST}/locations/rawatsar`,
  `https://${HOST}/locations/pilibanga`,
  `https://${HOST}/locations/sangaria`,
  `https://${HOST}/locations/bhadra`,
  `https://${HOST}/blog`,
  `https://${HOST}/contact`,
];

async function submitIndexNow() {
  console.log(`Submitting ${CORE_URLS.length} URLs to IndexNow for ${HOST}...`);
  
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: CORE_URLS,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      console.log(`✅ IndexNow submission successful! Status: ${res.status}`);
    } else {
      console.log(`⚠️ IndexNow response status: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error("❌ IndexNow submission error:", err.message);
  }
}

submitIndexNow();
