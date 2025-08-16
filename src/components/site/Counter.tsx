import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 3000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true
  });

  useEffect(() => {
    if (!inView) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const timePassed = Date.now() - startTime;
      const progress = Math.min(timePassed / duration, 1);
      
      // Cubic easing function for smoother animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      // Use decimal places for smoother appearance
      const currentCount = Math.min(end, easeOutCubic(progress) * end);
      const roundedCount = Math.floor(currentCount);
      
      if (roundedCount !== countRef.current) {
        countRef.current = roundedCount;
        setCount(roundedCount);
      }

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 10); // Increased frame rate for smoother animation

    return () => clearInterval(timer);
  }, [end, duration, inView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default Counter;
