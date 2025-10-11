const showToast = (type, title, description) => {
  // Remove any existing toast
  const existingToast = document.getElementById('pokemon-toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create new toast
  const toast = document.createElement('div');
  toast.id = 'pokemon-toast';
  toast.className = `fixed bottom-4 right-4 z-50 p-4 rounded-lg border-2 shadow-lg animate-slide-in-right max-w-sm backdrop-blur-sm ${
    type === 'success' 
      ? 'bg-green-100/90 border-green-400 text-green-900' 
      : 'bg-red-100/90 border-red-400 text-red-900'
  }`;
  
  toast.innerHTML = `
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
        type === 'success' 
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white'
      }">
        ${type === 'success' ? '✓' : '✕'}
      </div>
      <div class="flex-1 min-w-0">
        <div class="font-digital font-bold text-sm tracking-wide">${title}</div>
        <div class="font-digital text-xs text-gray-700 mt-0.5 leading-relaxed">${description}</div>
      </div>
      <button 
        onclick="this.parentElement.parentElement.remove()" 
        class="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors text-lg leading-none -mt-1 -mr-1"
      >
        ×
      </button>
    </div>
  `;

  document.body.appendChild(toast);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 5000);
};