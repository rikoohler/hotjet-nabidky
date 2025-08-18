// Utility funkce pro generování email nabídky
import { formatPrice } from './calculations';

export const generateEmailOffer = async ({
  projectName,
  customerName,
  offerDate,
  selectedItems,
  selectedWork,
  customerType,
  heatPumpTotal,
  accessoriesTotal,
  workTotal,
  subtotal,
  vatAmount,
  total,
  discount,
  vat,
}) => {
  // Kategorie pro správné rozdělení
  const heatPumpCategories = ["A", "B", "D", "E", "F", "G", "H"];
  const controlCategories = ["C1", "C2", "J"];

  // HTML pro email - jednodušší styling který funguje v emailových klientech
  let emailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
  <h1 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">CENOVÁ NABÍDKA</h1>
  
  <div style="margin: 20px 0;">
    <p><strong>Akce:</strong> ${projectName}</p>
    <p><strong>Zákazník:</strong> ${customerName}</p>
    <p><strong>Datum vystavení:</strong> ${new Date(offerDate).toLocaleDateString("cs-CZ")}</p>
    <p><strong>Platnost nabídky:</strong> 30 dní</p>
  </div>
  
  <hr style="border: 1px solid #ddd;">
`;

  // Zpracování tepelných čerpadel a příslušenství
  [...heatPumpCategories, ...controlCategories].forEach((cat) => {
    const items = Object.entries(selectedItems).filter(
      ([key, val]) => key.startsWith(cat + "-") && val.quantity > 0
    );

    if (items.length > 0) {
      emailHtml += `
        <div style="margin: 30px 0;">
          <h2 style="color: #333; background: #f5f5f5; padding: 10px;">${cat}. {názevKategorie}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f0f0f0;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Kód</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Popis</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Cena po slevě</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Ks</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Celkem</th>
            </tr>`;

      items.forEach(([key, item]) => {
        const priceAfterDiscount = item.price * (1 - discount);
        const itemTotal = priceAfterDiscount * item.quantity;

        emailHtml += `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.code}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${formatPrice(priceAfterDiscount)} Kč</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>${formatPrice(itemTotal)} Kč</strong></td>
          </tr>`;
      });

      emailHtml += `</table></div>`;
    }
  });

  // Příslušenství
  const accessoryCategories = ["M", "N", "O", "P", "Q", "R", "S", "T", "Z"];
  accessoryCategories.forEach((cat) => {
    const items = Object.entries(selectedItems).filter(
      ([key, val]) => key.startsWith(cat + "-") && val.quantity > 0
    );

    if (items.length > 0) {
      emailHtml += `
        <div style="margin: 30px 0;">
          <h2 style="color: #333; background: #f5f5f5; padding: 10px;">${cat}. {názevKategorie}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f0f0f0;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Kód</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Popis</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Cena po slevě</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Ks</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Celkem</th>
            </tr>`;

      items.forEach(([key, item]) => {
        const priceAfterDiscount = item.price * (1 - discount);
        const itemTotal = priceAfterDiscount * item.quantity;

        emailHtml += `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.code}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${formatPrice(priceAfterDiscount)} Kč</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>${formatPrice(itemTotal)} Kč</strong></td>
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
            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Cena za jednotku</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Počet</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Celkem</th>
          </tr>`;

    workItems.forEach(([key, item]) => {
      const itemTotal = item.price * item.quantity;

      emailHtml += `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${formatPrice(item.price)} Kč</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"><strong>${formatPrice(itemTotal)} Kč</strong></td>
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
          <td style="padding: 8px; text-align: right; font-weight: bold;">${formatPrice(heatPumpTotal)} Kč</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Příslušenství</td>
          <td style="padding: 8px; text-align: right; font-weight: bold;">${formatPrice(accessoriesTotal)} Kč</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Práce a instalační materiál</td>
          <td style="padding: 8px; text-align: right; font-weight: bold;">${formatPrice(workTotal)} Kč</td>
        </tr>
        <tr style="border-top: 2px solid #333;">
          <td style="padding: 8px; font-weight: bold;">Mezisoučet</td>
          <td style="padding: 8px; text-align: right; font-weight: bold;">${formatPrice(subtotal)} Kč</td>
        </tr>
        <tr>
          <td style="padding: 8px;">DPH ${(vat * 100).toFixed(0)}%</td>
          <td style="padding: 8px; text-align: right;">${formatPrice(vatAmount)} Kč</td>
        </tr>
        <tr style="background: #667eea; color: white;">
          <td style="padding: 12px; font-weight: bold; font-size: 1.2em;">CELKEM K ÚHRADĚ</td>
          <td style="padding: 12px; text-align: right; font-weight: bold; font-size: 1.2em;">${formatPrice(total)} Kč</td>
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

// Funkce pro kopírování HTML do schránky
export const copyHtmlToClipboard = async (html) => {
  try {
    // Moderní způsob - Clipboard API s HTML
    if (navigator.clipboard && window.ClipboardItem) {
      const blob = new Blob([html], { type: 'text/html' });
      const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([clipboardItem]);
      return true;
    }
  } catch (err) {
    console.log('Moderní clipboard API selhalo, zkouším alternativu...', err);
  }

  // Alternativa - vytvoření dočasného elementu
  try {
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'fixed';
    tempDiv.style.pointerEvents = 'none';
    tempDiv.style.opacity = '0';
    tempDiv.innerHTML = html;
    document.body.appendChild(tempDiv);

    const range = document.createRange();
    range.selectNodeContents(tempDiv);
    
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    document.execCommand('copy');
    selection.removeAllRanges();
    document.body.removeChild(tempDiv);
    
    return true;
  } catch (err) {
    console.error('Kopírování selhalo:', err);
    return false;
  }
};
