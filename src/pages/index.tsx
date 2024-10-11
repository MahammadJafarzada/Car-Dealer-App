import { useState } from 'react';
import Link from 'next/link';
import VehicleMakesSelect from '../components/VehicleMakesSelect';
import ModelYearSelect from '../components/ModelYearSelect';

export default function Home() {
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Car Dealer App</h1>

      <div className="mb-4">
        <label className="block mb-2">Select Vehicle Make:</label>
        <VehicleMakesSelect
          selectedMake={selectedMake}
          onChange={setSelectedMake}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Select Model Year:</label>
        <ModelYearSelect
          selectedYear={selectedYear}
          onChange={setSelectedYear}
        />
      </div>

      <Link href={`/result/${selectedMake}/${selectedYear}`} passHref>
        <button
          className={`p-2 bg-blue-500 text-white ${
            !selectedMake || !selectedYear ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!selectedMake || !selectedYear}
        >
          Next
        </button>
      </Link>
    </div>
  );
}
