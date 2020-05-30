import React from 'react';
import { Button } from 'rebass';

/**
 * @typedef {{
 *  fullWidth?: boolean;
 * }} ButtonProps
 *
 * @type {React.FC<import('rebass').ButtonProps & ButtonProps>}
 */
const Control = ({ children, fullWidth = false, sx, ...props }) => {
  return (
    <Button
      display="flex"
      color="black"
      alignItems="center"
      justifyContent="center"
      p="1rem"
      width={fullWidth ? '100%' : 'auto'}
      sx={{
        cursor: 'pointer',
        borderRadius: 0,
        ':hover:not(:disabled)': {
          bg: 'black',
          color: 'white',
        },
        transition: 'background-color 300ms, color 300ms',
        '&:disabled': {
          opacity: 0.75,
          bg: 'lightgray',
          cursor: 'not-allowed',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Control;
