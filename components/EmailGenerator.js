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
  discount,
  saveQuote,
  loadQuote,
}) => {
  const generateEmailContent = () => {
    const totals = calculateTotals(selectedItems, selectedWork, customerType, discount);

    // Kategorie pro správné rozdělení
    const heatPumpCategories = ["A", "B", "D", "E", "F", "G", "H"];
    const controlCategories = ["C1", "C2", "J"];

    // HTML pro email
    let emailHtml = `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
  <div style="text-align: right; margin-bottom: 20px;">
    <img src="data:image/svg+xml;base64,${btoa(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="200" height="60" viewBox="0 0 823 229" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
</svg>`)}" alt="HOTJET Logo" style="height: 60px; width: auto;">
  </div>
  
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
              const subject = encodeURIComponent('Cenová nabídka - ${
                projectName || "HOTJET tepelné čerpadlo"
              }');
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
                • <strong>Zkopírovat a otevřít email</strong> - zkopíruje
                nabídku a pokusí se otevřít email program
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
