// Komponenta pro stromovou navigaci kategorií
import React from "react";
import { formatPrice } from "../utils/calculations";
import { ChevronRight, ArrowLeft } from "lucide-react";

// Komponenta pro zobrazení prací v rámci CategoryNavigation
const WorkComponent = ({
  heatPumpType,
  selectedWork,
  toggleWork,
  updateWorkQuantity,
  updateWorkPrice,
  workPrices,
}) => {
  const workItems =
    heatPumpType === "zeme" ? workPrices.zemeVoda : workPrices.vzduchVoda;

  return (
    <div className="border-b pb-4">
      <h4 className="font-semibold text-gray-700 mb-3 bg-gray-50 p-2 rounded">
        Práce a instalační materiál
      </h4>
      <div className="space-y-2">
        {workItems.map((work, index) => {
          const key = `work-${index}`;
          const isSelected = selectedWork[key]?.quantity > 0;
          return (
            <div key={index} className="flex items-center gap-3 pl-4">
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
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            updateWorkPrice(index, "");
                          } else {
                            updateWorkPrice(index, parseInt(value) || 0);
                          }
                        }}
                        onBlur={(e) => {
                          if (e.target.value === "") {
                            updateWorkPrice(index, work.price);
                          }
                        }}
                        className="w-20 px-1 py-0.5 border rounded text-xs text-gray-900"
                      />
                      <span>Kč</span>
                    </>
                  ) : (
                    <span>{formatPrice(work.price)} Kč</span>
                  )}
                </div>
              </div>
              {isSelected && (
                <input
                  type="number"
                  min="0"
                  value={selectedWork[key]?.quantity || 0}
                  onChange={(e) => updateWorkQuantity(index, e.target.value)}
                  className="w-16 px-2 py-1 border rounded text-gray-900"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CategoryNavigation = ({
  heatPumpType,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  selectedItems,
  priceList,
  toggleItem,
  updateQuantity,
  // Nové props pro práce
  selectedWork,
  toggleWork,
  updateWorkQuantity,
  updateWorkPrice,
  workPrices,
}) => {
  // Nová struktura kategorií podle typu TČ
  const getCategoryStructure = () => {
    if (heatPumpType === "vzduch") {
      return {
        heatPumps: {
          name: "Tepelná čerpadla vzduch-voda",
          subcategories: {
            basic: { name: "Základní série", categories: ["A", "B", "D", "E"] },
            highTemp: { name: "Vysokoteplotní", categories: ["H"] },
          },
        },
        controllers: {
          name: "Rozvaděče a hydromoduly",
          subcategories: {
            basic: { name: "Pro základní série", categories: ["C1", "C2"] },
            highTemp: { name: "Pro vysokoteplotní", categories: ["J"] },
          },
        },
        accessories: {
          name: "Příslušenství",
          subcategories: {
            all: {
              name: "Vše",
              categories: ["M", "N", "O", "P", "Q", "R", "S", "T", "Z"],
            },
          },
        },
        work: {
          name: "Práce a instalační materiál",
          subcategories: {
            installation: {
              name: "Instalační práce",
              categories: ["WORK"],
            },
          },
        },
      };
    } else {
      return {
        heatPumps: {
          name: "Tepelná čerpadla země/voda-voda",
          subcategories: {
            water: { name: "Voda-voda", categories: ["F"] },
            ground: { name: "Země-voda", categories: ["G"] },
          },
        },
        accessories: {
          name: "Příslušenství",
          subcategories: {
            all: {
              name: "Vše",
              categories: ["M", "N", "O", "P", "Q", "R", "S", "T", "Z"],
            },
          },
        },
        work: {
          name: "Práce a instalační materiál",
          subcategories: {
            installation: {
              name: "Instalační práce",
              categories: ["WORK"],
            },
          },
        },
      };
    }
  };

  // Získání kategorií pro aktuální výběr
  const getDisplayCategories = () => {
    const structure = getCategoryStructure();

    if (!selectedCategory) {
      return [];
    }

    if (!selectedSubcategory) {
      return [];
    }

    const category = structure[selectedCategory];
    if (!category) return [];

    const subcategory = category.subcategories[selectedSubcategory];
    if (!subcategory) return [];

    return subcategory.categories;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-800">
          Výběr položek -{" "}
          {heatPumpType === "vzduch" ? "Vzduch-voda" : "Země/Voda-voda"}
        </h2>
        {selectedSubcategory && (
          <button
            onClick={() => {
              setSelectedSubcategory("");
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm"
          >
            <ArrowLeft size={16} />
            Zpět na kategorie
          </button>
        )}
        {selectedCategory && !selectedSubcategory && (
          <button
            onClick={() => {
              setSelectedCategory("");
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm"
          >
            <ArrowLeft size={16} />
            Zpět na začátek
          </button>
        )}
      </div>

      {/* Rychlý přehled vybraných položek */}
      {Object.keys(selectedItems).length > 0 && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 mb-2">
            ✓ Vybrané položky (
            {
              Object.values(selectedItems).filter((item) => item.quantity > 0)
                .length
            }
            ):
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedItems)
              .filter(([key, item]) => item.quantity > 0)
              .slice(0, 6)
              .map(([key, item]) => (
                <span
                  key={key}
                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                >
                  {item.code} ({item.quantity}x)
                </span>
              ))}
            {Object.values(selectedItems).filter((item) => item.quantity > 0)
              .length > 6 && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                +
                {Object.values(selectedItems).filter(
                  (item) => item.quantity > 0
                ).length - 6}{" "}
                dalších...
              </span>
            )}
          </div>
        </div>
      )}

      {/* Navigační kroky */}
      <div className="mb-6">
        {/* Krok 1: Výběr hlavní kategorie */}
        {!selectedCategory && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">1. Vyberte kategorii:</h3>
            <div className="grid gap-3">
              {Object.entries(getCategoryStructure()).map(
                ([categoryKey, categoryData]) => (
                  <button
                    key={categoryKey}
                    onClick={() => setSelectedCategory(categoryKey)}
                    className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="font-medium text-gray-800">
                      {categoryData.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {Object.keys(categoryData.subcategories).length} skupin
                      dostupných
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Krok 2: Výběr podkategorie */}
        {selectedCategory && !selectedSubcategory && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                ← Zpět
              </button>
              <h3 className="font-medium text-gray-700">
                2. Vyberte skupinu v kategorii "
                {getCategoryStructure()[selectedCategory]?.name}":
              </h3>
            </div>
            <div className="grid gap-3">
              {Object.entries(
                getCategoryStructure()[selectedCategory]?.subcategories || {}
              ).map(([subKey, subData]) => (
                <button
                  key={subKey}
                  onClick={() => setSelectedSubcategory(subKey)}
                  className="text-left p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="font-medium text-gray-800">
                    {subData.name}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {subData.categories.length} kategorií dostupných
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Krok 3: Zobrazení produktů */}
        {selectedCategory && selectedSubcategory && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setSelectedSubcategory(null)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                ← Zpět
              </button>
              <h3 className="font-medium text-gray-700">
                3. Produkty v skupině "
                {
                  getCategoryStructure()[selectedCategory]?.subcategories[
                    selectedSubcategory
                  ]?.name
                }
                ":
              </h3>
            </div>

            <div className="space-y-6">
              {getDisplayCategories().map((category) => {
                // Speciální handling pro kategorii WORK (práce a materiál)
                if (category === "WORK") {
                  return (
                    <WorkComponent
                      key={category}
                      heatPumpType={heatPumpType}
                      selectedWork={selectedWork}
                      toggleWork={toggleWork}
                      updateWorkQuantity={updateWorkQuantity}
                      updateWorkPrice={updateWorkPrice}
                      workPrices={workPrices}
                    />
                  );
                }

                return (
                  <div key={category} className="border-b pb-4">
                    <h4 className="font-semibold text-gray-700 mb-3 bg-gray-50 p-2 rounded">
                      {category}. {priceList[category]?.name}
                    </h4>

                    {/* Popis kategorie - skrytý v UI, zachován pro tisk/export */}
                    {false && priceList[category]?.description && (
                      <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-200 rounded-r">
                        <div className="text-sm text-gray-700 whitespace-pre-line">
                          {priceList[category].description
                            .split("\n")
                            .map((line, index) => (
                              <div key={index} className="mb-1">
                                {line}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      {priceList[category]?.items.map((item) => {
                        const key = `${category}-${item.code}`;
                        const isSelected = selectedItems[key]?.quantity > 0;
                        return (
                          <div
                            key={item.code}
                            className="flex items-center gap-3 pl-4"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleItem(category, item.code)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <div className="flex-1">
                              <div className="text-sm">{item.name}</div>
                              <div className="text-xs text-gray-500">
                                {item.code} - {formatPrice(item.price)} Kč
                              </div>
                            </div>
                            {isSelected && (
                              <input
                                type="number"
                                min="0"
                                value={selectedItems[key]?.quantity || 0}
                                onChange={(e) =>
                                  updateQuantity(
                                    category,
                                    item.code,
                                    e.target.value
                                  )
                                }
                                className="w-16 px-2 py-1 border rounded text-gray-900"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryNavigation;
