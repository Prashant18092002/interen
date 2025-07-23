// app/components/IncidentPlayer.tsx
import Image from 'next/image';

export default function IncidentPlayer() {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-4">Incident Player</h2>
      <div className="flex-grow flex items-center justify-center bg-black rounded-md overflow-hidden">
        {/* Static video/image stub */}
        <Image
          src="/static-video.mp4" // or /static-image.jpg or .gif
          alt="Incident Feed"
          width={800}
          height={450}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      <div className="mt-4 flex space-x-2 justify-center">
        {/* Mini strip of additional camera thumbnails */}
        <Image
          src="/thumbnails/camera_feed_2.jpg" // Placeholder
          alt="Camera 2"
          width={120}
          height={80}
          className="rounded-md object-cover cursor-pointer hover:opacity-80 transition-opacity"
        />
        <Image
          src="/thumbnails/camera_feed_3.jpg" // Placeholder
          alt="Camera 3"
          width={120}
          height={80}
          className="rounded-md object-cover cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    </div>
  );
}