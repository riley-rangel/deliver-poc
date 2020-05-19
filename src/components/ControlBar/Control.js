import React from 'react';
import { Button } from 'rebass';

/**
 * @type {{ typeof Button }}
 */
const Control = ({ children, sx, ...props }) => {
  return (
    <Button
      display="flex"
      color="black"
      alignItems="center"
      height="100%"
      p="1rem"
      sx={{
        cursor: 'pointer',
        borderRadius: 0,
        ':hover:not(:disabled)': {
          bg: 'black',
          color: 'white',
          transition: 'background-color 300ms, color 300ms',
        },
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
