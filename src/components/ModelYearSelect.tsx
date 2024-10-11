interface Props {
    selectedYear: string;
    onChange: (value: string) => void;
  }
  
  export default function ModelYearSelect({ selectedYear, onChange }: Props) {
    const currentYear = new Date().getFullYear();
  
    return (
      <select
        className="p-2 border w-full"
        onChange={(e) => onChange(e.target.value)}
        value={selectedYear}
      >
        <option value="">-- Select Year --</option>
        {Array.from({ length: currentYear - 2015 + 1 }, (_, i) => (
          <option key={i} value={(2015 + i).toString()}>
            {2015 + i}
          </option>
        ))}
      </select>
    );
  }
  