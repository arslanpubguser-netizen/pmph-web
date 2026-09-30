import { useEffect, useRef, useState } from 'react';

interface CountdownProps {
  targetDate: string;
  className?: string;
}

export function Countdown({ targetDate, className = '' }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    intervalRef.current = setInterval(calc, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [targetDate]);

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="bg-bg-base border border-border rounded-md w-12 h-12 flex items-center justify-center font-display font-bold text-lg text-primary">
              {String(item.value).padStart(2, '0')}
            </div>
            <span className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">{item.label}</span>
          </div>
          {i < items.length - 1 && <span className="text-border font-bold -mt-4">:</span>}
        </div>
      ))}
    </div>
  );
}
