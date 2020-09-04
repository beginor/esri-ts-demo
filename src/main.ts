import { MapApp } from './app/map-app'

import './main.css';

const pathBase = `${location.protocol}//${location.host}`;

window['dojoConfig'] = {
  async: true,
  packages: [
    // { name: 'THREE', location: 'https://unpkg.com/three@0.117.1/build', main: 'three.min' },
  ]
};
window['esriConfig'] = { locale: 'zh-cn' };

async function initMap(): Promise<void> {
  const app = new MapApp();
  await app.loadScript();
  await app.initMap('viewDiv');
  await app.addFeatureLayer();
}

initMap().catch(ex => {
    alert('Map init error!');
    console.error(ex);
});
