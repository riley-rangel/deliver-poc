import React from 'react';
import { Box } from 'rebass';

const SelectableIndicator = ({
  clientRect,
  color = 'green',
  width = '2px',
  style = 'dashed',
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: `${clientRect.top + window.scrollY}px`,
        left: `${clientRect.left + window.scrollX}px`,
        borderStyle: style,
        borderWidth: width,
        borderColor: color,
        height: `${clientRect.height}px`,
        width: `${clientRect.width}px`,
        pointerEvents: 'none',
        opacity: 0.3,
      }}
    />
  );
};

export default SelectableIndicator;
