// Komponenta pro generování celého ceníku
import React from "react";
import { FileText, Download, Copy } from "lucide-react";
import { defaultPriceList } from "../data/priceList";
import { defaultWorkPrices } from "../data/workPrices";

const PriceListGenerator = () => {
  const generateFullPriceList = () => {
    // HTML pro celý ceník
    let priceListHtml = `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HOTJET - Celý ceník tepelných čerpadel</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { height: 80px; width: auto; margin-bottom: 20px; }
        h1 { color: #333; border-bottom: 3px solid #ed1c24; padding-bottom: 10px; }
        h2 { color: #ed1c24; margin-top: 30px; margin-bottom: 15px; border-left: 4px solid #ed1c24; padding-left: 10px; }
        h3 { color: #333; margin-top: 25px; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background: #f5f5f5; border: 1px solid #ddd; padding: 12px 8px; text-align: left; font-weight: bold; }
        td { border: 1px solid #ddd; padding: 8px; vertical-align: top; }
        .code { font-family: monospace; background: #f8f9fa; padding: 2px 4px; border-radius: 3px; }
        .price { text-align: right; font-weight: bold; white-space: nowrap; }
        .description { font-size: 0.9em; color: #666; }
        .category-section { margin-bottom: 40px; }
        .work-section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center; color: #666; }
        @media print { body { font-size: 12px; } th, td { padding: 6px 4px; } }
    </style>
</head>
<body>
    <div class="header">
        <img src="data:image/svg+xml;base64,${btoa(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="300" height="80" viewBox="0 0 823 229" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
  <rect id="Artboard1" x="0" y="0" width="822.66" height="228.713" style="fill:none;"/>
  <clipPath id="_clip1">
    <rect x="0" y="0" width="822.66" height="228.713"/>
  </clipPath>
  <g clip-path="url(#_clip1)">
    <rect x="-0.896" y="0.309" width="823.735" height="228.211" style="fill:#ed1c24;"/>
    <rect x="753.323" y="26.628" width="20.229" height="19.871" style="fill:#fff;"/>
    <rect x="550.954" y="165.688" width="20.23" height="19.866" style="fill:#fff;"/>
    <rect x="321.178" y="38.847" width="20.738" height="20.738" style="fill:#fff;"/>
    <path d="M753.315,66.356l0,-19.871l-60.707,0l-0.007,19.871l-20.236,0l0,-19.871l-60.712,0l0,19.871l20.245,0l0,19.86l-20.245,0l0,-19.86l-20.234,0l0,-19.871l-20.235,0l0,19.871l-20.23,0l0,19.86l20.23,0l0,19.879l-20.23,0l0,39.728l20.23,0l0,19.87l20.235,0l0,-19.87l20.234,0l0,19.87l40.477,0l0,-19.87l20.235,0l0,-19.871l-20.235,0l0,-19.857l40.471,0l0,-19.886l0.007,0.007l20.232,0l0,-19.86l40.475,0Z" style="fill:#fff;fill-rule:nonzero;"/>
    <rect x="712.841" y="86.216" width="20.235" height="19.879" style="fill:#fff;"/>
    <path d="M134.883,78.507c-2.19,-1.901 -5.041,-3.371 -8.556,-4.401c-3.515,-1.046 -7.861,-1.564 -13.048,-1.564l-4.32,0c-1.615,0 -3.486,0.063 -5.618,0.176c-2.131,0.12 -4.637,0.291 -7.516,0.52c-2.882,0.231 -6.281,0.572 -10.195,1.039l-0,-35.431l-20.739,0l-0,120.973l20.739,0l-0,-71.717l22.637,0c2.995,0 5.298,0.288 6.914,0.868c1.614,0.568 2.792,1.406 3.544,2.501c0.745,1.09 1.18,2.393 1.296,3.883c0.113,1.507 0.174,3.117 0.174,4.845l-0,59.62l20.738,0l-0,-65.147c-0,-3.343 -0.463,-6.401 -1.384,-9.165c-0.923,-2.761 -2.479,-5.095 -4.666,-7" style="fill:#fff;fill-rule:nonzero;"/>
    <path d="M213.683,133.897c0,3.575 -0.976,6.194 -2.936,7.866c-1.96,1.666 -5.53,2.504 -10.714,2.504l-7.26,0c-5.18,0 -8.756,-0.838 -10.714,-2.504c-1.96,-1.672 -2.939,-4.291 -2.939,-7.866l0,-34.563c0,-3.572 0.979,-6.196 2.939,-7.863c1.958,-1.674 5.534,-2.501 10.714,-2.501l7.26,0c5.184,0 8.754,0.827 10.714,2.501c1.96,1.667 2.936,4.291 2.936,7.863l0,34.563Zm14.69,-54.525c-2.19,-1.902 -5.04,-3.367 -8.554,-4.402c-3.514,-1.043 -7.862,-1.556 -13.044,-1.556l-20.74,0c-5.183,0 -9.533,0.513 -13.048,1.556c-3.517,1.035 -6.368,2.5 -8.554,4.402c-2.192,1.901 -3.747,4.23 -4.668,7c-0.922,2.766 -1.384,5.819 -1.384,9.16l-0,42.164c-0,3.343 0.462,6.396 1.383,9.169c0.922,2.76 2.477,5.094 4.669,6.993c2.186,1.898 5.036,3.368 8.554,4.404c3.515,1.039 7.864,1.557 13.047,1.557l20.74,0c5.183,0 9.53,-0.518 13.044,-1.557c3.515,-1.036 6.365,-2.506 8.555,-4.404c2.189,-1.899 3.743,-4.233 4.665,-6.993c0.924,-2.773 1.385,-5.826 1.385,-9.169l0,-42.164c0,-3.341 -0.46,-6.394 -1.385,-9.16c-0.922,-2.77 -2.476,-5.099 -4.665,-7" style="fill:#fff;fill-rule:nonzero;"/>
    <path d="M291.454,144.267c-2.997,0 -5.302,-0.29 -6.912,-0.863c-1.617,-0.581 -2.796,-1.411 -3.544,-2.512c-0.751,-1.091 -1.186,-2.391 -1.296,-3.886c-0.118,-1.496 -0.172,-3.109 -0.172,-4.839l-0,-43.197l24.193,0l0,-15.557l-24.193,0l-0,-22.471l-15.557,0l-5.182,23.335l-12.098,0.859l0,13.834l12.098,0l0,48.726c0,3.342 0.455,6.396 1.382,9.169c0.92,2.759 2.475,5.093 4.666,6.993c2.189,1.898 5.038,3.368 8.556,4.404c3.511,1.039 7.862,1.557 13.048,1.557l5.184,0c5.182,0 8.785,-0.714 10.803,-2.158c2.01,-1.439 3.022,-3.889 3.022,-7.339l0,-4.326l-1.729,-1.729l-12.269,0Z" style="fill:#fff;fill-rule:nonzero;"/>
    <path d="M321.178,192.655l1.727,1.729l6.912,-0c2.997,-0 5.328,-1.324 7.001,-3.979c1.668,-2.65 2.877,-5.786 3.629,-9.413c0.748,-3.638 1.18,-7.406 1.296,-11.324c0.114,-3.914 0.173,-7.197 0.173,-9.849l0,-86.405l-20.738,-0l0,119.241Z" style="fill:#fff;fill-rule:nonzero;"/>
    <path d="M416.398,101.235c0,3.346 -0.95,6.024 -2.851,8.032c-1.902,2.018 -5.615,3.027 -11.148,3.027l-20.565,-0l0,-11.23c0,-3.571 1.065,-6.489 3.195,-8.733c2.133,-2.243 6.195,-3.361 12.184,-3.361l5.186,-0c5.533,-0 9.246,1.006 11.148,3.017c1.901,2.019 2.851,4.693 2.851,8.042l0,1.206Zm14.689,-21.863c-2.188,-1.902 -5.04,-3.366 -8.554,-4.402c-3.517,-1.043 -7.862,-1.556 -13.048,-1.556l-20.736,-0c-5.187,-0 -9.537,0.513 -13.048,1.556c-3.518,1.036 -6.368,2.5 -8.556,4.402c-2.19,1.901 -3.745,4.23 -4.667,7c-0.925,2.766 -1.383,5.819 -1.383,9.16l0,40.439c0,3.338 0.547,6.484 1.644,9.419c1.094,2.94 2.85,5.47 5.271,7.607c2.42,2.129 5.471,3.799 9.161,5.011c3.682,1.206 8.118,1.811 13.305,1.811l25.922,-0c5.185,-0 8.784,-0.714 10.803,-2.158c2.012,-1.439 3.022,-3.889 3.022,-7.339l0,-4.325l-1.728,-1.73l-31.97,-0c-3.226,-0 -5.819,-0.398 -7.776,-1.211c-1.962,-0.804 -3.46,-1.871 -4.495,-3.198c-1.036,-1.319 -1.701,-2.882 -1.987,-4.667c-0.288,-1.783 -0.433,-3.655 -0.433,-5.615l0,-3.453c4.725,0.456 8.323,0.807 10.803,1.031c2.475,0.236 4.518,0.405 6.133,0.521c1.613,0.125 3.111,0.173 4.495,0.173l6.22,-0c5.186,-0 9.531,-0.518 13.048,-1.554c3.514,-1.038 6.366,-2.501 8.554,-4.405c2.188,-1.909 3.744,-4.233 4.666,-7.001c0.92,-2.763 1.384,-5.817 1.384,-9.155l0,-10.201c0,-3.341 -0.464,-6.394 -1.384,-9.16c-0.922,-2.77 -2.478,-5.099 -4.666,-7" style="fill:#fff;fill-rule:nonzero;"/>
    <path d="M490.709,144.267c-2.997,0 -5.302,-0.29 -6.912,-0.863c-1.617,-0.581 -2.796,-1.411 -3.544,-2.512c-0.752,-1.091 -1.183,-2.391 -1.296,-3.886c-0.117,-1.496 -0.172,-3.109 -0.172,-4.839l-0,-43.197l24.195,0l-0,-15.557l-24.195,0l-0,-22.471l-15.554,0l-5.183,23.335l-12.101,0.859l-0,13.834l12.101,0l-0,48.726c-0,3.342 0.46,6.396 1.38,9.169c0.921,2.759 2.475,5.093 4.666,6.993c2.188,1.898 5.038,3.368 8.555,4.404c3.513,1.039 7.863,1.557 13.049,1.557l5.186,0c5.18,0 8.784,-0.714 10.801,-2.158c2.011,-1.439 3.023,-3.889 3.023,-7.339l-0,-4.326l-1.728,-1.729l-12.271,0Z" style="fill:#fff;fill-rule:nonzero;"/>
  </g>
</svg>`)}" alt="HOTJET Logo" class="logo">
        <h1>CELÝ CENÍK TEPELNÝCH ČERPADEL</h1>
        <p><strong>Datum vydání:</strong> ${new Date().toLocaleDateString(
          "cs-CZ"
        )}</p>
        <p><strong>Platnost:</strong> Do odvolání</p>
    </div>

    <h2>🌡️ TEPELNÁ ČERPADLA VZDUCH-VODA</h2>`;

    // Přidání kategorií vzduch-voda
    const airWaterCategories = ["A", "B", "D", "E", "H"];
    airWaterCategories.forEach((category) => {
      if (defaultPriceList[category]) {
        priceListHtml += `
    <div class="category-section">
        <h3>${defaultPriceList[category].name}</h3>
        ${
          defaultPriceList[category].description
            ? `<p class="description">${defaultPriceList[category].description}</p>`
            : ""
        }
        <table>
            <thead>
                <tr>
                    <th>Kód</th>
                    <th>Název</th>
                    <th>Výkon</th>
                    <th>Cena bez DPH</th>
                </tr>
            </thead>
            <tbody>`;

        defaultPriceList[category].items.forEach((item) => {
          priceListHtml += `
                <tr>
                    <td><span class="code">${item.code}</span></td>
                    <td>${item.name}</td>
                    <td>${item.power || "-"}</td>
                    <td class="price">${Math.round(item.price).toLocaleString(
                      "cs-CZ"
                    )} Kč</td>
                </tr>`;
        });

        priceListHtml += `
            </tbody>
        </table>
    </div>`;
      }
    });

    priceListHtml += `
    <h2>⚙️ ROZVADĚČE A HYDROMODULY</h2>`;

    // Přidání rozvaděčů
    const controllerCategories = ["C1", "C2", "J"];
    controllerCategories.forEach((category) => {
      if (defaultPriceList[category]) {
        priceListHtml += `
    <div class="category-section">
        <h3>${defaultPriceList[category].name}</h3>
        ${
          defaultPriceList[category].description
            ? `<p class="description">${defaultPriceList[category].description}</p>`
            : ""
        }
        <table>
            <thead>
                <tr>
                    <th>Kód</th>
                    <th>Název</th>
                    <th>Popis</th>
                    <th>Cena bez DPH</th>
                </tr>
            </thead>
            <tbody>`;

        defaultPriceList[category].items.forEach((item) => {
          priceListHtml += `
                <tr>
                    <td><span class="code">${item.code}</span></td>
                    <td>${item.name}</td>
                    <td>${item.description || "-"}</td>
                    <td class="price">${Math.round(item.price).toLocaleString(
                      "cs-CZ"
                    )} Kč</td>
                </tr>`;
        });

        priceListHtml += `
            </tbody>
        </table>
    </div>`;
      }
    });

    priceListHtml += `
    <h2>🌍 TEPELNÁ ČERPADLA ZEMĚ/VODA-VODA</h2>`;

    // Přidání kategorií země/voda-voda
    const groundWaterCategories = ["F", "G"];
    groundWaterCategories.forEach((category) => {
      if (defaultPriceList[category]) {
        priceListHtml += `
    <div class="category-section">
        <h3>${defaultPriceList[category].name}</h3>
        ${
          defaultPriceList[category].description
            ? `<p class="description">${defaultPriceList[category].description}</p>`
            : ""
        }
        <table>
            <thead>
                <tr>
                    <th>Kód</th>
                    <th>Název</th>
                    <th>Výkon</th>
                    <th>Cena bez DPH</th>
                </tr>
            </thead>
            <tbody>`;

        defaultPriceList[category].items.forEach((item) => {
          priceListHtml += `
                <tr>
                    <td><span class="code">${item.code}</span></td>
                    <td>${item.name}</td>
                    <td>${item.power || "-"}</td>
                    <td class="price">${Math.round(item.price).toLocaleString(
                      "cs-CZ"
                    )} Kč</td>
                </tr>`;
        });

        priceListHtml += `
            </tbody>
        </table>
    </div>`;
      }
    });

    priceListHtml += `
    <h2>🔧 PŘÍSLUŠENSTVÍ</h2>`;

    // Přidání příslušenství
    const accessoryCategories = ["M", "N", "O", "P", "Q", "R", "S", "T", "Z"];
    accessoryCategories.forEach((category) => {
      if (defaultPriceList[category]) {
        priceListHtml += `
    <div class="category-section">
        <h3>${defaultPriceList[category].name}</h3>
        ${
          defaultPriceList[category].description
            ? `<p class="description">${defaultPriceList[category].description}</p>`
            : ""
        }
        <table>
            <thead>
                <tr>
                    <th>Kód</th>
                    <th>Název</th>
                    <th>Popis</th>
                    <th>Cena bez DPH</th>
                </tr>
            </thead>
            <tbody>`;

        defaultPriceList[category].items.forEach((item) => {
          priceListHtml += `
                <tr>
                    <td><span class="code">${item.code}</span></td>
                    <td>${item.name}</td>
                    <td>${item.description || "-"}</td>
                    <td class="price">${Math.round(item.price).toLocaleString(
                      "cs-CZ"
                    )} Kč</td>
                </tr>`;
        });

        priceListHtml += `
            </tbody>
        </table>
    </div>`;
      }
    });

    // Přidání prací
    priceListHtml += `
    <div class="work-section">
        <h2>🛠️ PRÁCE A MATERIÁL</h2>
        
        <h3>Práce pro vzduch-voda čerpadla</h3>
        <table>
            <thead>
                <tr>
                    <th>Název práce</th>
                    <th>Popis</th>
                    <th>Cena bez DPH</th>
                </tr>
            </thead>
            <tbody>`;

    defaultWorkPrices.vzduchVoda.forEach((work, index) => {
      priceListHtml += `
                <tr>
                    <td>${work.name}</td>
                    <td>${work.description || "-"}</td>
                    <td class="price">${Math.round(work.price).toLocaleString(
                      "cs-CZ"
                    )} Kč</td>
                </tr>`;
    });

    priceListHtml += `
            </tbody>
        </table>
        
        <h3>Práce pro země/voda-voda čerpadla</h3>
        <table>
            <thead>
                <tr>
                    <th>Název práce</th>
                    <th>Popis</th>
                    <th>Cena bez DPH</th>
                </tr>
            </thead>
            <tbody>`;

    defaultWorkPrices.zemeVoda.forEach((work, index) => {
      priceListHtml += `
                <tr>
                    <td>${work.name}</td>
                    <td>${work.description || "-"}</td>
                    <td class="price">${Math.round(work.price).toLocaleString(
                      "cs-CZ"
                    )} Kč</td>
                </tr>`;
    });

    priceListHtml += `
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p><strong>HOTJET s.r.o.</strong> - Tepelná čerpadla vzduch-voda a země/voda-voda</p>
        <p>Všechny ceny jsou uvedeny bez DPH. DPH se přičítá podle typu zákazníka.</p>
        <p>Zákazníci: 12% DPH | Montážní firmy: 21% DPH</p>
    </div>
</body>
</html>`;

    return priceListHtml;
  };

  const copyToClipboard = async () => {
    const priceListHtml = generateFullPriceList();

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const blob = new Blob([priceListHtml], { type: "text/html" });
        const clipboardItem = new window.ClipboardItem({ "text/html": blob });
        await navigator.clipboard.write([clipboardItem]);
        alert("✅ Celý ceník byl zkopírován do schránky!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = priceListHtml;
        document.body.appendChild(textArea);
        textArea.select();

        if (document.execCommand("copy")) {
          document.body.removeChild(textArea);
          alert("✅ Celý ceník byl zkopírován do schránky!");
        } else {
          throw new Error("Kopírování selhalo");
        }
      }
    } catch (error) {
      console.error("Chyba při kopírování:", error);
      alert("❌ Nepodařilo se zkopírovat ceník do schránky");
    }
  };

  const downloadHtml = () => {
    const priceListHtml = generateFullPriceList();
    const blob = new Blob([priceListHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `HOTJET-cenik-${new Date().toISOString().split("T")[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        📋 Generování celého ceníku
      </h2>

      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          💡 Co obsahuje celý ceník:
        </h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Všechny tepelná čerpadla vzduch-voda (A, B, D, E, H)</li>
          <li>• Rozvaděče a hydromoduly (C1, C2, J)</li>
          <li>• Tepelná čerpadla země/voda-voda (F, G)</li>
          <li>• Všechno příslušenství (M, N, O, P, Q, R, S, T, Z)</li>
          <li>• Práce a materiál pro oba typy čerpadel</li>
          <li>• Profesionální formátování s HOTJET logem</li>
        </ul>
      </div>

      <div className="space-y-3">
        {/* Kopírování do schránky */}
        <button
          onClick={copyToClipboard}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <Copy size={20} />
          📋 Zkopírovat celý ceník
        </button>

        {/* Stažení HTML souboru */}
        <button
          onClick={downloadHtml}
          className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
        >
          <Download size={20} />
          💾 Stáhnout celý ceník
        </button>
      </div>

      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="text-sm font-medium text-green-800 mb-2">
          ✅ Výhody celého ceníku:
        </h4>
        <ul className="text-xs text-green-700 space-y-1">
          <li>• Kompletní přehled všech produktů a cen</li>
          <li>• Profesionální formátování vhodné pro tisk</li>
          <li>• Obsahuje všechny kategorie a podkategorie</li>
          <li>• Ideální pro distribuci zákazníkům</li>
        </ul>
      </div>
    </div>
  );
};

export default PriceListGenerator;
