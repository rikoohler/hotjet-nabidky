// Komponenta pro panel akcí (generování nabídky, save/load)
import React from "react";
import { FileText, Save, Upload } from "lucide-react";

const ActionPanel = ({ generateOffer, saveQuote, loadQuote }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        Akce
      </h2>

      <div className="space-y-3">
        {/* Generování nabídky */}
        <button
          onClick={generateOffer}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <FileText size={20} />
          Vygenerovat profesionální nabídku
        </button>

        {/* Save/Load nabídky */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={saveQuote}
            className="py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center justify-center gap-2"
          >
            <Save size={16} />
            Uložit nabídku
          </button>

          <label className="py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Upload size={16} />
            Načíst nabídku
            <input
              type="file"
              accept=".json"
              onChange={loadQuote}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;
