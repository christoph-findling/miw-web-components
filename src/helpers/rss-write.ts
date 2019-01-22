export function generateRSSFromCoins(coins: {coin: string, percentage: number}[]): void {
    let XMLString:string = `<?xml version="1.0" encoding="UTF-8" ?>`+
`
<rss version="2.0">

<channel>
    <title>Medien im Web Übungsprojekt RSS</title>
    <link>https://www.fh-kufstein.ac.at</link>
    <description>Generierte Daten von der CoinGecko API</description>`;

    coins.forEach(coin => {
        XMLString += `
        <item>
            <title>${coin.coin}: ${coin.percentage}%</title>
            <link>https://www.fh-kufstein.ac.at</link>
            <description>${coin.coin} hat derzeit einen Marktanteil von ${coin.percentage} Prozent!</description>
        </item>`;
    });

    XMLString += `
  </channel>

  </rss>`;

    document.getElementById('rss-xml').innerText = XMLString;
}