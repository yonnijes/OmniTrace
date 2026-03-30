import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import { TrackingPointData, RouteData } from '../store/trackingStore';

interface MapWrapperProps {
  points: TrackingPointData[];
  route: RouteData | null;
  center?: [number, number];
  zoom?: number;
}

export function MapWrapper({
  points,
  route,
  center = [-33.4489, -70.6693],
  zoom = 13,
}: MapWrapperProps) {
  const mapRef = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const prevPointsLengthRef = useRef(0);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);

      routeLayerRef.current = L.layerGroup().addTo(mapRef.current);
      markersLayerRef.current = L.layerGroup().addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const isNewPoint = points.length > prevPointsLengthRef.current;
    prevPointsLengthRef.current = points.length;

    points.forEach((point, index) => {
      const isLast = index === points.length - 1;
      const isAnimated = isLast && isNewPoint;

      const icon = isLast
        ? L.divIcon({
            className: 'custom-marker',
            html: `<div class="pulse-marker ${
              isAnimated ? 'animate-in' : ''
            }"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          })
        : L.divIcon({
            className: 'history-marker',
            html: '<div class="history-point"></div>',
            iconSize: [10, 10],
            iconAnchor: [5, 5],
          });

      const marker = L.marker([point.latitude, point.longitude], { icon });

      marker.bindPopup(`
        <div class="popup-content">
          <strong>${new Date(point.timestamp).toLocaleString()}</strong><br/>
          Proveedor: ${point.rawSource}<br/>
          ${point.speed ? `Velocidad: ${point.speed} km/h` : ''}
          ${point.accuracy ? `Precisión: ${point.accuracy}m` : ''}
        </div>
      `);

      markersLayerRef.current?.addLayer(marker);
    });

    if (points.length > 0) {
      const lastPoint = points[points.length - 1];
      mapRef.current.setView([lastPoint.latitude, lastPoint.longitude], zoom);
    }
  }, [points, zoom]);

  useEffect(() => {
    if (!mapRef.current || !routeLayerRef.current || !route) return;

    routeLayerRef.current.clearLayers();

    const routeCoordinates: L.LatLngExpression[] = route.coordinates.map(
      ([lng, lat]) => [lat, lng]
    );

    const polyline = L.polyline(routeCoordinates, {
      color: '#3b82f6',
      weight: 4,
      opacity: 0.9,
      dashArray: '10, 10', // Configura el tamaño de las líneas y los espacios (ej: '10px línea, 10px espacio')
    });

    routeLayerRef.current.addLayer(polyline);

    mapRef.current.fitBounds(polyline.getBounds(), { padding: [50, 50] });
  }, [route]);

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <AnimatePresence>
        {points.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 1000,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              padding: '8px 12px',
              borderRadius: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-primary)',
            }}
          >
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
              {points.length}
            </span>{' '}
            pts
          </motion.div>
        )}
      </AnimatePresence>
      <div
        id="map"
        style={{
          height: '100%',
          width: '100%',
          minHeight: '400px',
          borderRadius: '8px',
        }}
      />
    </div>
  );
}
