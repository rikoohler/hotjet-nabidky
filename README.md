# HOTJET - Generátor nabídek

Webová aplikace pro generování profesionálních cenových nabídek tepelných čerpadel HOTJET.

## Funkce
- Generování nabídek s automatickými slevami
- Export/Import dat v JSON formátu
- Podpora různých typů zákazníků
- Výpočet DPH podle typu zákazníka
- HTML export do schránky

## Technologie
- Next.js 15
- React 19
- Tailwind CSS v4
- Lucide Icons

## Spuštění lokálně
```bash
npm install
npm run dev
```

Aplikace bude dostupná na http://localhost:3000

## Deploy
Automatický deploy přes Vercel při push do main branch.

## Použití
1. Vyberte produkty z kategorií A-Z
2. Přidejte instalační práce (vzduch-voda nebo země-voda)
3. Nastavte typ zákazníka a slevu
4. Vygenerujte HTML nabídku

## Funkce aplikace
- **Produkty**: Kompletní ceník tepelných čerpadel HOTJET všech kategorií
- **Instalační práce**: Přednastavené práce pro oba typy instalací
- **Kalkulace**: Automatické výpočty s DPH pro právnické osoby
- **Export/Import**: Uložení a načtení rozpracovaných nabídek
- **HTML export**: Profesionální nabídka připravená k odeslání zákazníkovi

## Struktura projektu
```
hotjet-nabidky/
├── app/
│   ├── page.js          # Hlavní komponenta aplikace
│   ├── layout.js        # Layout s českými metadaty
│   └── globals.css      # Globální styly
├── public/              # Statické soubory
└── README.md           # Dokumentace
```

## Autor
Projekt HOTJET generátor nabídek - pro efektivní tvorbu cenových nabídek tepelných čerpadel.