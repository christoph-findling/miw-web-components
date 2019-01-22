function ajaxRequest(url: string, callback: Function): void {
  var xhr: XMLHttpRequest = new XMLHttpRequest();

  xhr.onreadystatechange = ensureReadiness;

  function ensureReadiness(): void {
      if(xhr.readyState < 4) {
          return;
      }

      if(xhr.status !== 200) {
          return;
      }

      // all is well
      if(xhr.readyState === 4) {
          callback(xhr);
      }
  }

  xhr.open('GET', url, true);
  xhr.send('');
}

function getTotalMarketCapTop100(data: any[]): number {
  return data.reduce((sum, currentElement) => sum + currentElement.market_cap, 0);
}

function processResponse(data: any[]): {coin: string, percentage: number}[] {
  const totalMarketCap: number = getTotalMarketCapTop100(data);
  const otherCoins: {coin: string, percentage: number} = mergeCoinsIntoOther(data, totalMarketCap);
  data = data.map(elem => processData(elem, totalMarketCap));
  data.push(otherCoins);
  return <{coin: string, percentage: number}[]>data;
}

function mergeCoinsIntoOther(data: any[], totalMarketCap: number, amountOfCoinsToKeep: number = 5): {coin: string, percentage: number} {
  const calcData: any[] = [...data];
  data = data.splice(amountOfCoinsToKeep, data.length);
  let sumMarketCapOther: number = 0;
  for(let i:number = amountOfCoinsToKeep; i < calcData.length; i++) {
    const coinData: any = calcData[i];
    sumMarketCapOther += coinData.market_cap;
  }
  return { coin: 'Others', percentage: calcPercentualMarketCap(sumMarketCapOther, totalMarketCap)};
}

function processData(coinData: any, totalMarketCap: number): any {
  return { coin: coinData.name, percentage: calcPercentualMarketCap(coinData.market_cap, totalMarketCap)};
}

function calcPercentualMarketCap(marketCap: number, totalMarketCap: number): number {
  return parseFloat((marketCap / totalMarketCap * 100).toFixed(1));
}

export function fetchData(): Promise<{coin: string, percentage: number}[]> {
  const url: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  return new Promise((resolve) => {
    ajaxRequest(url, (result) => {
      resolve(processResponse(JSON.parse(result.response)));
    });
  });
}
