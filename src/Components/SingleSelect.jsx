// src/SingleSelectDropdown.jsx
const SingleSelectDropdown = ({ options, selected, onSelect }) => {
    return (
      <select
        value={selected || ''}
        onChange={(e) => onSelect(e.target.value || null)}
        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option 
            key={option} 
            value={option}
            className="px-2"
          >
            {option}
          </option>
        ))}
      </select>
    );
  };
  
  export default SingleSelectDropdown;