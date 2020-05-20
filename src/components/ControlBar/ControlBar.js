import React from 'react';
import { Box } from 'rebass';

/**
 * @typedef {{
 *  orientation: 'vertical' | 'horizontal';
 *  sideX: 'left' | 'right';
 *  sideY: 'top' | 'bottom';
 * }} ControlBarProps
 */

/**
 * UI component responsible for visual representation of the control bar API.
 *
 * @type {React.FC<ControlBarProps>}
 * */
const ControlBar = ({ children, orientation, sideX, sideY }) => {
  return (
    <Box
      display="flex"
      m={2}
      sx={{
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        position: 'fixed',
        [sideX]: 0,
        [sideY]: 0,
        border: '2px solid black',
        boxShadow: '4px 4px rgba(0,0,0,0.5)',
      }}
    >
      {children}
    </Box>
  );
};

export default ControlBar;
