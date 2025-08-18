// Komponenta pro základní údaje o nabídce
import React, { useState } from "react";
import { User, Calendar, Building, Thermometer } from "lucide-react";

const BasicInfoForm = ({
  projectName,
  setProjectName,
  customerName,
  setCustomerName,
  offerDate,
  setOfferDate,
  customerType,
  setCustomerType,
  heatPumpType,
  setHeatPumpType,
  setSelectedCategory,
  setSelectedSubcategory,
  discount,
  setDiscount,
}) => {
  const [showInstallationDiscount, setShowInstallationDiscount] =
    useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");

  const handlePinSubmit = () => {
    if (pin === "12434") {
      setShowInstallationDiscount(true);
      setPinError("");
      setPin("");
    } else {
      setPinError("Nesprávný PIN");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        📋 Základní údaje
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Název akce */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Název akce
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="Např. Rekonstrukce RD"
          />
        </div>

        {/* Zákazník */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Zákazník
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="Jméno a příjmení"
          />
        </div>

        {/* Datum nabídky */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Datum vystavení
          </label>
          <input
            type="date"
            value={offerDate}
            onChange={(e) => setOfferDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>

        {/* Typ zákazníka */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Typ zákazníka
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setCustomerType("customer")}
              className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                customerType === "customer"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <User size={16} />
              Zákazník
            </button>
            <button
              onClick={() => setCustomerType("installation")}
              className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                customerType === "installation"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Building size={16} />
              Montážní firma
            </button>
          </div>
        </div>

        {/* Typ tepelného čerpadla */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Typ tepelného čerpadla
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setHeatPumpType("vzduch");
                setSelectedCategory("");
                setSelectedSubcategory("");
              }}
              className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                heatPumpType === "vzduch"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Thermometer size={16} />
              Vzduch-voda
            </button>
            <button
              onClick={() => {
                setHeatPumpType("zeme");
                setSelectedCategory("");
                setSelectedSubcategory("");
              }}
              className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                heatPumpType === "zeme"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Thermometer size={16} />
              Země/voda-voda
            </button>
          </div>
        </div>
      </div>

      {/* Sleva pro zákazníky */}
      {customerType === "customer" && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 mb-3">
            🎯 Sleva pro zákazníka
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setDiscount(0.1)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                discount === 0.1
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-blue-300 text-blue-700 hover:bg-blue-50"
              }`}
            >
              10%
            </button>
            <button
              onClick={() => setDiscount(0.15)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                discount === 0.15
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-blue-300 text-blue-700 hover:bg-blue-50"
              }`}
            >
              15%
            </button>
            <button
              onClick={() => setDiscount(0.2)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                discount === 0.2
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-blue-300 text-blue-700 hover:bg-blue-50"
              }`}
            >
              20%
            </button>
            <button
              onClick={() => setDiscount(0)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                discount === 0
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-blue-300 text-blue-700 hover:bg-blue-50"
              }`}
            >
              Bez slevy
            </button>
          </div>
          {discount > 0 && (
            <p className="text-sm text-blue-600 mt-2">
              ✅ Aktivní sleva: {(discount * 100).toFixed(0)}%
            </p>
          )}
        </div>
      )}

      {/* PIN pro montážní firmy */}
      {customerType === "installation" && !showInstallationDiscount && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h3 className="text-lg font-medium text-orange-800 mb-3">
            🔒 Montážní firma - přístup k slevám
          </h3>
          <div className="flex gap-2">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Zadejte PIN"
              className="flex-1 px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
              onKeyPress={(e) => e.key === "Enter" && handlePinSubmit()}
            />
            <button
              onClick={handlePinSubmit}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all"
            >
              Odeslat
            </button>
          </div>
          {pinError && <p className="text-sm text-red-600 mt-2">{pinError}</p>}
        </div>
      )}

      {/* Sleva pro montážní firmy (po zadání PIN) */}
      {customerType === "installation" && showInstallationDiscount && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-medium text-green-800 mb-3">
            🎯 Sleva pro montážní firmu
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setDiscount(0.1)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                discount === 0.1
                  ? "bg-green-600 text-white"
                  : "bg-white border border-green-300 text-green-700 hover:bg-green-50"
              }`}
            >
              10%
            </button>
            <button
              onClick={() => setDiscount(0.15)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                discount === 0.15
                  ? "bg-green-600 text-white"
                  : "bg-white border border-green-300 text-green-700 hover:bg-green-50"
              }`}
            >
              15%
            </button>
            <button
              onClick={() => setDiscount(0.2)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                discount === 0.2
                  ? "bg-green-600 text-white"
                  : "bg-white border border-green-300 text-green-700 hover:bg-green-50"
              }`}
            >
              20%
            </button>
            <button
              onClick={() => setDiscount(0)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                discount === 0
                  ? "bg-green-600 text-white"
                  : "bg-white border border-green-300 text-green-700 hover:bg-green-50"
              }`}
            >
              Bez slevy
            </button>
          </div>
          {discount > 0 && (
            <p className="text-sm text-green-600 mt-2">
              ✅ Aktivní sleva: {(discount * 100).toFixed(0)}%
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BasicInfoForm;
