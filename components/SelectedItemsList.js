// Komponenta pro přehled vybraných položek
import React from 'react';
import { formatPrice, getDiscount } from '../utils/calculations';

const SelectedItemsList = ({
  selectedItems,
  selectedWork,
  customerType,
  removeItem,
  removeWork,
}) => {
  const discount = getDiscount(customerType);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        Přehled vybraných položek
      </h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {Object.entries(selectedItems)
          .filter(([key, val]) => val.quantity > 0)
          .map(([key, item]) => {
            const priceAfterDiscount = item.price * (1 - discount);
            return (
              <div
                key={key}
                className="flex items-center justify-between text-sm py-2 border-b hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">
                    {item.code}
                  </div>
                </div>
                <div className="text-right mr-2">
                  <div>
                    {item.quantity}x{" "}
                    {formatPrice(priceAfterDiscount)} Kč
                  </div>
                  <div className="font-semibold">
                    {formatPrice(priceAfterDiscount * item.quantity)} Kč
                  </div>
                </div>
                <button
                  onClick={() => removeItem(key)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                  title="Smazat položku"
                >
                  ✕
                </button>
              </div>
            );
          })}
        {Object.entries(selectedWork)
          .filter(([key, val]) => val.quantity > 0)
          .map(([key, item]) => (
            <div
              key={key}
              className="flex items-center justify-between text-sm py-2 border-b hover:bg-gray-50"
            >
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">Práce</div>
              </div>
              <div className="text-right mr-2">
                <div>
                  {item.quantity}x{" "}
                  {formatPrice(item.price)} Kč
                </div>
                <div className="font-semibold">
                  {formatPrice(item.price * item.quantity)} Kč
                </div>
              </div>
              <button
                onClick={() => removeWork(key)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                title="Smazat práci"
              >
                ✕
              </button>
            </div>
          ))}
      </div>
      
      {/* Součet bez DPH */}
      {(Object.keys(selectedItems).length > 0 ||
        Object.keys(selectedWork).length > 0) && (
        <div className="mt-4 pt-4 border-t">
          <div className="text-right space-y-1">
            <div className="text-sm text-gray-600">
              Celkem bez DPH:{" "}
              <span className="font-semibold">
                {formatPrice(
                  Object.entries(selectedItems)
                    .filter(([key, val]) => val.quantity > 0)
                    .reduce((sum, [key, item]) => {
                      const priceAfterDiscount = item.price * (1 - discount);
                      return sum + priceAfterDiscount * item.quantity;
                    }, 0) +
                    Object.entries(selectedWork)
                      .filter(([key, val]) => val.quantity > 0)
                      .reduce(
                        (sum, [key, item]) =>
                          sum + item.price * item.quantity,
                        0
                      )
                )}{" "}
                Kč
              </span>
            </div>
            <div className="text-xs text-gray-500">
              DPH {customerType === "koncovy" ? "12%" : "21%"} se
              přidá při generování nabídky
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedItemsList;
