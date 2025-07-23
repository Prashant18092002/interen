// app/components/IncidentList.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import IncidentItem from './IncidentItem';
import { Incident, Camera } from '@prisma/client';

type IncidentWithCamera = Incident & { camera: Pick<Camera, 'name' | 'location'> };

export default function IncidentList() {
  const [incidents, setIncidents] = useState<IncidentWithCamera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvingIncidentId, setResolvingIncidentId] = useState<string | null>(null);

  const fetchIncidents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/incidents?resolved=false');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: IncidentWithCamera[] = await res.json();
      setIncidents(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  const handleResolve = async (id: string) => {
    setResolvingIncidentId(id);
    try {
      const res = await fetch(`/api/incidents/${id}/resolve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Optimistic UI update: Remove the incident from the list immediately
      setIncidents((prevIncidents) => prevIncidents.filter((inc) => inc.id !== id));

      // No need to parse JSON if we're just removing it
      // const updatedIncident: IncidentWithCamera = await res.json();
      // console.log('Resolved incident:', updatedIncident);

    } catch (e: any) {
      setError(`Failed to resolve incident: ${e.message}`);
      // Re-fetch if optimistic update fails
      fetchIncidents();
    } finally {
      setResolvingIncidentId(null);
    }
  };

  if (loading) {
    return <div className="text-white text-center p-4">Loading incidents...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg h-full overflow-y-auto custom-scrollbar">
      <h2 className="text-xl font-semibold text-white mb-4">Unresolved Incidents ({incidents.length})</h2>
      {incidents.length === 0 ? (
        <p className="text-gray-400">No unresolved incidents found.</p>
      ) : (
        <div>
          {incidents.map((incident) => (
            <IncidentItem
              key={incident.id}
              incident={incident}
              onResolve={handleResolve}
              isResolving={resolvingIncidentId === incident.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}