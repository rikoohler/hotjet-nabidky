// Utility funkce pro save/load nabídek

export const saveQuoteToFile = (quoteData, projectName, customerName) => {
  const blob = new Blob([JSON.stringify(quoteData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hotjet-nabidka-${projectName || customerName || "nova"}-${
    new Date().toISOString().split("T")[0]
  }.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const loadQuoteFromFile = (file, callback) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const quoteData = JSON.parse(e.target.result);
        callback(quoteData);
        alert("Nabídka byla úspěšně načtena!");
      } catch (error) {
        alert("Chyba při načítání nabídky: " + error.message);
      }
    };
    reader.readAsText(file);
  }
};

export const createQuoteData = ({
  projectName,
  customerName,
  customerType,
  offerDate,
  selectedItems,
  selectedWork,
  heatPumpType,
}) => {
  return {
    projectName,
    customerName,
    customerType,
    offerDate,
    selectedItems,
    selectedWork,
    heatPumpType,
    createdAt: new Date().toISOString(),
    version: "1.1",
  };
};
