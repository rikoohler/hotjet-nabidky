// Komponenta pro generování a otevírání emailů s nabídkou
import React from "react";
import { Mail, Download, Copy } from "lucide-react";
import { calculateTotals } from "../utils/calculations";

const EmailGenerator = ({
  projectName,
  customerName,
  offerDate,
  selectedItems,
  selectedWork,
  customerType,
  priceList,
  saveQuote,
  loadQuote,
}) => {
  const generateEmailContent = () => {
    const totals = calculateTotals(selectedItems, selectedWork, customerType);

    // Kategorie pro správné rozdělení
    const heatPumpCategories = ["A", "B", "D", "E", "F", "G", "H"];
    const controlCategories = ["C1", "C2", "J"];

    // HTML pro email
    let emailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
  <h1 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">CENOVÁ NABÍDKA</h1>
  
  <div style="margin: 20px 0;">
    <p><strong>Akce:</strong> ${projectName}</p>
    <p><strong>Zákazník:</strong> ${customerName}</p>
    <p><strong>Datum vystavení:</strong> ${new Date(
      offerDate
    ).toLocaleDateString("cs-CZ")}</p>
    <p><strong>Platnost nabídky:</strong> 30 dní</p>
  </div>
  
  <hr style="border: 1px solid #ddd;">
`;

    // Zpracování kategorií produktů
    [...heatPumpCategories, ...controlCategories].forEach((cat) => {
      const items = Object.entries(selectedItems).filter(
        ([key, val]) => key.startsWith(cat + "-") && val.quantity > 0
      );

      if (items.length > 0 && priceList[cat]) {
        emailHtml += `
          <div style="margin: 30px 0;">
            <h2 style="color: #333; background: #f5f5f5; padding: 10px;">${priceList[cat].name}</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background: #f0f0f0;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Kód</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Popis</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right; white-space: nowrap;">Cena po slevě</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Ks</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right; white-space: nowrap;">Celkem</th>
              </tr>`;

        items.forEach(([key, item]) => {
          const priceAfterDiscount = item.price * (1 - totals.discount);
          const itemTotal = Math.round(priceAfterDiscount * item.quantity);

          emailHtml += `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                item.code
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                item.name
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right; white-space: nowrap;">${Math.round(
                priceAfterDiscount
              ).toLocaleString("cs-CZ")} Kč</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
                item.quantity
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right; white-space: nowrap;"><strong>${itemTotal.toLocaleString(
                "cs-CZ"
              )} Kč</strong></td>
            </tr>`;
        });

        emailHtml += `</table>`;

        if (priceList[cat].description) {
          emailHtml += `
            <div style="background: #e6f2ff; padding: 10px; margin: 10px 0; border-left: 3px solid #0066cc;">
              ${priceList[cat].description.replace(/\n/g, "<br>")}
            </div>`;
        }

        emailHtml += `</div>`;
      }
    });

    // Příslušenství
    const accessoryCategories = Object.keys(priceList).filter(
      (cat) =>
        !heatPumpCategories.includes(cat) && !controlCategories.includes(cat)
    );

    accessoryCategories.forEach((cat) => {
      const items = Object.entries(selectedItems).filter(
        ([key, val]) => key.startsWith(cat + "-") && val.quantity > 0
      );

      if (items.length > 0) {
        emailHtml += `
          <div style="margin: 30px 0;">
            <h2 style="color: #333; background: #f5f5f5; padding: 10px;">${priceList[cat].name}</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background: #f0f0f0;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Kód</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Popis</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right; white-space: nowrap;">Cena po slevě</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Ks</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right; white-space: nowrap;">Celkem</th>
              </tr>`;

        items.forEach(([key, item]) => {
          const priceAfterDiscount = item.price * (1 - totals.discount);
          const itemTotal = Math.round(priceAfterDiscount * item.quantity);

          emailHtml += `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                item.code
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                item.name
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right; white-space: nowrap;">${Math.round(
                priceAfterDiscount
              ).toLocaleString("cs-CZ")} Kč</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
                item.quantity
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right; white-space: nowrap;"><strong>${itemTotal.toLocaleString(
                "cs-CZ"
              )} Kč</strong></td>
            </tr>`;
        });

        emailHtml += `</table></div>`;
      }
    });

    // Práce a instalační materiál
    const workItems = Object.entries(selectedWork).filter(
      ([key, val]) => val.quantity > 0
    );
    if (workItems.length > 0) {
      emailHtml += `
        <div style="margin: 30px 0;">
          <h2 style="color: #333; background: #f5f5f5; padding: 10px;">Práce a instalační materiál</h2>
          <p style="font-style: italic; color: #666;">Níže je uveden odhad ceny materiálu, který bude vyúčtován dle skutečné spotřeby v nákupních cenách bez DPH + 15%</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f0f0f0;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Popis</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: right; white-space: nowrap;">Cena za jednotku</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Počet</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: right; white-space: nowrap;">Celkem</th>
            </tr>`;

      workItems.forEach(([key, item]) => {
        const itemTotal = Math.round(item.price * item.quantity);

        emailHtml += `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: right; white-space: nowrap;">${Math.round(
              item.price
            ).toLocaleString("cs-CZ")} Kč</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
              item.quantity
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: right; white-space: nowrap;"><strong>${itemTotal.toLocaleString(
              "cs-CZ"
            )} Kč</strong></td>
          </tr>`;
      });

      emailHtml += `</table></div>`;
    }

    // Souhrn
    emailHtml += `
      <div style="margin: 40px 0; border: 2px solid #667eea; padding: 20px; background: #f8f9ff;">
        <h2 style="color: #333; margin-top: 0;">CELKOVÝ SOUHRN</h2>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">Tepelné čerpadlo včetně rozvaděče/hydromodulu</td>
            <td style="padding: 8px; text-align: right; font-weight: bold; white-space: nowrap;">${Math.round(
              totals.heatPumpTotal
            ).toLocaleString("cs-CZ")} Kč</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Příslušenství</td>
            <td style="padding: 8px; text-align: right; font-weight: bold; white-space: nowrap;">${Math.round(
              totals.accessoriesTotal
            ).toLocaleString("cs-CZ")} Kč</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Práce a instalační materiál</td>
            <td style="padding: 8px; text-align: right; font-weight: bold; white-space: nowrap;">${Math.round(
              totals.workTotal
            ).toLocaleString("cs-CZ")} Kč</td>
          </tr>
          <tr style="border-top: 2px solid #333;">
            <td style="padding: 8px; font-weight: bold;">Mezisoučet</td>
            <td style="padding: 8px; text-align: right; font-weight: bold; white-space: nowrap;">${Math.round(
              totals.subtotal
            ).toLocaleString("cs-CZ")} Kč</td>
          </tr>
          <tr>
            <td style="padding: 8px;">DPH ${(totals.vat * 100).toFixed(0)}%</td>
            <td style="padding: 8px; text-align: right; white-space: nowrap;">${Math.round(
              totals.vatAmount
            ).toLocaleString("cs-CZ")} Kč</td>
          </tr>
          <tr style="background: #667eea; color: white;">
            <td style="padding: 12px; font-weight: bold; font-size: 1.2em;">CELKEM K ÚHRADĚ</td>
            <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 1.2em; white-space: nowrap;">${Math.round(
              totals.total
            ).toLocaleString("cs-CZ")} Kč</td>
          </tr>
        </table>
      </div>
      
      <div style="margin-top: 30px; padding: 20px; background: #f5f5f5;">
        <p><strong>Platební podmínky:</strong> 50% záloha při objednávce, doplatek při dodání</p>
        <p><strong>Dodací lhůta:</strong> 2-4 týdny od objednávky</p>
        <p><strong>Kontakt:</strong> info@hotjet.cz | +420 xxx xxx xxx</p>
      </div>
    </div>`;

    return emailHtml;
  };

    const openEmailClient = async () => {
    const emailHtml = generateEmailContent();
 
    try {
      // Moderní Clipboard API s HTML MIME typem
      if (navigator.clipboard && window.ClipboardItem) {
        const blob = new Blob([emailHtml], { type: "text/html" });
        const clipboardItem = new window.ClipboardItem({ "text/html": blob });
        await navigator.clipboard.write([clipboardItem]);
 
        // Pokus o otevření email klienta s různými metodami
        const subject = encodeURIComponent(
          `Cenová nabídka - ${projectName || "HOTJET tepelné čerpadlo"}`
        );
        
        // Metoda 1: Přímé otevření mailto
        const mailtoUrl = `mailto:?subject=${subject}`;
        const mailtoWindow = window.open(mailtoUrl, "_blank");
        
        // Metoda 2: Pokud mailto nefunguje, zkusíme jiné přístupy
        setTimeout(() => {
          if (!mailtoWindow || mailtoWindow.closed) {
            // Zkusíme otevřít s location.href
            try {
              window.location.href = mailtoUrl;
            } catch (e) {
              console.log("Location.href selhal, zkusíme jiný přístup");
            }
          }
        }, 100);
 
        alert(
          `✅ Profesionální nabídka byla zkopírována do schránky!\n\n📧 Pokus o otevření email klienta...\n\n💡 Pokud se email neotevřel automaticky:\n1. Otevřete váš email program ručně\n2. Vložte obsah z schránky (Ctrl+V / Cmd+V)`
        );
      } else {
        // Fallback na starší metodu
        const textArea = document.createElement("textarea");
        textArea.value = emailHtml;
        document.body.appendChild(textArea);
        textArea.select();
 
        if (document.execCommand("copy")) {
          document.body.removeChild(textArea);
 
          const subject = encodeURIComponent(
            `Cenová nabídka - ${projectName || "HOTJET tepelné čerpadlo"}`
          );
          const mailtoUrl = `mailto:?subject=${subject}`;
          window.open(mailtoUrl, "_blank");
 
          alert(
            `✅ Nabídka byla zkopírována do schránky!\n\n📧 Pokus o otevření email klienta...\n\n💡 Pokud se email neotevřel automaticky:\n1. Otevřete váš email program ručně\n2. Vložte obsah z schránky (Ctrl+V / Cmd+V)`
          );
        } else {
          throw new Error("Kopírování selhalo");
        }
      }
    } catch (error) {
      console.error("Chyba při otevírání email klienta:", error);
 
      // Fallback - otevři nové okno s instrukcemi
      const newWindow = window.open("", "_blank");
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="cs">
        <head>
          <meta charset="UTF-8">
          <title>Nabídka - ${projectName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
            .instructions { background: #f0f8ff; padding: 20px; border: 2px solid #0066cc; margin-bottom: 20px; border-radius: 8px; }
            .copy-btn { background: #0066cc; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; margin: 10px 0; font-size: 16px; }
            .copy-btn:hover { background: #0052a3; }
            .email-btn { background: #28a745; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; margin: 10px 10px 10px 0; font-size: 16px; }
            .email-btn:hover { background: #218838; }
            .steps { background: #fff3cd; padding: 15px; border: 1px solid #ffeaa7; border-radius: 6px; margin: 15px 0; }
            .steps ol { margin: 10px 0; padding-left: 20px; }
            .steps li { margin: 5px 0; }
          </style>
        </head>
        <body>
          <div class="instructions">
            <h2>📧 Generování emailu s nabídkou</h2>
            <div class="steps">
              <h3>📋 Postup:</h3>
              <ol>
                <li>Klikněte na tlačítko <strong>"Kopírovat nabídku"</strong> níže</li>
                <li>Otevřete váš email program (Outlook, Mail, Gmail, atd.)</li>
                <li>Vložte obsah do těla emailu pomocí <strong>Ctrl+V</strong> (Windows) nebo <strong>Cmd+V</strong> (Mac)</li>
                <li>Doplňte příjemce a odešlete</li>
              </ol>
            </div>
            <button class="copy-btn" onclick="copyContent()">📋 Kopírovat nabídku</button>
            <button class="email-btn" onclick="openEmailClient()">📧 Otevřít email klient</button>
          </div>
          <hr>
          <div id="content">
            ${emailHtml}
          </div>
          <script>
            function copyContent() {
              const content = document.getElementById('content').innerHTML;
              navigator.clipboard.writeText(content).then(() => {
                alert('✅ Nabídka byla zkopírována do schránky!\\n\\nNyní můžete vložit do emailu pomocí Ctrl+V / Cmd+V');
              }).catch(() => {
                // Fallback pro starší prohlížeče
                const textArea = document.createElement('textarea');
                textArea.value = content;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('✅ Nabídka byla zkopírována do schránky!\\n\\nNyní můžete vložit do emailu pomocí Ctrl+V / Cmd+V');
              });
            }
            
            function openEmailClient() {
              const subject = encodeURIComponent('Cenová nabídka - ${projectName || "HOTJET tepelné čerpadlo"}');
              const mailtoUrl = 'mailto:?subject=' + subject;
              
              // Zkusíme různé metody otevření
              const mailtoWindow = window.open(mailtoUrl, '_blank');
              
              setTimeout(() => {
                if (!mailtoWindow || mailtoWindow.closed) {
                  try {
                    window.location.href = mailtoUrl;
                  } catch (e) {
                    alert('❌ Nepodařilo se otevřít email klient automaticky.\\n\\n💡 Otevřete váš email program ručně a vložte obsah z schránky.');
                  }
                }
              }, 100);
            }
          </script>
        </body>
        </html>
      `);
      newWindow.document.close();
 
      alert(
        "📋 Nabídka byla otevřena v novém okně.\n\n💡 Použijte tlačítko 'Kopírovat nabídku' a pak vložte do emailu."
      );
    }
  };

  const copyToClipboard = async () => {
    const emailHtml = generateEmailContent();

    try {
      // Moderní Clipboard API s HTML MIME typem
      if (navigator.clipboard && window.ClipboardItem) {
        const blob = new Blob([emailHtml], { type: "text/html" });
        const clipboardItem = new window.ClipboardItem({ "text/html": blob });
        await navigator.clipboard.write([clipboardItem]);
        alert(
          `✅ Profesionální nabídka byla zkopírována do schránky!\n\n📧 Můžete ji nyní vložit přímo do emailu (Ctrl+V / Cmd+V).\n\n💡 Ve většině emailových klientů zachová formátování.`
        );
      } else {
        // Fallback na starší document.execCommand metodu
        const textArea = document.createElement("textarea");
        textArea.value = emailHtml;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        if (document.execCommand("copy")) {
          document.body.removeChild(textArea);
          alert(
            `✅ Nabídka byla zkopírována do schránky!\n\n📧 Můžete ji nyní vložit přímo do emailu (Ctrl+V / Cmd+V).`
          );
        } else {
          throw new Error("Kopírování selhalo");
        }
      }
    } catch (error) {
      console.error("Kopírování selhalo:", error);

      // Fallback - otevři nové okno pro ruční kopírování
      const newWindow = window.open("", "_blank");
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="cs">
        <head>
          <meta charset="UTF-8">
          <title>Nabídka - ${projectName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .instructions { background: #f0f8ff; padding: 15px; border: 1px solid #0066cc; margin-bottom: 20px; border-radius: 5px; }
            .copy-btn { background: #0066cc; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 10px 0; }
            .copy-btn:hover { background: #0052a3; }
          </style>
        </head>
        <body>
          <div class="instructions">
            <h3>📋 Instrukce pro kopírování:</h3>
            <p>1. Klikněte na tlačítko "Kopírovat nabídku" níže</p>
            <p>2. Otevřete váš email klient</p>
            <p>3. Vložte obsah do těla emailu (Ctrl+V / Cmd+V)</p>
          </div>
          <button class="copy-btn" onclick="copyContent()">📋 Kopírovat nabídku</button>
          <hr>
          <div id="content">
            ${emailHtml}
          </div>
          <script>
            function copyContent() {
              const content = document.getElementById('content').innerHTML;
              navigator.clipboard.writeText(content).then(() => {
                alert('✅ Nabídka byla zkopírována do schránky!');
              }).catch(() => {
                // Fallback pro starší prohlížeče
                const textArea = document.createElement('textarea');
                textArea.value = content;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('✅ Nabídka byla zkopírována do schránky!');
              });
            }
          </script>
        </body>
        </html>
      `);
      newWindow.document.close();

      alert(
        "📋 Nabídka byla otevřena v novém okně.\n\n💡 Použijte tlačítko 'Kopírovat nabídku' a pak vložte do emailu."
      );
    }
  };

  const downloadHtml = () => {
    const emailHtml = generateEmailContent();
    const fullHtml = `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <title>Nabídka - ${projectName}</title>
</head>
<body>
  ${emailHtml}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nabidka-${projectName || customerName || "hotjet"}-${
      new Date().toISOString().split("T")[0]
    }.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasItems =
    Object.keys(selectedItems).length > 0 ||
    Object.keys(selectedWork).length > 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        📧 Generování emailu
      </h2>

      {!hasItems ? (
        <div className="text-center py-8 text-gray-500">
          <Mail size={48} className="mx-auto mb-4 text-gray-300" />
          <p>Nejdříve vyberte produkty a práce pro generování nabídky</p>
        </div>
      ) : (
        <div className="space-y-3">
                     {/* Otevření email klienta */}
           <button
             onClick={openEmailClient}
             className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
           >
             <Mail size={20} />
             📧 Zkopírovat a otevřít email
           </button>

          {/* Kopírování do schránky */}
          <button
            onClick={copyToClipboard}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            <Copy size={20} />
            📋 Zkopírovat do schránky
          </button>

          {/* Stažení HTML souboru */}
          <button
            onClick={downloadHtml}
            className="w-full py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
          >
            <Download size={16} />
            💾 Stáhnout jako HTML
          </button>

          {/* Save/Load nabídky */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={saveQuote}
              className="py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Uložit nabídku
            </button>

            <label className="py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <Download size={16} />
              Načíst nabídku
              <input
                type="file"
                accept=".json"
                onChange={loadQuote}
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              💡 Tipy pro email:
            </h4>
            <ul className="text-xs text-blue-700 space-y-1">
                             <li>
                 • <strong>Zkopírovat a otevřít email</strong> - zkopíruje nabídku a pokusí se otevřít email program
               </li>
              <li>
                • <strong>Zkopírovat do schránky</strong> - zkopíruje s
                formátováním pro email
              </li>
              <li>
                • <strong>Stáhnout HTML</strong> - uloží jako soubor pro
                pozdější použití
              </li>
              <li className="text-blue-600 font-medium">
                💡 Všechny metody zachovávají profesionální formátování!
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailGenerator;
