
}
'use client';

import React, { useState, useEffect } from 'react';
import { Download, Upload, Save, Edit, Trash2, Plus, FileText, Settings, Package, Calculator, Check } from 'lucide-react';

// Výchozí data - struktura ceníku
const defaultPriceList = {
  "A": {
    "name": "Vzduch-voda, venkovní monoblok, R454b",
    "description": "Smart Grid Ready a podpora fotovoltaiky\nHybridizace - funkce v regulaci\nSystém aktivního potlačení hluku\nScroll kompresor Copeland\nBezpečné chladivo R454B",
    "items": [
      { "code": "HJZETXE07", "name": "HOTJET 7ZETXe - topení/chlazení - pro TZ 4-8kW", "price": 160194 },
      { "code": "HJZETXE10", "name": "HOTJET 10ZETXe - topení/chlazení, 400V - pro TZ 5-15kW", "price": 167922 },
      { "code": "HJZETXE15", "name": "HOTJET 15ZETXe - topení/chlazení, 400V - pro TZ 10-20kW", "price": 186104 }
    ]
  },
  "B": {
    "name": "Vzduch-voda, venkovní monoblok, R290 (propan)",
    "description": "Ekologické chladivo R290\nVysoká účinnost\nNízká hlučnost",
    "items": [
      { "code": "HJZETXP07", "name": "HOTJET 7ZETXp - R290 - pro TZ 4-8kW", "price": 163804 },
      { "code": "HJZETXP10", "name": "HOTJET 10ZETXp - R290, 400V - pro TZ 5-15kW", "price": 176575 },
      { "code": "HJZETXP15", "name": "HOTJET 15ZETXp - R290, 400V - pro TZ 10-20kW", "price": 206157 },
      { "code": "HJZETXP20", "name": "HOTJET 20ZETXp - R290, 400V - pro TZ 15-25kW", "price": 234216 }
    ]
  },
  "C1": {
    "name": "ROZVADĚČ",
    "description": "Inteligentní regulátor Siemens\nCelokovový externí rozvaděč\nVenkovní čidlo\nÚsporné oběhové čerpadlo\nWebserver pro ovládání",
    "items": [
      { "code": "RZ107", "name": "Rozvaděč k tepelnému čerpadlu 7ZETXe/p", "price": 21579 },
      { "code": "RZ115", "name": "Rozvaděč k tepelnému čerpadlu 10/15ZETXe/p", "price": 21579 }
    ]
  },
  "C2": {
    "name": "HYDROMODUL",
    "description": "Kompletní rozvaděč s regulátorem\nInterní elektrokotel 7,5kW\n3-cestný ventil\nÚsporné čerpadlo\nWebserver a aplikace",
    "items": [
      { "code": "HMD07", "name": "Hydromodul k tepelnému čerpadlu 7ZETXe/p", "price": 45525 },
      { "code": "HMD115", "name": "Hydromodul k tepelnému čerpadlu 10,15ZETXe/p, 20ZETXp", "price": 45525 }
    ]
  },
  "D": {
    "name": "Vzduch-voda, INTERNÍ monoblok, R454b",
    "description": "Vnitřní instalace\nIntegrovaný rozvaděč\nElektrokotel 7,5kW\n3-cestný ventil",
    "items": [
      { "code": "HJZETXI07", "name": "HOTJET 7ZETXi - topení/chlazení - pro TZ 4-8kW", "price": 209378 },
      { "code": "HJZETXI10", "name": "HOTJET 10ZETXi - topení/chlazení, 400V - pro TZ 5-15kW", "price": 220248 },
      { "code": "HJZETXI15", "name": "HOTJET 15ZETXi - topení/chlazení, 400V - pro TZ 10-20kW", "price": 241430 }
    ]
  },
  "E": {
    "name": "Vzduch-voda, VNITŘNÍ monoblok",
    "description": "Kompaktní řešení\nMontáž na zeď jako plynový kotel",
    "items": [
      { "code": "HJMINI5AI", "name": "Mini 5Ai - TČ k pověšení na zeď do 4kW TZ", "price": 110837 }
    ]
  },
  "F": {
    "name": "Voda-voda tepelná čerpadla",
    "description": "Vysoká účinnost\nAktivní chlazení\nElektrokotel 7,5kW",
    "items": [
      { "code": "HJWX07cx", "name": "HOTJET 7WX voda-voda, aktivní chl., koax. výparník", "price": 166487 },
      { "code": "HJWX10cx", "name": "HOTJET 10WX voda-voda, aktivní chl., koax. výparník", "price": 169286 },
      { "code": "HJWX15cx", "name": "HOTJET 15WX voda-voda, aktivní ch., koax. výparník", "price": 182495 }
    ]
  },
  "G": {
    "name": "Země-voda tepelná čerpadla",
    "description": "Smart Grid Ready\nPasivní i aktivní chlazení\nIntegrovaný elektrokotel 7,5kW\nWebserver a aplikace",
    "items": [
      { "code": "HJWX07", "name": "HOTJET 7WX země-voda, aktivní chlazení", "price": 162058 },
      { "code": "HJWX10", "name": "HOTJET 10WX země-voda, aktivní chlazení", "price": 164857 },
      { "code": "HJWX15", "name": "HOTJET 15WX země-voda, aktivní chlazení", "price": 178066 }
    ]
  },
  "H": {
    "name": "Vzduch-voda, venkovní monoblok, On/Off, 65°C",
    "description": "Vysokoteplotní tepelná čerpadla\nVhodné pro rekonstrukce",
    "items": [
      { "code": "HJONE2H20", "name": "HOTJET 20ONE2", "price": 170620 },
      { "code": "HJONE2H25", "name": "HOTJET 25ONE2", "price": 266934 },
      { "code": "HJONE2H35", "name": "HOTJET 35ONE2", "price": 338890 },
      { "code": "HJONE2H45", "name": "HOTJET 45ONE2", "price": 346507 },
      { "code": "HJONE2H55", "name": "HOTJET 55ONE2", "price": 366816 }
    ]
  },
  "J": {
    "name": "Rozvaděč pro venkovní jednotky ONE2",
    "description": "Rozvaděč s regulací",
    "items": [
      { "code": "RZONE2", "name": "Rozvaděč s regulací pro 25-45 ONE2", "price": 22653 }
    ]
  },
  "M": {
    "name": "Různé příslušenství",
    "description": "",
    "items": [
      { "code": "RQ55.301", "name": "Drátové prostorové čidlo s tlačítkem pro chlazení", "price": 2990 },
      { "code": "RQ58.301", "name": "Bezdrátové prostorové čidlo s tlačítkem pro chlazení", "price": 3360 },
      { "code": "RA71.393", "name": "Bezdrátový přijímač, dosah 30m", "price": 2986 },
      { "code": "RGQZ36526", "name": "Siemens čidlo teploty kabel 6m", "price": 450 },
      { "code": "3CV", "name": "3-cestný rozdělovací ventil 1\" pro boiler, bazén", "price": 2390 },
      { "code": "EKT75", "name": "Elektrokotel trubkový 7,5kW", "price": 7875 },
      { "code": "GPA20-9", "name": "Čerpadlo Hotjet GPA20-9H-130, řízení PWM", "price": 3000 },
      { "code": "GPA25-11", "name": "Čerpadlo Hotjet GPA25-11H-130, řízení PWM", "price": 4110 },
      { "code": "P1ZETXE", "name": "Podstavec pod tepelné čerpadlo + silentbloky", "price": 3600 }
    ]
  },
  "N": {
    "name": "Průtokový ohřev TV",
    "description": "🔵 Dokonalá hygiena a čistota\n⚡ Maximální výkon a efektivita\n🛠️ Praktické benefity",
    "items": [
      { "code": "FW300+", "name": "Průtokový ohřev TV 300l s výkonem 21l/min", "price": 49707 },
      { "code": "FW500+", "name": "Průtokový ohřev TV 500l s výkonem 21l/min", "price": 51284 },
      { "code": "FW800+", "name": "Průtokový ohřev TV 800l s výkonem 21l/min", "price": 62527 },
      { "code": "FW1000+", "name": "Průtokový ohřev TV 1000l s výkonem 21l/min", "price": 66690 }
    ]
  },
  "O": {
    "name": "Kombinované nádrže",
    "description": "",
    "items": [
      { "code": "BOLLY250", "name": "Kombinovaná nádrž pro TV 235l s výměníkem 2,1m2", "price": 54250 },
      { "code": "BOLLY300", "name": "Kombinovaná nádrž pro TV 291l s výměníkem 3,4m2", "price": 57700 },
      { "code": "BOLLY500", "name": "Kombinovaná nádrž pro TV 498l s výměníkem 5,4m2", "price": 77950 }
    ]
  },
  "P": {
    "name": "Boilery s výměníkem",
    "description": "",
    "items": [
      { "code": "B200", "name": "Boiler 200 - objem 167l, výměník 2,4m2", "price": 26000 },
      { "code": "B300", "name": "Boiler 300 - objem 238l, výměník 3,1m2", "price": 31400 },
      { "code": "B500", "name": "Boiler 500 - objem 426l, výměník 4,4m2", "price": 45318 }
    ]
  },
  "Q": {
    "name": "VYROVNÁVACÍ ZÁSOBNÍKY (AKUMULACE)",
    "description": "",
    "items": [
      { "code": "BF60", "name": "Zásobník 60l - výška 609mm, průměr 505mm", "price": 7800 },
      { "code": "BF120", "name": "Zásobník 120l - výška 1000mm, průměr 505mm", "price": 10140 },
      { "code": "BF200", "name": "Zásobník 200l - výška 1369mm, průměr 634mm", "price": 17056 },
      { "code": "BF300", "name": "Zásobník 300l - výška 1405mm, průměr 732mm", "price": 20748 }
    ]
  },
  "R": {
    "name": "FANCOILY",
    "description": "Doplnění nebo náhrada radiátorů pro topení i chlazení",
    "items": [
      { "code": "ACFXVA230", "name": "Nástěnný Fan coil FX-VA 230 DX (40°C, 1270-1630W)", "price": 10820 },
      { "code": "ACFXVA630", "name": "Nástěnný Fan coil FX-VA 630 DX (40°C, 2610-3150W)", "price": 14952 },
      { "code": "ACFXVA1230", "name": "Nástěnný Fan coil FX-VA 1230 DX (40°C, 6390-7220W)", "price": 21100 }
    ]
  },
  "S": {
    "name": "Regulace",
    "description": "",
    "items": [
      { "code": "AVS55.196", "name": "Rozšiřující modul pro RSV21 (4x teplot. čidlo, 3x 0-10V)", "price": 2205 },
      { "code": "AVS55.199", "name": "Rozšiřující modul pro RSV21 (4x teplot. čidlo, EEV)", "price": 2300 },
      { "code": "AVS82.496", "name": "Plochý kabel AVS82.496 pro AVS55 do RVS21", "price": 221 }
    ]
  },
  "T": {
    "name": "OHŘEV POTRUBÍ ODVODU KONDENZÁTU",
    "description": "",
    "items": [
      { "code": "OOK_2", "name": "Ohřev odvodu kondenzátu 2m 80W", "price": 840 },
      { "code": "OOK_3", "name": "Ohřev odvodu kondenzátu 3m 120W", "price": 945 },
      { "code": "OOK_6", "name": "Ohřev odvodu kondenzátu 6m 240W", "price": 1365 },
      { "code": "OOK_9", "name": "Ohřev odvodu kondenzátu 9m 360W", "price": 2310 }
    ]
  },
  "Z": {
    "name": "Záruky",
    "description": "",
    "items": [
      { "code": "W5Y", "name": "Prodloužená záruka na 5 let", "price": 5240 },
      { "code": "W10Y", "name": "Prodloužená záruka na 10 let", "price": 8390 }
    ]
  }
};

const defaultWorkPrices = {
  "zemeVoda": [
    { "name": "Dopojení zemního kolektoru na TČ, plnění, zkoušení", "price": 10000 },
    { "name": "INSTALAČNÍ MATERIÁL topení, voda", "price": 15000 },
    { "name": "INSTALAČNÍ MATERIÁL ELEKTRO - kabeláž", "price": 5000 },
    { "name": "PRÁCE - instalace tepelného čerpadla", "price": 18000 },
    { "name": "KONTROLA INSTALACE A UVEDENÍ DO PROVOZU", "price": 6000 },
    { "name": "DOPRAVA tepelného čerpadla a materiálu", "price": 1500 },
    { "name": "Demontáž a likvidace kotle na tuhá paliva", "price": 5000 },
    { "name": "Zpracování agendy dotací", "price": 4800 }
  ],
  "vzduchVoda": [
    { "name": "Základ pro umístění TČ na terén", "price": 6500 },
    { "name": "INSTALAČNÍ MATERIÁL topení, voda", "price": 15000 },
    { "name": "INSTALAČNÍ MATERIÁL ELEKTRO - kabeláž", "price": 5000 },
    { "name": "PRÁCE - instalace tepelného čerpadla", "price": 17500 },
    { "name": "KONTROLA INSTALACE A UVEDENÍ DO PROVOZU", "price": 6000 },
    { "name": "DOPRAVA tepelného čerpadla a materiálu", "price": 1500 },
    { "name": "Demontáž a likvidace kotle na tuhá paliva", "price": 5000 },
    { "name": "Zpracování agendy dotací", "price": 4800 }
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [priceList, setPriceList] = useState(defaultPriceList);
  const [workPrices, setWorkPrices] = useState(defaultWorkPrices);
  const [editMode, setEditMode] = useState(false);
  
  // State pro generátor nabídek
  const [projectName, setProjectName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerType, setCustomerType] = useState('koncovy');
  const [offerDate, setOfferDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedWork, setSelectedWork] = useState({});
  const [heatPumpType, setHeatPumpType] = useState('vzduch');

  // Výpočet slevy podle typu zákazníka
  const getDiscount = () => {
    switch(customerType) {
      case 'koncovy': return 0.10;
      case 'montazni': return 0.37;
      case 'montazniPlus': return 0.42;
      default: return 0;
    }
  };

  // Export dat do JSON
  const exportData = () => {
    const dataToExport = {
      priceList,
      workPrices,
      version: "1.0",
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hotjet-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // Import dat z JSON
  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.priceList) setPriceList(data.priceList);
          if (data.workPrices) setWorkPrices(data.workPrices);
          alert('Data byla úspěšně načtena!');
        } catch (error) {
          alert('Chyba při načítání dat: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  // Generování HTML nabídky
  const generateOffer = () => {
    const discount = getDiscount();
    const vat = customerType === 'koncovy' ? 0.12 : 0.21;
    
    let heatPumpTotal = 0;
    let accessoriesTotal = 0;
    let workTotal = 0;
    
    // Sestavení HTML
    let html = `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <title>Nabídka - ${projectName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1, h2 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { font-weight: bold; background-color: #f9f9f9; }
        .section { margin: 30px 0; page-break-inside: avoid; }
        .description { background-color: #f0f8ff; padding: 10px; margin: 10px 0; border-left: 3px solid #667eea; }
    </style>
</head>
<body>
    <h1>CENOVÁ NABÍDKA</h1>
    <p><strong>Akce:</strong> ${projectName}</p>
    <p><strong>Zákazník:</strong> ${customerName}</p>
    <p><strong>Datum vystavení:</strong> ${new Date(offerDate).toLocaleDateString('cs-CZ')}</p>
    <p><strong>Platnost nabídky:</strong> 30 dní</p>
    <hr>
`;

    // Zpracování tepelných čerpadel a příslušenství
    const heatPumpCategories = ['A', 'B', 'D', 'E', 'F', 'G', 'H'];
    const controlCategories = ['C1', 'C2', 'J'];
    
    // Nejdříve tepelná čerpadla s rozvaděči
    heatPumpCategories.forEach(cat => {
      const items = Object.entries(selectedItems).filter(([key, val]) => 
        key.startsWith(cat + '-') && val.quantity > 0
      );
      
      if (items.length > 0) {
        html += `<div class="section"><h2>${priceList[cat].name}</h2>`;
        
        if (priceList[cat].description) {
          html += `<div class="description">${priceList[cat].description.replace(/\n/g, '<br>')}</div>`;
        }
        
        html += `<table>
          <tr>
            <th>Kód</th>
            <th>Popis</th>
            <th>Cena bez slevy</th>
            <th>Sleva ${(discount * 100).toFixed(0)}%</th>
            <th>Cena po slevě</th>
            <th>Ks</th>
            <th>Celkem</th>
          </tr>`;
        
        items.forEach(([key, item]) => {
          const [category, code] = key.split('-');
          const product = priceList[category].items.find(p => p.code === code);
          const priceAfterDiscount = product.price * (1 - discount);
          const total = priceAfterDiscount * item.quantity;
          heatPumpTotal += total;
          
          html += `
          <tr>
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.price.toLocaleString('cs-CZ')} Kč</td>
            <td>${(product.price * discount).toLocaleString('cs-CZ')} Kč</td>
            <td>${priceAfterDiscount.toLocaleString('cs-CZ')} Kč</td>
            <td>${item.quantity}</td>
            <td><strong>${total.toLocaleString('cs-CZ')} Kč</strong></td>
          </tr>`;
        });
        
        html += `</table></div>`;
      }
    });

    // Rozvaděče a hydromoduly
    controlCategories.forEach(cat => {
      const items = Object.entries(selectedItems).filter(([key, val]) => 
        key.startsWith(cat + '-') && val.quantity > 0
      );
      
      if (items.length > 0) {
        html += `<div class="section"><h2>${priceList[cat].name}</h2>`;
        
        if (priceList[cat].description) {
          html += `<div class="description">${priceList[cat].description.replace(/\n/g, '<br>')}</div>`;
        }
        
        html += `<table>
          <tr>
            <th>Kód</th>
            <th>Popis</th>
            <th>Cena bez slevy</th>
            <th>Sleva ${(discount * 100).toFixed(0)}%</th>
            <th>Cena po slevě</th>
            <th>Ks</th>
            <th>Celkem</th>
          </tr>`;
        
        items.forEach(([key, item]) => {
          const [category, code] = key.split('-');
          const product = priceList[category].items.find(p => p.code === code);
          const priceAfterDiscount = product.price * (1 - discount);
          const total = priceAfterDiscount * item.quantity;
          heatPumpTotal += total;
          
          html += `
          <tr>
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.price.toLocaleString('cs-CZ')} Kč</td>
            <td>${(product.price * discount).toLocaleString('cs-CZ')} Kč</td>
            <td>${priceAfterDiscount.toLocaleString('cs-CZ')} Kč</td>
            <td>${item.quantity}</td>
            <td><strong>${total.toLocaleString('cs-CZ')} Kč</strong></td>
          </tr>`;
        });
        
        html += `</table></div>`;
      }
    });

    // Příslušenství
    const accessoryCategories = Object.keys(priceList).filter(cat => 
      !heatPumpCategories.includes(cat) && !controlCategories.includes(cat)
    );
    
    accessoryCategories.forEach(cat => {
      const items = Object.entries(selectedItems).filter(([key, val]) => 
        key.startsWith(cat + '-') && val.quantity > 0
      );
      
      if (items.length > 0) {
        html += `<div class="section"><h2>${priceList[cat].name}</h2>`;
        
        if (priceList[cat].description) {
          html += `<div class="description">${priceList[cat].description.replace(/\n/g, '<br>')}</div>`;
        }
        
        html += `<table>
          <tr>
            <th>Kód</th>
            <th>Popis</th>
            <th>Cena bez slevy</th>
            <th>Sleva ${(discount * 100).toFixed(0)}%</th>
            <th>Cena po slevě</th>
            <th>Ks</th>
            <th>Celkem</th>
          </tr>`;
        
        items.forEach(([key, item]) => {
          const [category, code] = key.split('-');
          const product = priceList[category].items.find(p => p.code === code);
          const priceAfterDiscount = product.price * (1 - discount);
          const total = priceAfterDiscount * item.quantity;
          accessoriesTotal += total;
          
          html += `
          <tr>
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.price.toLocaleString('cs-CZ')} Kč</td>
            <td>${(product.price * discount).toLocaleString('cs-CZ')} Kč</td>
            <td>${priceAfterDiscount.toLocaleString('cs-CZ')} Kč</td>
            <td>${item.quantity}</td>
            <td><strong>${total.toLocaleString('cs-CZ')} Kč</strong></td>
          </tr>`;
        });
        
        html += `</table></div>`;
      }
    });

    // Práce a instalační materiál
    const workItems = Object.entries(selectedWork).filter(([key, val]) => val.quantity > 0);
    if (workItems.length > 0) {
      html += `<div class="section"><h2>Práce a instalační materiál</h2>
        <p><em>Níže je uveden odhad ceny materiálu, který bude vyúčtován dle skutečné spotřeby v nákupních cenách bez DPH + 15%</em></p>
        <table>
          <tr>
            <th>Popis</th>
            <th>Cena za jednotku</th>
            <th>Počet</th>
            <th>Celkem</th>
          </tr>`;
      
      workItems.forEach(([key, item]) => {
        const total = item.price * item.quantity;
        workTotal += total;
        
        html += `
          <tr>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString('cs-CZ')} Kč</td>
            <td>${item.quantity}</td>
            <td><strong>${total.toLocaleString('cs-CZ')} Kč</strong></td>
          </tr>`;
      });
      
      html += `</table></div>`;
    }

    // Souhrn
    const subtotal = heatPumpTotal + accessoriesTotal + workTotal;
    const vatAmount = subtotal * vat;
    const total = subtotal + vatAmount;

    html += `
    <div class="section">
      <h2>CELKOVÝ SOUHRN</h2>
      <table>
        <tr class="total">
          <td>Tepelné čerpadlo včetně rozvaděče/hydromodulu</td>
          <td align="right">${heatPumpTotal.toLocaleString('cs-CZ')} Kč</td>
        </tr>
        <tr class="total">
          <td>Příslušenství</td>
          <td align="right">${accessoriesTotal.toLocaleString('cs-CZ')} Kč</td>
        </tr>
        <tr class="total">
          <td>Práce a instalační materiál</td>
          <td align="right">${workTotal.toLocaleString('cs-CZ')} Kč</td>
        </tr>
        <tr style="border-top: 2px solid #333;">
          <td><strong>Mezisoučet</strong></td>
          <td align="right"><strong>${subtotal.toLocaleString('cs-CZ')} Kč</strong></td>
        </tr>
        <tr>
          <td>DPH ${(vat * 100).toFixed(0)}%</td>
          <td align="right">${vatAmount.toLocaleString('cs-CZ')} Kč</td>
        </tr>
        <tr style="background-color: #667eea; color: white;">
          <td><strong>CELKEM K ÚHRADĚ</strong></td>
          <td align="right"><strong style="font-size: 1.2em;">${total.toLocaleString('cs-CZ')} Kč</strong></td>
        </tr>
      </table>
    </div>
    
    <p style="margin-top: 30px;">
      <strong>Platební podmínky:</strong> 50% záloha při objednávce, doplatek při dodání<br>
      <strong>Dodací lhůta:</strong> 2-4 týdny od objednávky<br>
      <strong>Kontakt:</strong> info@hotjet.cz | +420 xxx xxx xxx
    </p>
</body>
</html>`;

    // Kopírování do schránky
    navigator.clipboard.writeText(html).then(() => {
      alert('HTML nabídka byla zkopírována do schránky!');
    });
  };

  // Toggle výběr položky
  const toggleItem = (category, code) => {
    const key = `${category}-${code}`;
    setSelectedItems(prev => ({
      ...prev,
      [key]: prev[key] ? 
        { ...prev[key], quantity: 0 } : 
        { quantity: 1 }
    }));
  };

  // Změna množství
  const updateQuantity = (category, code, quantity) => {
    const key = `${category}-${code}`;
    setSelectedItems(prev => ({
      ...prev,
      [key]: { quantity: parseInt(quantity) || 0 }
    }));
  };

  // Toggle výběr práce
  const toggleWork = (index) => {
    const workList = heatPumpType === 'zeme' ? workPrices.zemeVoda : workPrices.vzduchVoda;
    const work = workList[index];
    const key = `work-${index}`;
    
    setSelectedWork(prev => ({
      ...prev,
      [key]: prev[key] ? 
        { ...prev[key], quantity: 0 } : 
        { name: work.name, price: work.price, quantity: 1 }
    }));
  };

  // Změna množství práce
  const updateWorkQuantity = (index, quantity) => {
    const key = `work-${index}`;
    setSelectedWork(prev => ({
      ...prev,
      [key]: { ...prev[key], quantity: parseInt(quantity) || 0 }
    }));
  };

  // Filtrování kategorií podle typu TČ
  const getFilteredCategories = () => {
    if (heatPumpType === 'vzduch') {
      return ['A', 'B', 'C1', 'C2', 'D', 'E', 'H', 'J', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'Z'];
    } else {
      return ['F', 'G', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'Z'];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Package className="text-blue-600" />
              HOTJET - Generátor nabídek
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('generator')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'generator'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Calculator className="inline mr-2" size={16} />
                Generátor
              </button>
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'editor'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Settings className="inline mr-2" size={16} />
                Editor dat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'generator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Levý panel - Základní údaje a výběr položek */}
            <div className="space-y-6">
              {/* Základní údaje */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  Základní údaje
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Název akce
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="např. Rodinný dům Novákovi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zákazník
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="např. Jan Novák"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Datum vystavení
                    </label>
                    <input
                      type="date"
                      value={offerDate}
                      onChange={(e) => setOfferDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Typ zákazníka
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setCustomerType('koncovy')}
                        className={`py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                          customerType === 'koncovy'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        Koncový
                        <div className="text-xs mt-1">sleva 10%</div>
                      </button>
                      <button
                        onClick={() => setCustomerType('montazni')}
                        className={`py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                          customerType === 'montazni'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        Montážní
                        <div className="text-xs mt-1">sleva 37%</div>
                      </button>
                      <button
                        onClick={() => setCustomerType('montazniPlus')}
                        className={`py-2 px-3 rounded-lg border-2 transition-all text-sm ${
                          customerType === 'montazniPlus'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        Montážní+
                        <div className="text-xs mt-1">sleva 42%</div>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Typ tepelného čerpadla
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {setHeatPumpType('vzduch'); setSelectedItems({}); setSelectedWork({});}}
                        className={`py-2 px-4 rounded-lg border-2 transition-all ${
                          heatPumpType === 'vzduch'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        Vzduch-voda
                      </button>
                      <button
                        onClick={() => {setHeatPumpType('zeme'); setSelectedItems({}); setSelectedWork({});}}
                        className={`py-2 px-4 rounded-lg border-2 transition-all ${
                          heatPumpType === 'zeme'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        Země/Voda-voda
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Výběr položek */}
              <div className="bg-white rounded-xl shadow-md p-6 max-h-screen overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  Výběr položek
                </h2>
                <div className="space-y-6">
                  {getFilteredCategories().map(category => (
                    <div key={category} className="border-b pb-4">
                      <h3 className="font-semibold text-gray-700 mb-3">
                        {priceList[category].name}
                      </h3>
                      <div className="space-y-2">
                        {priceList[category].items.map(item => {
                          const key = `${category}-${item.code}`;
                          const isSelected = selectedItems[key]?.quantity > 0;
                          return (
                            <div key={item.code} className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleItem(category, item.code)}
                                className="w-4 h-4 text-blue-600"
                              />
                              <div className="flex-1">
                                <div className="text-sm">{item.name}</div>
                                <div className="text-xs text-gray-500">
                                  {item.code} - {item.price.toLocaleString('cs-CZ')} Kč
                                </div>
                              </div>
                              {isSelected && (
                                <input
                                  type="number"
                                  min="0"
                                  value={selectedItems[key]?.quantity || 0}
                                  onChange={(e) => updateQuantity(category, item.code, e.target.value)}
                                  className="w-16 px-2 py-1 border rounded"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pravý panel - Práce a generování */}
            <div className="space-y-6">
              {/* Práce a instalační materiál */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  Práce a instalační materiál
                </h2>
                <div className="space-y-2">
                  {(heatPumpType === 'zeme' ? workPrices.zemeVoda : workPrices.vzduchVoda).map((work, index) => {
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
                          <div className="text-xs text-gray-500">
                            {work.price.toLocaleString('cs-CZ')} Kč
                          </div>
                        </div>
                        {isSelected && (
                          <input
                            type="number"
                            min="0"
                            value={selectedWork[key]?.quantity || 0}
                            onChange={(e) => updateWorkQuantity(index, e.target.value)}
                            className="w-16 px-2 py-1 border rounded"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Akce */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  Akce
                </h2>
                <button
                  onClick={generateOffer}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  <FileText size={20} />
                  Vygenerovat nabídku a zkopírovat HTML
                </button>
              </div>

              {/* Náhled vybraných položek */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  Přehled vybraných položek
                </h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {Object.entries(selectedItems)
                    .filter(([key, val]) => val.quantity > 0)
                    .map(([key, item]) => {
                      const [category, code] = key.split('-');
                      const product = priceList[category].items.find(p => p.code === code);
                      const discount = getDiscount();
                      const priceAfterDiscount = product.price * (1 - discount);
                      return (
                        <div key={key} className="flex justify-between text-sm py-1 border-b">
                          <div>
                            <div>{product.name}</div>
                            <div className="text-xs text-gray-500">{product.code}</div>
                          </div>
                          <div className="text-right">
                            <div>{item.quantity}x {priceAfterDiscount.toLocaleString('cs-CZ')} Kč</div>
                            <div className="font-semibold">
                              {(priceAfterDiscount * item.quantity).toLocaleString('cs-CZ')} Kč
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {Object.entries(selectedWork)
                    .filter(([key, val]) => val.quantity > 0)
                    .map(([key, item]) => (
                      <div key={key} className="flex justify-between text-sm py-1 border-b">
                        <div>
                          <div>{item.name}</div>
                          <div className="text-xs text-gray-500">Práce</div>
                        </div>
                        <div className="text-right">
                          <div>{item.quantity}x {item.price.toLocaleString('cs-CZ')} Kč</div>
                          <div className="font-semibold">
                            {(item.price * item.quantity).toLocaleString('cs-CZ')} Kč
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Editor dat */
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Editor dat a ceníku
              </h2>
              <div className="flex gap-3">
                <label className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer flex items-center gap-2">
                  <Upload size={20} />
                  Import JSON
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={exportData}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Download size={20} />
                  Export JSON
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Tip:</strong> Exportuj si aktuální data do JSON souboru, můžeš je editovat v textovém editoru a pak znovu nahrát. 
                    Pro Vercel deployment můžeš data hostovat na GitHub nebo jiném CDN a načítat je přes API.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Struktura dat</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`{
  "priceList": {
    "A": {
      "name": "Název kategorie",
      "description": "Popis kategorie",
      "items": [
        {
          "code": "KÓD",
          "name": "Název položky",
          "price": 12345
        }
      ]
    }
  },
  "workPrices": {
    "zemeVoda": [...],
    "vzduchVoda": [...]
  }
}`}
              </pre>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Integrace s backendem</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    Pro napojení na API nebo databázi můžeš použít tento endpoint:
                  </p>
                  <code className="block bg-white p-2 rounded border text-sm">
                    fetch('/api/pricelist').then(res => res.json())
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
export default function Home() {
  return <App />;
}