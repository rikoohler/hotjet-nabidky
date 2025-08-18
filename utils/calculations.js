// Výpočetní funkce pro slevy a ceny

export const getDiscount = (customerType) => {
  switch (customerType) {
    case "koncovy":
      return 0.1; // 10% sleva
    case "montazni":
      return 0.37; // 37% sleva
    case "montazniPlus":
      return 0.42; // 42% sleva
    default:
      return 0.1;
  }
};

export const getVatRate = (customerType) => {
  return customerType === "koncovy" ? 0.12 : 0.21;
};

export const calculateTotals = (selectedItems, selectedWork, customerType, customDiscount = 0) => {
  const discount = customDiscount || getDiscount(customerType);
  const vat = getVatRate(customerType);

  let heatPumpTotal = 0;
  let accessoriesTotal = 0;
  let workTotal = 0;

  // Výpočet pro produkty
  Object.entries(selectedItems)
    .filter(([key, val]) => val.quantity > 0)
    .forEach(([key, item]) => {
      const priceAfterDiscount = item.price * (1 - discount);
      const total = priceAfterDiscount * item.quantity;

      // Rozdělení do kategorií podle typu
      const category = key.split("-")[0];
      const heatPumpCategories = ["A", "B", "D", "E", "F", "G", "H"];
      const controlCategories = ["C1", "C2", "J"];

      if (
        heatPumpCategories.includes(category) ||
        controlCategories.includes(category)
      ) {
        heatPumpTotal += total;
      } else {
        accessoriesTotal += total;
      }
    });

  // Výpočet pro práce
  Object.entries(selectedWork)
    .filter(([key, val]) => val.quantity > 0)
    .forEach(([key, item]) => {
      workTotal += item.price * item.quantity;
    });

  const subtotal = heatPumpTotal + accessoriesTotal + workTotal;
  const vatAmount = subtotal * vat;
  const total = subtotal + vatAmount;

  return {
    heatPumpTotal,
    accessoriesTotal,
    workTotal,
    subtotal,
    vatAmount,
    total,
    discount,
    vat,
  };
};

export const formatPrice = (price) => {
  return Math.round(price).toLocaleString("cs-CZ");
};
