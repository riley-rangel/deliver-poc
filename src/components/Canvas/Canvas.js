import React from 'react';

import { Box } from 'rebass';

/**
 * Component which dictates the visual representation of a user's interaction with elements inside of the document.
 */
const Canvas = React.forwardRef(
  ({ canvasId = 'canvas', children, hasActiveElement }, ref) => {
    return (
      <Box
        data-canvasid={canvasId}
        ref={ref}
        overflow="auto"
        sx={{
          minHeight: '100vh',
          '&:empty': {
            ':before': {
              fontFamily: 'system-ui',
              position: 'absolute',
              content: hasActiveElement
                ? '"Now, add a new element!"'
                : '"Click me to get started!"',
              top: '50%',
              width: '100%',
              textAlign: 'center',
            },
          },
        }}
      >
        {children}
      </Box>
    );
  }
);

Canvas.displayName = 'Canvas';

export default Canvas;
