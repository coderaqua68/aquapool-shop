import { useState, useEffect } from 'react';

const POPUP_SHOWN_KEY = 'aquapool_promo_popup_shown';
const POPUP_DELAY = 30000; // 30 секунд

export function usePromoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, показывался ли попап в этой сессии
    const wasShown = sessionStorage.getItem(POPUP_SHOWN_KEY);
    
    if (!wasShown) {
      // Показываем попап через минуту
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, POPUP_DELAY);

      return () => clearTimeout(timer);
    }
  }, []);

  const hidePopup = () => {
    setIsVisible(false);
    // Отмечаем, что попап был показан в этой сессии
    sessionStorage.setItem(POPUP_SHOWN_KEY, 'true');
  };

  return {
    isVisible,
    hidePopup
  };
}