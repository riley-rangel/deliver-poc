import { useState, useCallback } from 'react';

export default function useCounter(initialValue, step = 1) {
  const [count, setCount] = useState(initialValue);

  const decrement = useCallback(() => {
    setCount(Number(count) > 0 ? Number(count) - step : 0);
  }, [count, step]);

  const increment = useCallback(() => {
    setCount(Number(count) + step);
  }, [count, step]);

  return {
    count,
    decrement,
    increment,
    setCount,
  };
}
