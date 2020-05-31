import React from 'react';
import { Box } from 'rebass';

/**
 * @typedef {{
 *  orientation: 'vertical' | 'horizontal';
 *  sideX: 'left' | 'right';
 *  sideY: 'top' | 'bottom';
 *  stackOrder: number;
 * }} ControlBarProps
 */

/**
 * UI component responsible for visual representation of the control bar API.
 *
 * @type {React.FC<ControlBarProps>}
 * */
const ControlBar = ({
  children,
  orientation,
  sideX,
  sideY,
  stackOrder = 1,
  width,
}) => {
  return (
    <Box
      display="flex"
      m={2}
      width={width}
      sx={{
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        position: 'fixed',
        [sideX]: 0,
        [sideY]: 0,
        border: '2px solid black',
        boxShadow: '4px 4px rgba(0,0,0,0.5)',
        bg: 'white',
        zIndex: stackOrder,
      }}
    >
      {children}
    </Box>
  );
};

export default ControlBar;
