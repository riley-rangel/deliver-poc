import React from 'react';
import { Box } from 'rebass';

import Input from './Input';
import { Button } from '../Button';

/**
 * Input component which will only accept numeric input values.
 *
 * @type {React.FC<React.ComponentProps<typeof Input>> & {
 *  WithControls: typeof NumericWithControls;
 * }}
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

const Control = (props) => {
  return <Button fullWidth minWidth="40px" sx={{ flex: 1 }} {...props} />;
};

/**
 * @typedef {{
 *  iconDecrement?: React.ReactNode;
 *  iconIncrement?: React.ReactNode;
 *  onDecrement: () => void;
 *  onIncrement: () => void;
 * }} WithControlsProps
 *
 * @type {React.FC<React.ComponentProps<typeof Numeric> & WithControlsProps>}
 */
const NumericWithControls = ({
  iconDecrement = '-',
  iconIncrement = '+',
  onDecrement,
  onIncrement,
  ...props
}) => {
  return (
    <Box display="flex">
      <Control onClick={onDecrement} sx={{ flex: 1 }}>
        {iconDecrement}
      </Control>

      <Numeric {...props} />

      <Control onClick={onIncrement} sx={{ flex: 1 }}>
        {iconIncrement}
      </Control>
    </Box>
  );
};

Numeric.WithControls = NumericWithControls;

export default Numeric;
