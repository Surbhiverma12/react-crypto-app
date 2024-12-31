import React from 'react';

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-2
        md:px-4 md:py-2.5
        text-sm md:text-base
        font-montserrat
        rounded-md
        transition-all
        duration-200
        min-w-[80px] md:min-w-[100px]
        ${
          selected
            ? 'bg-yellow-500 text-black font-bold hover:bg-yellow-600'
            : 'border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10'
        }
        focus:outline-none
        focus:ring-2
        focus:ring-yellow-500
        focus:ring-opacity-50
        disabled:opacity-50
        disabled:cursor-not-allowed
      `}
    >
      {children}
    </button>
  );
};

export default SelectButton;