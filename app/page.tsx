// app/page.tsx
import Navbar from './components/Navbar';
import IncidentPlayer from './components/IncidentPlayer';
import IncidentList from './components/IncidentList';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <Navbar />
      <main className="flex-1 p-6 flex space-x-6 container mx-auto">
        {/* Incident Player (Left Side) */}
        <div className="flex-grow-[3] basis-0 min-w-0"> {/* Flex-grow to take more space */}
          <IncidentPlayer />
        </div>

        {/* Incident List (Right Side) */}
        <div className="flex-grow-[1] basis-0 min-w-[300px] max-w-[450px]"> {/* Flex-grow to take less space, fixed min/max width */}
          <IncidentList />
        </div>
      </main>
      {/* Optional: Incident timeline can go here */}
    </div>
  );
}