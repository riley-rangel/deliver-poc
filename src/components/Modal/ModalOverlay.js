import React from 'react';
import { Box } from 'rebass';

const ModalOverlay = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        bg: 'rgba(0,0,0,0.25)',
        zIndex: 1,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ModalOverlay;
