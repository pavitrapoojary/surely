/**
 * Kunji (कुंजी) — Toast Notification Service
 * Renders unhurried, reassuring toasts for simulated saves, copy links, and state updates.
 */

const KunjiToast = (() => {
  function show(message, type = 'default', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'emergency' ? 'toast-emergency' : ''}`;
    
    let iconSvg = KunjiIcons.render('checkCircle', { size: 18, color: '#FFFFFF' });
    if (type === 'emergency') {
      iconSvg = KunjiIcons.render('alertCircle', { size: 18, color: '#FFFFFF' });
    } else if (type === 'info') {
      iconSvg = KunjiIcons.render('sparkles', { size: 18, color: '#FFFFFF' });
    }

    toast.innerHTML = `
      <div style="flex-shrink: 0; display: flex; align-items: center;">${iconSvg}</div>
      <div style="flex: 1; line-height: 1.4;">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 300ms ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  return {
    show,
    success: (msg, dur) => show(msg, 'success', dur),
    emergency: (msg, dur) => show(msg, 'emergency', dur),
    info: (msg, dur) => show(msg, 'info', dur)
  };
})();
