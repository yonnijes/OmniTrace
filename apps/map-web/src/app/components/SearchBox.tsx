import { useState } from 'react';
import { useTrackingStore } from '../store/trackingStore';

const PATENT_REGEX = /^[A-Z]{4}\d{2}$/;
const RUT_REGEX = /^\d{1,8}-[\dkK]$/;

function validatePatent(value: string): boolean {
  return PATENT_REGEX.test(value.toUpperCase());
}

function validateRut(value: string): boolean {
  return RUT_REGEX.test(value);
}

export function SearchBox() {
  const {
    searchType,
    setSearchType,
    searchQuery,
    setSearchQuery,
    loading,
    setLoading,
    setPoints,
    setRoute,
    setError,
    reset,
  } = useTrackingStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const isValid =
    searchType === 'patent'
      ? validatePatent(localQuery)
      : validateRut(localQuery);

  const handleSearch = async () => {
    if (!localQuery.trim() || !isValid) return;

    setSearchQuery(localQuery);
    setLoading(true);
    setError(null);
    reset();

    try {
      const endpoint =
        searchType === 'patent'
          ? `http://localhost:3000/api/tracking/vehicle/${localQuery}`
          : `http://localhost:3000/api/tracking/person/${localQuery}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('No se encontraron datos');
      }

      const data = await response.json();
      setPoints(data.points || []);
      setRoute(data.route?.geometry || null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-box">
      <div className="search-type-toggle">
        <button
          className={searchType === 'patent' ? 'active' : ''}
          onClick={() => setSearchType('patent')}
        >
          Patente
        </button>
        <button
          className={searchType === 'rut' ? 'active' : ''}
          onClick={() => setSearchType('rut')}
        >
          RUT
        </button>
      </div>

      <div className="search-input-group">
        <div className="input-wrapper">
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              searchType === 'patent'
                ? 'Ingrese patente (ej: ABCD12)'
                : 'Ingrese RUT (ej: 12345678-9)'
            }
            disabled={loading}
            className={localQuery && !isValid ? 'invalid' : ''}
          />
          {localQuery && isValid && <span className="valid-icon">✓</span>}
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !localQuery.trim() || !isValid}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      {localQuery && !isValid && (
        <span className="validation-error">
          {searchType === 'patent'
            ? 'Formato inválido (ej: ABCD12)'
            : 'Formato inválido (ej: 12345678-9)'}
        </span>
      )}
    </div>
  );
}
