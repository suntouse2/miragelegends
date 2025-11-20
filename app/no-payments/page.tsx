// Предполагается, что вы используете Tailwind CSS
export default function NoPayment() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white border-l-4 border-red-500 p-6 rounded-lg shadow-xl max-w-sm w-full text-center transform transition duration-500 hover:scale-[1.02]">
        <div className="text-red-500 mb-4">
          <svg
            className="w-12 h-12 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Приём платежей временно приостановлен
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Мы работаем над устранением неполадок. Пожалуйста, попробуйте
          повторить попытку через несколько минут. Приносим извинения за
          доставленные неудобства.
        </p>
        <div className="mt-6">
          <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200">
            Обновить страницу
          </button>
        </div>
      </div>
    </div>
  );
}
