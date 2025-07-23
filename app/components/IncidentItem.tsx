// app/components/IncidentItem.tsx
import Image from 'next/image';
import { format } from 'date-fns';
import { Incident, Camera } from '@prisma/client';

interface IncidentItemProps {
  incident: Incident & { camera: Pick<Camera, 'name' | 'location'> };
  onResolve: (id: string) => void;
  isResolving: boolean;
}

const typeColors: { [key: string]: string } = {
  'Unauthorised Access': 'bg-red-500',
  'Gun Threat': 'bg-red-700',
  'Face Recognised': 'bg-green-500',
  'Suspicious Package': 'bg-yellow-500',
  Loitering: 'bg-orange-500',
  'Vehicle Detected': 'bg-blue-500',
  'Object Left Behind': 'bg-purple-500',
};

export default function IncidentItem({ incident, onResolve, isResolving }: IncidentItemProps) {
  const typeColorClass = typeColors[incident.type] || 'bg-gray-500';

  return (
    <div
      className={`flex items-center space-x-4 p-3 rounded-lg shadow-sm mb-3
      ${incident.resolved ? 'bg-gray-700 opacity-60' : 'bg-gray-800'}
      ${isResolving ? 'animate-pulse' : ''} transition-all duration-300`}
    >
      <Image
        src={incident.thumbnailUrl}
        alt={incident.type}
        width={80}
        height={60}
        className="rounded-md object-cover"
      />
      <div className="flex-1 text-white">
        <div className="flex items-center mb-1">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColorClass}`}>
            {incident.type}
          </span>
          <span className="ml-2 text-sm text-gray-400">{incident.camera.location}</span>
        </div>
        <p className="text-sm font-medium">{incident.camera.name}</p>
        <p className="text-xs text-gray-400">
          {format(new Date(incident.tsStart), 'MMM dd, HH:mm')} -{' '}
          {format(new Date(incident.tsEnd), 'HH:mm')}
        </p>
      </div>
      {!incident.resolved && (
        <button
          onClick={() => onResolve(incident.id)}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isResolving}
        >
          {isResolving ? 'Resolving...' : 'Resolve'}
        </button>
      )}
      {incident.resolved && (
        <span className="text-sm text-green-400">Resolved</span>
      )}
    </div>
  );
}