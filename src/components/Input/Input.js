import React from 'react';
import { Input as RebassInput, Label } from '@rebass/forms';
import { Box } from 'rebass';

/**
 * Stylized `input` element.
 *
 * @typedef {{
 *  id: string;
 *  name?: string;
 *  label: React.ReactNode;
 *  hideLabel?: boolean;
 *  tooltip?: string;
 * }} InputProps
 *
 * @type {React.FC<React.InputHTMLAttributes & InputProps>}
 */
const Input = ({
  id,
  name = id,
  hideLabel = false,
  label,
  tooltip = label,
  type = 'text',
  ...props
}) => {
  return (
    <Box sx={{ position: 'relative', fontFamily: 'system-ui' }}>
      <Label
        htmlFor={id}
        title={tooltip}
        sx={{
          position: 'absolute',
          top: '4px',
          left: 0,
          pl: '8px',
          fontSize: 'small',
          color: 'gray',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          ...(hideLabel
            ? {
                position: 'absolute',
                width: '1px',
                height: '1px',
                margin: '-1px',
                border: 0,
                padding: 0,
                clip: 'rect(0 0 0 0)',
                overflow: 'hidden',
              }
            : {}),
        }}
      >
        {label}
      </Label>

      <RebassInput
        id={id}
        height="100%"
        name={name}
        type={type}
        sx={{
          pt: '24px',
          pb: '4px',
          bg: 'rgb(0, 0, 0, 0.05)',
          border: 'none',
          transition: 'border 300ms, background-color 300ms, color 300ms',
          '&:hover': {
            bg: 'rgb(0, 0, 0, 0.1)',
          },
          '&:focus': {
            bg: 'white',
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default Input;
