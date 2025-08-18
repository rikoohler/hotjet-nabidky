// Výchozí data - struktura ceníku
export const defaultPriceList = {
  A: {
    name: "Vzduch-voda, venkovní monoblok, R454b",
    description:
      "⚡ Smart Grid Ready a podpora fotovoltaiky\n🔄 Hybridizace - funkce v regulaci\n🔇 Systém aktivního potlačení hluku\n🔧 Scroll kompresor Copeland\n🌿 Bezpečné chladivo R454B",
    items: [
      {
        code: "HJZETXE07",
        name: "HOTJET 7ZETXe - topení/chlazení - pro TZ 4-8kW",
        price: 160194,
      },
      {
        code: "HJZETXE10",
        name: "HOTJET 10ZETXe - topení/chlazení, 400V - pro TZ 5-15kW",
        price: 167922,
      },
      {
        code: "HJZETXE15",
        name: "HOTJET 15ZETXe - topení/chlazení, 400V - pro TZ 10-20kW",
        price: 186104,
      },
    ],
  },
  B: {
    name: "Vzduch-voda, venkovní monoblok, R290 (propan)",
    description:
      "🌱 Ekologické chladivo R290\n⚡ Vysoká účinnost\n🔇 Nízká hlučnost",
    items: [
      {
        code: "HJZETXP07",
        name: "HOTJET 7ZETXp - R290 - pro TZ 4-8kW",
        price: 163804,
      },
      {
        code: "HJZETXP10",
        name: "HOTJET 10ZETXp - R290, 400V - pro TZ 5-15kW",
        price: 176575,
      },
      {
        code: "HJZETXP15",
        name: "HOTJET 15ZETXp - R290, 400V - pro TZ 10-20kW",
        price: 206157,
      },
      {
        code: "HJZETXP20",
        name: "HOTJET 20ZETXp - R290, 400V - pro TZ 15-25kW",
        price: 234216,
      },
    ],
  },
  C1: {
    name: "ROZVADĚČ",
    description:
      "🧠 Inteligentní regulátor Siemens\n🏠 Celokovový externí rozvaděč\n🌡️ Venkovní čidlo\n💧 Úsporné oběhové čerpadlo\n🌐 Webserver pro ovládání",
    items: [
      {
        code: "RZ107",
        name: "Rozvaděč k tepelnému čerpadlu 7ZETXe/p",
        price: 21579,
      },
      {
        code: "RZ115",
        name: "Rozvaděč k tepelnému čerpadlu 10/15ZETXe/p",
        price: 21579,
      },
    ],
  },
  C2: {
    name: "HYDROMODUL",
    description:
      "🔧 Kompletní rozvaděč s regulátorem\n⚡ Interní elektrokotel 7,5kW\n🔄 3-cestný ventil\n💧 Úsporné čerpadlo\n📱 Webserver a aplikace",
    items: [
      {
        code: "HMD07",
        name: "Hydromodul k tepelnému čerpadlu 7ZETXe/p",
        price: 45525,
      },
      {
        code: "HMD115",
        name: "Hydromodul k tepelnému čerpadlu 10,15ZETXe/p, 20ZETXp",
        price: 45525,
      },
    ],
  },
  D: {
    name: "Vzduch-voda, INTERNÍ monoblok, R454b",
    description:
      "Vnitřní instalace\nIntegrovaný rozvaděč\nElektrokotel 7,5kW\n3-cestný ventil",
    items: [
      {
        code: "HJZETXI07",
        name: "HOTJET 7ZETXi - topení/chlazení - pro TZ 4-8kW",
        price: 209378,
      },
      {
        code: "HJZETXI10",
        name: "HOTJET 10ZETXi - topení/chlazení, 400V - pro TZ 5-15kW",
        price: 220248,
      },
      {
        code: "HJZETXI15",
        name: "HOTJET 15ZETXi - topení/chlazení, 400V - pro TZ 10-20kW",
        price: 241430,
      },
    ],
  },
  E: {
    name: "Vzduch-voda, VNITŘNÍ monoblok",
    description: "Kompaktní řešení\nMontáž na zeď jako plynový kotel",
    items: [
      {
        code: "HJMINI5AI",
        name: "Mini 5Ai - TČ k pověšení na zeď do 4kW TZ",
        price: 110837,
      },
    ],
  },
  F: {
    name: "Voda-voda tepelná čerpadla",
    description: "Vysoká účinnost\nAktivní chlazení\nElektrokotel 7,5kW",
    items: [
      {
        code: "HJWX07cx",
        name: "HOTJET 7WX voda-voda, aktivní chl., koax. výparník",
        price: 166487,
      },
      {
        code: "HJWX10cx",
        name: "HOTJET 10WX voda-voda, aktivní chl., koax. výparník",
        price: 169286,
      },
      {
        code: "HJWX15cx",
        name: "HOTJET 15WX voda-voda, aktivní ch., koax. výparník",
        price: 182495,
      },
    ],
  },
  G: {
    name: "Země-voda tepelná čerpadla",
    description:
      "Smart Grid Ready\nPasivní i aktivní chlazení\nIntegrovaný elektrokotel 7,5kW\nWebserver a aplikace",
    items: [
      {
        code: "HJWX07",
        name: "HOTJET 7WX země-voda, aktivní chlazení",
        price: 162058,
      },
      {
        code: "HJWX10",
        name: "HOTJET 10WX země-voda, aktivní chlazení",
        price: 164857,
      },
      {
        code: "HJWX15",
        name: "HOTJET 15WX země-voda, aktivní chlazení",
        price: 178066,
      },
    ],
  },
  H: {
    name: "Vzduch-voda, venkovní monoblok, On/Off, 65°C",
    description: "Vysokoteplotní tepelná čerpadla\nVhodné pro rekonstrukce",
    items: [
      { code: "HJONE2H20", name: "HOTJET 20ONE2", price: 170620 },
      { code: "HJONE2H25", name: "HOTJET 25ONE2", price: 266934 },
      { code: "HJONE2H35", name: "HOTJET 35ONE2", price: 338890 },
      { code: "HJONE2H45", name: "HOTJET 45ONE2", price: 346507 },
      { code: "HJONE2H55", name: "HOTJET 55ONE2", price: 366816 },
    ],
  },
  J: {
    name: "Rozvaděč pro venkovní jednotky ONE2",
    description: "Rozvaděč s regulací",
    items: [
      {
        code: "RZONE2",
        name: "Rozvaděč s regulací pro 25-45 ONE2",
        price: 22653,
      },
    ],
  },
  M: {
    name: "Různé příslušenství",
    description: "",
    items: [
      {
        code: "RQ55.301",
        name: "Drátové prostorové čidlo s tlačítkem pro chlazení",
        price: 2990,
      },
      {
        code: "RQ58.301",
        name: "Bezdrátové prostorové čidlo s tlačítkem pro chlazení",
        price: 3360,
      },
      { code: "RA71.393", name: "Bezdrátový přijímač, dosah 30m", price: 2986 },
      { code: "RGQZ36526", name: "Siemens čidlo teploty kabel 6m", price: 450 },
      {
        code: "3CV",
        name: '3-cestný rozdělovací ventil 1" pro boiler, bazén',
        price: 2390,
      },
      { code: "EKT75", name: "Elektrokotel trubkový 7,5kW", price: 7875 },
      {
        code: "GPA20-9",
        name: "Čerpadlo Hotjet GPA20-9H-130, řízení PWM",
        price: 3000,
      },
      {
        code: "GPA25-11",
        name: "Čerpadlo Hotjet GPA25-11H-130, řízení PWM",
        price: 4110,
      },
      {
        code: "P1ZETXE",
        name: "Podstavec pod tepelné čerpadlo + silentbloky",
        price: 3600,
      },
    ],
  },
  N: {
    name: "Průtokový ohřev TV",
    description:
      "🔵 Dokonalá hygiena a čistota\n• Vždy čerstvá teplá voda ohřívaná v moderní výměníkové stanici\n• Žádné usazeniny či bakterie - voda se neukládá v bojleru\n• Bez nutnosti pravidelné dezinfekce proti legionelle\n• Prémiové materiály: nerezový výměník a měděné rozvody\n\n⚡ Maximální výkon a efektivita\n• Plný výkon tepelného čerpadla bez omezení výměníkem\n• Neomezená kapacita díky možnosti rozšíření o další nádrže\n• Profesionální řešení inspirované systémy z bytových domů\n\n🛠️ Praktické benefity\n• Snadná údržba - všechny komponenty přístupné zvenčí\n• Nadstandardní životnost ve srovnání s klasickými bojlery\n• Flexibilní instalace s možností budoucího rozšíření",
    items: [
      {
        code: "FW300+",
        name: "Průtokový ohřev TV 300l s výkonem 21l/min",
        price: 49707,
      },
      {
        code: "FW500+",
        name: "Průtokový ohřev TV 500l s výkonem 21l/min",
        price: 51284,
      },
      {
        code: "FW800+",
        name: "Průtokový ohřev TV 800l s výkonem 21l/min",
        price: 62527,
      },
      {
        code: "FW1000+",
        name: "Průtokový ohřev TV 1000l s výkonem 21l/min",
        price: 66690,
      },
    ],
  },
  O: {
    name: "Kombinované nádrže",
    description: "",
    items: [
      {
        code: "BOLLY250",
        name: "Kombinovaná nádrž pro TV 235l s výměníkem 2,1m2",
        price: 54250,
      },
      {
        code: "BOLLY300",
        name: "Kombinovaná nádrž pro TV 291l s výměníkem 3,4m2",
        price: 57700,
      },
      {
        code: "BOLLY500",
        name: "Kombinovaná nádrž pro TV 498l s výměníkem 5,4m2",
        price: 77950,
      },
    ],
  },
  P: {
    name: "Boilery s výměníkem",
    description: "",
    items: [
      {
        code: "B200",
        name: "Boiler 200 - objem 167l, výměník 2,4m2",
        price: 26000,
      },
      {
        code: "B300",
        name: "Boiler 300 - objem 238l, výměník 3,1m2",
        price: 31400,
      },
      {
        code: "B500",
        name: "Boiler 500 - objem 426l, výměník 4,4m2",
        price: 45318,
      },
    ],
  },
  Q: {
    name: "VYROVNÁVACÍ ZÁSOBNÍKY (AKUMULACE)",
    description: "",
    items: [
      {
        code: "BF60",
        name: "Zásobník 60l - výška 609mm, průměr 505mm",
        price: 7800,
      },
      {
        code: "BF120",
        name: "Zásobník 120l - výška 1000mm, průměr 505mm",
        price: 10140,
      },
      {
        code: "BF200",
        name: "Zásobník 200l - výška 1369mm, průměr 634mm",
        price: 17056,
      },
      {
        code: "BF300",
        name: "Zásobník 300l - výška 1405mm, průměr 732mm",
        price: 20748,
      },
    ],
  },
  R: {
    name: "FANCOILY",
    description: "Doplnění nebo náhrada radiátorů pro topení i chlazení",
    items: [
      {
        code: "ACFXVA230",
        name: "Nástěnný Fan coil FX-VA 230 DX (40°C, 1270-1630W)",
        price: 10820,
      },
      {
        code: "ACFXVA630",
        name: "Nástěnný Fan coil FX-VA 630 DX (40°C, 2610-3150W)",
        price: 14952,
      },
      {
        code: "ACFXVA1230",
        name: "Nástěnný Fan coil FX-VA 1230 DX (40°C, 6390-7220W)",
        price: 21100,
      },
    ],
  },
  S: {
    name: "Regulace",
    description: "",
    items: [
      {
        code: "AVS55.196",
        name: "Rozšiřující modul pro RSV21 (4x teplot. čidlo, 3x 0-10V)",
        price: 2205,
      },
      {
        code: "AVS55.199",
        name: "Rozšiřující modul pro RSV21 (4x teplot. čidlo, EEV)",
        price: 2300,
      },
      {
        code: "AVS82.496",
        name: "Plochý kabel AVS82.496 pro AVS55 do RVS21",
        price: 221,
      },
    ],
  },
  T: {
    name: "OHŘEV POTRUBÍ ODVODU KONDENZÁTU",
    description: "",
    items: [
      { code: "OOK_2", name: "Ohřev odvodu kondenzátu 2m 80W", price: 840 },
      { code: "OOK_3", name: "Ohřev odvodu kondenzátu 3m 120W", price: 945 },
      { code: "OOK_6", name: "Ohřev odvodu kondenzátu 6m 240W", price: 1365 },
      { code: "OOK_9", name: "Ohřev odvodu kondenzátu 9m 360W", price: 2310 },
    ],
  },
  Z: {
    name: "Záruky",
    description: "",
    items: [
      { code: "W5Y", name: "Prodloužená záruka na 5 let", price: 5240 },
      { code: "W10Y", name: "Prodloužená záruka na 10 let", price: 8390 },
    ],
  },
};
