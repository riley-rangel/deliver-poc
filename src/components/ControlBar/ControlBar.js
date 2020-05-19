import React from 'react';
import { Box } from 'rebass';

/**
 * UI component responsible for visual representation of the control bar API.
 * */
const ControlBar = ({ children }) => {
  return (
    <Box
      display="flex"
      height="90px"
      width="100%"
      p={2}
      sx={{ position: 'fixed', bottom: 0 }}
    >
      <Box display="flex" sx={{ border: '2px solid black' }}>
        {children}
      </Box>
    </Box>
  );
};

export default ControlBar;
