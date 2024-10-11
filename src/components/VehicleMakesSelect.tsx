import { useState, useEffect } from 'react';

interface Make {
  MakeId: number;
  MakeName: string;
}

interface Props {
  selectedMake: string;
  onChange: (value: string) => void;
}

export default function VehicleMakesSelect({ selectedMake, onChange }: Props) {
  const [makes, setMakes] = useState<Make[]>([]);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const res = await fetch(
          'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
        );
        const data = await res.json();
        setMakes(data.Results);
      } catch (error) {
        console.error('Error fetching vehicle makes:', error);
      }
    };
    fetchMakes();
  }, []);

  return (
    <select
      className="p-2 border w-full"
      onChange={(e) => onChange(e.target.value)}
      value={selectedMake}
    >
      <option value="">-- Select Make --</option>
      {makes.map((make) => (
        <option key={make.MakeId} value={make.MakeId}>
          {make.MakeName}
        </option>
      ))}
    </select>
  );
}
