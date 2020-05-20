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
      m={2}
      sx={{
        position: 'fixed',
        bottom: 0,
        border: '2px solid black',
        boxShadow: '4px 4px rgba(0,0,0,0.5)',
      }}
    >
      {children}
    </Box>
  );
};

export default ControlBar;
