// src/MultiSelectDropdown.jsx
import { useState, useRef } from 'react';
import useClickOutside from '../utils/useClickOutsideHook';

const MultiSelectDropdown = ({ 
  options, 
  selected, 
  onSelect, 
  newItem, 
  setNewItem, 
  error,
  setError,
  handleAddNewItem 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const toggleOption = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onSelect(newSelected);
  };

  const toggleAll = () => {
    onSelect(options.every(opt => selected.includes(opt)) ? [] : [...options]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`p-2 min-h-[40px] border rounded-md cursor-pointer transition-all ${
          isOpen ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:border-gray-400'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span className="text-gray-400">Select options</span>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selected.map(option => (
              <span
                key={option}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {option}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(option);
                  }}
                  className="hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10 animate-dropdown-fade">
          <div className="max-h-60 overflow-y-auto">
            <label className="flex items-center p-2 hover:bg-gray-50 cursor-pointer border-b">
              <input
                type="checkbox"
                checked={options.every(opt => selected.includes(opt))}
                onChange={toggleAll}
                className="mr-2 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Select All</span>
            </label>

            {options.map(option => (
              <label
                key={option}
                className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}

            <div className="p-2 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => {
                    setNewItem(e.target.value);
                    setError('');
                  }}
                  placeholder="Add new item"
                  className={`flex-1 px-2 py-1 text-sm border rounded-md ${
                    error ? 'border-red-500 ring-red-500' : 'focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddNewItem();
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;