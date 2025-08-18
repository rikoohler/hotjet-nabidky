// Komponenta pro výběr prací a instalačního materiálu
import React from 'react';
import { formatPrice } from '../utils/calculations';

const WorkSelection = ({
  heatPumpType,
  workPrices,
  selectedWork,
  toggleWork,
  updateWorkQuantity,
  updateWorkPrice,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        Práce a instalační materiál
      </h2>
      <div className="space-y-2">
        {(heatPumpType === "zeme"
          ? workPrices.zemeVoda
          : workPrices.vzduchVoda
        ).map((work, index) => {
          const key = `work-${index}`;
          const isSelected = selectedWork[key]?.quantity > 0;
          return (
            <div key={index} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleWork(index)}
                className="w-4 h-4 text-blue-600"
              />
              <div className="flex-1">
                <div className="text-sm">{work.name}</div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  {isSelected ? (
                    <>
                      <input
                        type="number"
                        min="0"
                        value={selectedWork[key]?.price || work.price}
                        onChange={(e) =>
                          updateWorkPrice(
                            index,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-20 px-1 py-0.5 border rounded text-xs"
                      />
                      <span>Kč</span>
                    </>
                  ) : (
                    <span>
                      {formatPrice(work.price)} Kč
                    </span>
                  )}
                </div>
              </div>
              {isSelected && (
                <div className="flex items-center gap-2">
                  <span className="text-xs">Ks:</span>
                  <input
                    type="number"
                    min="0"
                    value={selectedWork[key]?.quantity || 0}
                    onChange={(e) =>
                      updateWorkQuantity(index, e.target.value)
                    }
                    className="w-16 px-2 py-1 border rounded text-xs"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkSelection;
