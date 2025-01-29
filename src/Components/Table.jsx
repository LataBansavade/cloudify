import { useState, useEffect } from "react";
import Row from "./Row";
import { motion } from "framer-motion";
import { FaPlus, FaTrash } from "react-icons/fa";

const getInitialData = () => {
  const savedData = localStorage.getItem("tableData");
  return savedData
    ? JSON.parse(savedData)
    : {
        rows: [{ id: Date.now(), label1: null, label2: [] }],
        column1Options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        column2Options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      };
};

function Table() {
  const [data, setData] = useState(getInitialData());
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(data));
  }, [data]);

  const addRow = () => {
    const newRow = { id: Date.now(), label1: null, label2: [] };
    setData((prev) => ({ ...prev, rows: [...prev.rows, newRow] }));
  };

  const deleteRow = (rowId) => {
    setData((prev) => ({ ...prev, rows: prev.rows.filter((row) => row.id !== rowId) }));
  };

  const deleteAllRows = () => {
    setData((prev) => ({ ...prev, rows: [] }));
  };

  const updateRow = (rowId, updates) => {
    setData((prev) => ({
      ...prev,
      rows: prev.rows.map((row) => (row.id === rowId ? { ...row, ...updates } : row)),
    }));
  };

  const handleAddNewItem = () => {
    const trimmedItem = newItem.trim();
    if (!trimmedItem) {
      setError("Item cannot be empty!");
      return;
    }
    if (data.column2Options.includes(trimmedItem)) {
      setError("Item already exists!");
      return;
    }
    setData((prev) => ({ ...prev, column2Options: [...prev.column2Options, trimmedItem] }));
    setNewItem("");
    setError("");
  };

  return (
    <div className="p-6 max-w-full mx-auto min-h-screen  flex flex-col items-center">
      
       <motion.h1
  className="text-center mt-8 mb-6 text-5xl font-extrabold bg-clip-text text-transparent"
  style={{
    WebkitBackgroundClip: "text",
    backgroundImage: "linear-gradient(90deg, #ff6a00, #ee0979)",
    display: "inline-block",
  }}
  animate={{
    backgroundImage: [
      "linear-gradient(90deg, #ff6a00, #ee0979)",
      "linear-gradient(90deg, #da22ff, #9733ee)",
      "linear-gradient(90deg, #ff512f, #dd2476)",
    ],
    transition: { duration: 3, repeat: Infinity, repeatType: "reverse" },
  }}
>
  {"Dynamic Table".split("").map((letter, index) => (
    <motion.span
      key={index}
      initial={{ y: 0 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.1 }}
    >
      {letter}
    </motion.span>
  ))}
</motion.h1>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

      <motion.table 
        className="w-4xl border-collapse shadow-2xl bg-white rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <thead className="bg-gradient-to-r from-pink-600 to-purple-800 text-white">
          <tr>
            <th className="p-3 text-center border-r">Label 1</th>
            <th className="p-3 text-center border-r">Label 2</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <Row
              key={row.id}
              row={row}
              allRows={data.rows}
              column1Options={data.column1Options}
              column2Options={data.column2Options}
              updateRow={updateRow}
              deleteRow={deleteRow}
              newItem={newItem}
              setNewItem={setNewItem}
              error={error}
              setError={setError}
              handleAddNewItem={handleAddNewItem}
            />
          ))}
        </tbody>
      </motion.table>

      <div className="mt-6 flex gap-4">
        <motion.button
          onClick={addRow}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
        >
          <FaPlus /> Add Row
        </motion.button>

        <motion.button
          onClick={deleteAllRows}
          className="px-6 py-2 bg-gradient-to-r from-gray-700 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
        >
          <FaTrash /> Delete All Rows
        </motion.button>
      </div>
    </div>
  );
}

export default Table;
