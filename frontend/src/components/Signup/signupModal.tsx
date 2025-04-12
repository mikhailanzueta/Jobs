// components/SuccessModal.tsx
import React from 'react'

interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold text-wheat-600 mb-4">Account Created!</h2>
        <p className="text-gray-700 mb-6">
          A verification link has been sent to your email. Please check your inbox and verify your account.
        </p>
        <button
          onClick={onClose}
          className="bg-dark-slate-gray text-white px-4 py-2 rounded hover:bg-wheat hover:text-black hover:border-none-600 transition"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
