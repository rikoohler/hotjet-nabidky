"use client";

import React, { useState } from "react";
import { Calculator, Edit } from "lucide-react";

// Import komponent
import BasicInfoForm from "../components/BasicInfoForm";
import CategoryNavigation from "../components/CategoryNavigation";
import WorkSelection from "../components/WorkSelection";
import SelectedItemsList from "../components/SelectedItemsList";
import EmailGenerator from "../components/EmailGenerator";
import PriceListGenerator from "../components/PriceListGenerator";

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
  const [discount, setDiscount] = useState(0);
  const [offerDescription, setOfferDescription] = useState("");

  // State pro data
  const [priceList] = useState(defaultPriceList);
  const [workPrices] = useState(defaultWorkPrices);

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
            <div className="flex items-center gap-4">
              <img
                src="/hotjet-logo.svg"
                alt="HOTJET Logo"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  HOTJET - Generátor nabídek
                </h1>
                <p className="text-sm text-gray-600">
                  Tepelná čerpadla vzduch-voda a země/voda-voda
                </p>
              </div>
            </div>
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
                discount={discount}
                setDiscount={setDiscount}
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

              {/* Pole pro popis nabídky */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  📝 Popis nabídky
                </h3>
                <textarea
                  value={offerDescription}
                  onChange={(e) => setOfferDescription(e.target.value)}
                  placeholder="Zde můžete přidat popis a vysvětlení k nabídce..."
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 resize-y"
                  style={{ minHeight: "100px" }}
                />
                <p className="text-sm text-gray-600 mt-2">
                  💡 Tento text se zobrazí v nabídce pouze pokud není prázdný
                </p>
              </div>

              <PriceListGenerator />

              <EmailGenerator
                projectName={projectName}
                customerName={customerName}
                offerDate={offerDate}
                offerDescription={offerDescription}
                selectedItems={selectedItems}
                selectedWork={selectedWork}
                customerType={customerType}
                priceList={priceList}
                discount={discount}
                saveQuote={saveQuote}
                loadQuote={loadQuote}
              />

              <SelectedItemsList
                selectedItems={selectedItems}
                selectedWork={selectedWork}
                customerType={customerType}
                discount={discount}
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
