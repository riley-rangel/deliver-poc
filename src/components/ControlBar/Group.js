import React from 'react';
import { Text, Box } from 'rebass';

const Group = ({ children, label }) => {
  return (
    <Box
      sx={{
        mt: '-2px',
        borderTop: '2px solid black',
        borderBottom: '2px solid black',
        '&:last-of-type': {
          borderBottom: 'none',
        },
      }}
    >
      <Text
        fontFamily="system-ui"
        fontSize="small"
        px={2}
        py={1}
        sx={{ borderBottom: '2px solid black' }}
      >
        {label}
      </Text>

      {children}
    </Box>
  );
};

export default Group;
