import React, { useEffect } from 'react';

import { Box } from 'rebass';

/**
 * Component which dictates the visual representation of a user's interaction with elements inside of the document.
 */
const Canvas = React.forwardRef(
  ({ activeEl, selectableEl, children, canvasId = 'canvas' }, ref) => {
    /**
     * Show user which element is selectable.
     */
    useEffect(() => {
      if (selectableEl) {
        selectableEl.setAttribute('data-selectable', true);
      }

      return () => {
        if (selectableEl) {
          selectableEl.removeAttribute('data-selectable');
        }
      };
    }, [selectableEl]);

    /**
     * Show user which element is active.
     */
    useEffect(() => {
      if (activeEl) {
        activeEl.setAttribute('data-active', true);
      }

      return () => {
        if (activeEl) {
          activeEl.removeAttribute('data-active');
        }
      };
    }, [activeEl]);

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
              content: activeEl
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

export default Canvas;
