import { MapWrapper } from './components/MapWrapper';
import { SearchBox } from './components/SearchBox';
import { useTrackingStore } from './store/trackingStore';
import './app.css';

export function App() {
  const { points, route, loading, error, searchQuery } = useTrackingStore();

  const lastPoint = points.length > 0 ? points[points.length - 1] : null;
  const firstPoint = points.length > 0 ? points[0] : null;

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCoord = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>OmniTrace</h1>
        <SearchBox />
      </header>

      <main className="app-main">
        {loading && <div className="loading-overlay">OBTENIENDO SEÑAL</div>}
        {error && <div className="error-message">{error}</div>}

        <MapWrapper points={points} route={route} />

        {points.length > 0 && (
          <div className="info-panel">
            <h3>Datos de Tracking</h3>
            <p>
              <span>Consulta:</span>
              {searchQuery}
            </p>
            <p>
              <span>Puntos:</span>
              {points.length}
            </p>
            <p>
              <span>Inicio:</span>
              {firstPoint ? formatDate(firstPoint.timestamp) : '-'}
            </p>
            <p>
              <span>Último:</span>
              {lastPoint ? formatDate(lastPoint.timestamp) : '-'}
            </p>
            <p>
              <span>Coordenadas:</span>
              {lastPoint
                ? formatCoord(lastPoint.latitude, lastPoint.longitude)
                : '-'}
            </p>
            {lastPoint?.speed !== undefined && (
              <p>
                <span>Velocidad:</span>
                {lastPoint.speed !== null ? `${lastPoint.speed} km/h` : '-'}
              </p>
            )}
            <p>
              <span>Fuente:</span>
              {lastPoint?.providerId || '-'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
