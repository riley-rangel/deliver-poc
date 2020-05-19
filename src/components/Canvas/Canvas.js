import React from 'react';

import { Box } from 'rebass';

/**
 * Component which dictates the visual representation of a user's interaction with elements inside of the document.
 */
const Canvas = React.forwardRef(
  ({ activeEl, selectableEl, children, canvasId = 'canvas' }, ref) => {
    /**
     * Show user which element is selectable.
     */
    React.useEffect(() => {
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
    React.useEffect(() => {
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
        sx={{
          height: '100vh',
          '&:empty': {
            ':before': {
              position: 'absolute',
              content: activeEl
                ? '"Now, add a new element!"'
                : '"Click me to get started!"',
              top: '50%',
              width: '100%',
              textAlign: 'center',
            },
          },
          '&[data-selectable]:not([data-active]),*[data-selectable]:not([data-active])': {
            outline: '2px solid blueviolet',
            outlineOffset: '-2px',
          },
          '&[data-active],*[data-active]': {
            outline: '2px solid lawngreen',
            outlineOffset: '-2px',
          },
        }}
      >
        {children}
      </Box>
    );
  }
);

export default Canvas;
