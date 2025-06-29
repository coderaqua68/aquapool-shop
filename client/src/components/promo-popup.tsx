import { useState, useEffect } from 'react';
import { X, Clock, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PromoPopupProps {
  onClose: () => void;
  isVisible: boolean;
}

export function PromoPopup({ onClose, isVisible }: PromoPopupProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date('2025-07-31T23:59:59');
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Здравствуйте! Увидел акцию на сайте AquaPool - бесплатная доставка до 31 июля и скидка 500₽ на первый заказ. Хочу узнать подробности!'
    );
    window.open(`https://wa.me/79999999999?text=${message}`, '_blank');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Закрыть */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Градиентный фон */}
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 px-6 py-8 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-6 h-6" />
              <h3 className="text-xl font-bold">Специальное предложение!</h3>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-cyan-100">🎉 <strong>БЕСПЛАТНАЯ ДОСТАВКА</strong> до 31 июля</p>
              <p className="text-cyan-100">💰 <strong>СКИДКА 500₽</strong> на первый заказ</p>
            </div>

            {/* Таймер */}
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">До окончания акции:</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white/30 rounded p-2">
                  <div className="text-lg font-bold">{timeLeft.days}</div>
                  <div className="text-xs">дней</div>
                </div>
                <div className="bg-white/30 rounded p-2">
                  <div className="text-lg font-bold">{timeLeft.hours}</div>
                  <div className="text-xs">часов</div>
                </div>
                <div className="bg-white/30 rounded p-2">
                  <div className="text-lg font-bold">{timeLeft.minutes}</div>
                  <div className="text-xs">минут</div>
                </div>
                <div className="bg-white/30 rounded p-2">
                  <div className="text-lg font-bold">{timeLeft.seconds}</div>
                  <div className="text-xs">секунд</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Контент */}
        <div className="p-6">
          <p className="text-gray-600 text-center mb-6">
            Напишите нашему менеджеру прямо сейчас и получите персональную скидку!
          </p>

          <div className="space-y-3">
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              📱 Написать в WhatsApp
            </Button>
            
            <button
              onClick={onClose}
              className="w-full text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              Может быть, позже
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}