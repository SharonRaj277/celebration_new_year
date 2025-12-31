
import React, { useState } from 'react';

interface NameInputProps {
  currentName: string;
  onUpdate: (name: string) => void;
  onCancel: () => void;
}

const NameInput: React.FC<NameInputProps> = ({ currentName, onUpdate, onCancel }) => {
  const [value, setValue] = useState(currentName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onUpdate(value.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-3 bg-white/5 backdrop-blur-lg p-4 rounded-3xl border border-white/10 animate-fadeIn"
    >
      <input 
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter name..."
        className="px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full md:w-64 transition-all"
        autoFocus
      />
      <div className="flex gap-2 w-full md:w-auto">
        <button 
          type="submit"
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:brightness-110 active:scale-95 transition-all shadow-lg"
        >
          Update
        </button>
        <button 
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-white/10 text-white/70 hover:text-white rounded-full transition-all"
        >
          ✕
        </button>
      </div>
    </form>
  );
};

export default NameInput;
