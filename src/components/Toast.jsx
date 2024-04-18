// src/components/Toast.js
export default function Toast({ message, onClose, type = 'success' }) {
  const backgroundColor = type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  return (
    <div className={`fixed top-5 right-5 ${backgroundColor} text-white py-2 px-4 rounded shadow-lg`}>
      {message}
      <button onClick={onClose} className='text-lg ml-4'>
        &times;
      </button>
    </div>
  );
}
