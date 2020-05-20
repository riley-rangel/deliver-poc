import React from 'react';
import { Box } from 'rebass';

import ModalOverlay from './ModalOverlay';

const Modal = ({ children, onClose, ...props }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <Box
        sx={{
          m: 'auto',
          border: '2px solid black',
          p: '1rem',
          bg: 'white',
          boxShadow: '4px 4px rgba(0,0,0,0.5)',
        }}
        {...props}
      >
        {children}
      </Box>
    </ModalOverlay>
  );
};

export default Modal;
