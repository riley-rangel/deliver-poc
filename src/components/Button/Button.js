import React from 'react';
import { Button as RebassButton } from 'rebass';

/**
 * @typedef {{
 *  bordered?: boolean;
 *  fullWidth?: boolean;
 * }} ButtonProps
 *
 * @type {React.FC<import('rebass').ButtonProps & ButtonProps>}
 */
const Button = ({
  bordered = false,
  children,
  fullWidth = false,
  sx = {},
  ...props
}) => {
  return (
    <RebassButton
      display="flex"
      color="black"
      alignItems="center"
      justifyContent="center"
      p="1rem"
      width={fullWidth ? '100%' : 'auto'}
      bg="white"
      sx={{
        cursor: 'pointer',
        border: bordered ? '2px solid black' : 'none',
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
    </RebassButton>
  );
};

export default Button;
