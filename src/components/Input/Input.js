import React from 'react';
import { Input as RebassInput, Label } from '@rebass/forms';
import { Box } from 'rebass';

/**
 * Stylized `input` element.
 *
 * @typedef {{
 *  label: React.ReactNode;
 *  hideLabel?: boolean;
 *  tooltip?: string;
 * }}
 *
 * @type {React.FC<React.InputHTMLAttributes>}
 */
const Input = ({
  hideLabel = false,
  label,
  tooltip = label,
  type = 'text',
  ...props
}) => {
  return (
    <Box sx={{ position: 'relative', fontFamily: 'system-ui' }}>
      <Label
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
        height="100%"
        type={type}
        sx={{
          pt: '20px',
          pb: '4px',
          border: '1px solid transparent',
          transition: 'border 300ms',
          '&:focus': { border: '1px solid black' },
        }}
        {...props}
      />
    </Box>
  );
};

export default Input;
