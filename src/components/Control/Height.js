import React, { useEffect, useRef } from 'react';
import { Box } from 'rebass';

import { NumericInput } from '../Input';

import { useCounter } from '../../hooks';

const Height = ({ onChange }) => {
  const { count, decrement, increment, setCount } = useCounter('');
  const prevCount = useRef();

  useEffect(() => {
    if (count !== prevCount.current) {
      onChange({ 'min-height': `${count}px` });
    }

    prevCount.current = count;
  }, [count, onChange]);

  return (
    <Box>
      <NumericInput.WithControls
        id="height"
        label="Height"
        placeholder="Auto"
        onChange={({ target }) =>
          setCount(target.value && Number(target.value))
        }
        onIncrement={increment}
        onDecrement={decrement}
        value={count}
      />
    </Box>
  );
};

export default Height;
