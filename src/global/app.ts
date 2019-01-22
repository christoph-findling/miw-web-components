import '@ionic/core';
import { fetchData } from '../helpers/utils';
import { generateRSSFromCoins } from '../helpers/rss-write';

// import { setupConfig } from '@ionic/core';

// setupConfig({
//   mode: 'ios'
// });
fetchData().then(data => {
    const sticksComponent: any = document.querySelector('stick-comp');
    const graphComponent: any = document.querySelector('graph-comp');
    graphComponent.data = data;
    sticksComponent.data = data;
    generateRSSFromCoins(data);
});
