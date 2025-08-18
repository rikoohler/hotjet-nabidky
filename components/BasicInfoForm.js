// Komponenta pro základní údaje o nabídce
import React from 'react';

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
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
        Základní údaje
      </h2>
      <div className="space-y-3">
        {/* První řádek - Název akce napříč */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Název akce
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            placeholder="např. Rodinný dům Novákovi"
          />
        </div>
        
        {/* Druhý řádek - Zákazník a datum v jednom řádku */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Zákazník
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              placeholder="např. Jan Novák"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Datum
            </label>
            <input
              type="date"
              value={offerDate}
              onChange={(e) => setOfferDate(e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Třetí řádek - Typ zákazníka */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Typ zákazníka
          </label>
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setCustomerType("koncovy")}
              className={`py-1.5 px-2 rounded text-xs border transition-all ${
                customerType === "koncovy"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              Koncový
              <div className="text-xs mt-0.5">10%</div>
            </button>
            <button
              onClick={() => setCustomerType("montazni")}
              className={`py-1.5 px-2 rounded text-xs border transition-all ${
                customerType === "montazni"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              Montážní
              <div className="text-xs mt-0.5">37%</div>
            </button>
            <button
              onClick={() => setCustomerType("montazniPlus")}
              className={`py-1.5 px-2 rounded text-xs border transition-all ${
                customerType === "montazniPlus"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              Montážní+
              <div className="text-xs mt-0.5">42%</div>
            </button>
          </div>
        </div>
        
        {/* Čtvrtý řádek - Typ TČ */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Typ tepelného čerpadla
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setHeatPumpType("vzduch");
                setSelectedCategory(null);
                setSelectedSubcategory(null);
              }}
              className={`py-1.5 px-2 rounded text-sm border transition-all ${
                heatPumpType === "vzduch"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              Vzduch-voda
            </button>
            <button
              onClick={() => {
                setHeatPumpType("zeme");
                setSelectedCategory(null);
                setSelectedSubcategory(null);
              }}
              className={`py-1.5 px-2 rounded text-sm border transition-all ${
                heatPumpType === "zeme"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              Země/Voda-voda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
