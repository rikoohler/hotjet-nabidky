"use client";

import React, { useState } from "react";
import { Calculator, Edit } from "lucide-react";

// Import komponent
import BasicInfoForm from "../components/BasicInfoForm";
import CategoryNavigation from "../components/CategoryNavigation";
import WorkSelection from "../components/WorkSelection";
import SelectedItemsList from "../components/SelectedItemsList";
import ActionPanel from "../components/ActionPanel";

// Import dat a utilit
import { defaultPriceList } from "../data/priceList";
import { defaultWorkPrices } from "../data/workPrices";
import { calculateTotals } from "../utils/calculations";
import {
  saveQuoteToFile,
  loadQuoteFromFile,
  createQuoteData,
} from "../utils/fileOperations";

function App() {
  // State pro základní údaje
  const [activeTab, setActiveTab] = useState("generator");
  const [projectName, setProjectName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerType, setCustomerType] = useState("koncovy");
  const [offerDate, setOfferDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // State pro výběry
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedWork, setSelectedWork] = useState({});
  const [heatPumpType, setHeatPumpType] = useState("vzduch");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // State pro data
  const [priceList] = useState(defaultPriceList);
  const [workPrices] = useState(defaultWorkPrices);

  // Generování kompletní HTML nabídky
  const generateOffer = async () => {
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

    // Kopírování do schránky
    try {
      // Moderní způsob - Clipboard API s HTML
      if (navigator.clipboard && window.ClipboardItem) {
        const blob = new Blob([emailHtml], { type: "text/html" });
        const clipboardItem = new window.ClipboardItem({ "text/html": blob });
        await navigator.clipboard.write([clipboardItem]);
        alert(
          `✅ Profesionální nabídka byla zkopírována do schránky!\n\n📧 Můžete ji nyní vložit přímo do emailu (Ctrl+V / Cmd+V).\n\n💡 Tip: Ve většině emailových klientů zachová formátování.`
        );
      } else {
        // Fallback - plain text
        await navigator.clipboard.writeText(emailHtml);
        alert(
          "📋 Nabídka byla zkopírována jako HTML text.\n\nPoužijte Ctrl+V pro vložení do emailu."
        );
      }
    } catch (error) {
      console.error("Kopírování selhalo:", error);
      // Fallback - otevři nové okno
      const newWindow = window.open("", "_blank");
      newWindow.document.write(emailHtml);
      newWindow.document.close();
      alert(
        "📋 Nabídka byla otevřena v novém okně.\n\nPoužijte Ctrl+A pro označení všeho a Ctrl+C pro zkopírování."
      );
    }

    // Možnost stažení jako HTML soubor
    setTimeout(() => {
      if (confirm("💾 Chcete také stáhnout nabídku jako HTML soubor?")) {
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
      }
    }, 1000);
  };

  // Funkce pro správu položek
  const toggleItem = (category, code) => {
    const key = `${category}-${code}`;
    const product = priceList[category].items.find((p) => p.code === code);

    setSelectedItems((prev) => {
      if (prev[key] && prev[key].quantity > 0) {
        const newItems = { ...prev };
        delete newItems[key];
        return newItems;
      } else {
        return { ...prev, [key]: { ...product, quantity: 1 } };
      }
    });
  };

  const removeItem = (key) => {
    setSelectedItems((prev) => {
      const newItems = { ...prev };
      delete newItems[key];
      return newItems;
    });
  };

  const removeWork = (key) => {
    setSelectedWork((prev) => {
      const newItems = { ...prev };
      delete newItems[key];
      return newItems;
    });
  };

  const updateQuantity = (category, code, quantity) => {
    const key = `${category}-${code}`;
    const product = priceList[category].items.find((p) => p.code === code);
    const newQuantity = parseInt(quantity) || 0;

    setSelectedItems((prev) => {
      if (newQuantity === 0) {
        const newItems = { ...prev };
        delete newItems[key];
        return newItems;
      } else {
        return { ...prev, [key]: { ...product, quantity: newQuantity } };
      }
    });
  };

  const toggleWork = (index) => {
    const workList =
      heatPumpType === "zeme" ? workPrices.zemeVoda : workPrices.vzduchVoda;
    const work = workList[index];
    const key = `work-${index}`;

    setSelectedWork((prev) => {
      if (prev[key] && prev[key].quantity > 0) {
        const newItems = { ...prev };
        delete newItems[key];
        return newItems;
      } else {
        return {
          ...prev,
          [key]: { name: work.name, price: work.price, quantity: 1 },
        };
      }
    });
  };

  const updateWorkQuantity = (index, quantity) => {
    const workList =
      heatPumpType === "zeme" ? workPrices.zemeVoda : workPrices.vzduchVoda;
    const work = workList[index];
    const key = `work-${index}`;
    const newQuantity = parseInt(quantity) || 0;

    setSelectedWork((prev) => {
      const currentPrice = prev[key]?.price || work.price;

      if (newQuantity === 0) {
        const newItems = { ...prev };
        delete newItems[key];
        return newItems;
      } else {
        return {
          ...prev,
          [key]: {
            name: work.name,
            price: currentPrice,
            quantity: newQuantity,
          },
        };
      }
    });
  };

  const updateWorkPrice = (index, newPrice) => {
    const key = `work-${index}`;
    setSelectedWork((prev) => {
      if (prev[key]) {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            price: newPrice === "" ? "" : newPrice,
          },
        };
      }
      return prev;
    });
  };

  const saveQuote = () => {
    const quoteData = createQuoteData({
      projectName,
      customerName,
      customerType,
      offerDate,
      selectedItems,
      selectedWork,
      heatPumpType,
    });
    saveQuoteToFile(quoteData, projectName, customerName);
  };

  const loadQuote = (event) => {
    const file = event.target.files[0];
    loadQuoteFromFile(file, (quoteData) => {
      if (quoteData.projectName !== undefined)
        setProjectName(quoteData.projectName);
      if (quoteData.customerName !== undefined)
        setCustomerName(quoteData.customerName);
      if (quoteData.customerType !== undefined)
        setCustomerType(quoteData.customerType);
      if (quoteData.offerDate !== undefined) setOfferDate(quoteData.offerDate);
      if (quoteData.selectedItems !== undefined)
        setSelectedItems(quoteData.selectedItems);
      if (quoteData.selectedWork !== undefined)
        setSelectedWork(quoteData.selectedWork);
      if (quoteData.heatPumpType !== undefined)
        setHeatPumpType(quoteData.heatPumpType);
    });
    event.target.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              HOTJET - Generátor nabídek
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("generator")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "generator"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Calculator className="inline mr-2" size={16} />
                Generátor
              </button>
              <button
                onClick={() => setActiveTab("editor")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "editor"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Edit className="inline mr-2" size={16} />
                Editor dat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "generator" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <BasicInfoForm
                projectName={projectName}
                setProjectName={setProjectName}
                customerName={customerName}
                setCustomerName={setCustomerName}
                offerDate={offerDate}
                setOfferDate={setOfferDate}
                customerType={customerType}
                setCustomerType={setCustomerType}
                heatPumpType={heatPumpType}
                setHeatPumpType={setHeatPumpType}
                setSelectedCategory={setSelectedCategory}
                setSelectedSubcategory={setSelectedSubcategory}
              />

              <CategoryNavigation
                heatPumpType={heatPumpType}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedSubcategory={selectedSubcategory}
                setSelectedSubcategory={setSelectedSubcategory}
                selectedItems={selectedItems}
                priceList={priceList}
                toggleItem={toggleItem}
                updateQuantity={updateQuantity}
              />
            </div>

            <div className="space-y-6">
              <WorkSelection
                heatPumpType={heatPumpType}
                workPrices={workPrices}
                selectedWork={selectedWork}
                toggleWork={toggleWork}
                updateWorkQuantity={updateWorkQuantity}
                updateWorkPrice={updateWorkPrice}
              />

              <ActionPanel
                generateOffer={generateOffer}
                saveQuote={saveQuote}
                loadQuote={loadQuote}
              />

              <SelectedItemsList
                selectedItems={selectedItems}
                selectedWork={selectedWork}
                customerType={customerType}
                removeItem={removeItem}
                removeWork={removeWork}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700">Editor dat</h3>
            <p className="text-sm text-gray-600 mt-2">
              Data jsou nyní v samostatných modulech v /data/ složce.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return <App />;
}
