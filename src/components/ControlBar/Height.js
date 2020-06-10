import React from 'react';
import { Box } from 'rebass';

import { Input } from '../Input';

const Height = ({ onChange }) => {
  return (
    <Box>
      <Input id="height" label="Height" />
    </Box>
  );
};

export default Height;
