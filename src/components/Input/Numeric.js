import React from 'react';

import Input from './Input';

/**
 * Input component which will only accept numeric input values.
 *
 * @type {React.FC<React.ComponentProps<typeof Input>>}
 */
const Numeric = ({ onChange, ...props }) => {
  return (
    <Input
      {...props}
      inputMode="numeric"
      pattern="[0-9]*"
      onChange={(event) => {
        if (onChange) {
          onChange({
            ...event,
            target: {
              ...event.target,
              value: event.target.value.replace(/\D/g, ''),
            },
          });
        }
      }}
    />
  );
};

export default Numeric;
