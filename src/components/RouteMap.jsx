import { useEffect, useState } from 'react';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from 'react-leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import { getRealRoute } from '../lib/Routing';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

function FitBounds({ route }) {
  const map = useMap();

  useEffect(() => {
    if (!route.length) return;

    const bounds = L.latLngBounds(
      route.map((p) => [
        p.latitude,
        p.longitude
      ])
    );

    map.fitBounds(bounds, {
      padding: [40, 40]
    });
  }, [route, map]);

  return null;
}

export default function RouteMap({
  route = [],
  allPoints = []
}) {

  const [realRoute, setRealRoute] =
    useState([]);

  useEffect(() => {

    async function loadRoute() {

      if (route.length < 2) {
        setRealRoute([]);
        return;
      }

      const result =
        await getRealRoute(route);

      setRealRoute(result);
    }

    loadRoute();

  }, [route]);

  const center =
    route.length > 0
      ? [
          route[0].latitude,
          route[0].longitude
        ]
      : [-6.2, 106.816666];

return (
  <div
  className="
    relative
    z-0
    w-full
    h-[400px]
    md:h-[600px]
    lg:h-[750px]
  "
  >

      <MapContainer
        center={center}
        zoom={12}
        className="w-full h-full rounded-xl z-0"
      >

      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {allPoints.map((loc, idx) => (
        <Marker
          key={idx}
          position={[
            loc.latitude,
            loc.longitude
          ]}
        >
          <Popup>
            <b>{loc.nama}</b>
            <br />
            RT {loc.rt} RW {loc.rw}
          </Popup>
        </Marker>
      ))}

      {realRoute.length > 0 && (
        <Polyline
          positions={realRoute}
          color="blue"
          weight={6}
        />
      )}

      <FitBounds route={route} />

    </MapContainer>

  </div>
);
}