import React from 'react';

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-3xl">
      <div className="relative w-11/12 max-w-md bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-cyan-200 focus:outline-none"
        >
          <span className="text-2xl">&times;</span>
        </button>

        {/* Title */}
        {title && <h3 className="text-2xl text-cyan-300 font-semibold mb-4">{title}</h3>}

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
