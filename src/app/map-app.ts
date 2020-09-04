import { loadScript, loadModules } from 'esri-loader';
export class MapApp {

    private mapView: __esri.MapView;
  
    /** Load ArcGIS JS API scripts. */
    async loadScript() {
      const AGS_SDK = 'https://js.arcgis.com/4.16';
      await loadScript({
        url: `${AGS_SDK}/init.js`,
        css: `${AGS_SDK}/esri/themes/light/main.css`
      });
    }
  
    /** Init a map view */
    async initMap(container) {
      const [Map, MapView] = await loadModules<[__esri.MapConstructor, __esri.MapViewConstructor]>(['esri/Map', 'esri/views/MapView']);
      const map = new Map({ basemap: 'satellite' });
      this.mapView = new MapView({
        map, container,
        extent: {
          // autocasts as new Extent()
          xmin: -9177811,
          ymin: 4247000,
          xmax: -9176791,
          ymax: 4247784,
          spatialReference: { wkid: 102100 }
        }
      });
    }
  
    /** add a feature layer to map */
    async addFeatureLayer() {
      const [FeatureLayer] = await loadModules(['esri/layers/FeatureLayer']);
      const layer = new FeatureLayer({
        url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0'
      });
      this.mapView.map.layers.add(layer);
    }
  
  }
