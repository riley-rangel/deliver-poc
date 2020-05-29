import React from 'react';
import { Box } from 'rebass';

/**
 * Component responsible for the visual representation of the user's "active" element.
 */
const ActiveIndicator = ({
  clientRect,
  computedStyles,
  colorMargin = 'orange',
  colorBorder = 'yellow',
  colorPadding = 'green',
  colorContent = 'dodgerblue',
}) => {
  const styles = {
    mt: computedStyles.getPropertyValue('margin-top'),
    mr: computedStyles.getPropertyValue('margin-right'),
    mb: computedStyles.getPropertyValue('margin-bottom'),
    ml: computedStyles.getPropertyValue('margin-left'),
    bt: computedStyles.getPropertyValue('border-top-width'),
    br: computedStyles.getPropertyValue('border-right-width'),
    bb: computedStyles.getPropertyValue('border-bottom-width'),
    bl: computedStyles.getPropertyValue('border-left-width'),
    pt: computedStyles.getPropertyValue('padding-top'),
    pr: computedStyles.getPropertyValue('padding-right'),
    pb: computedStyles.getPropertyValue('padding-bottom'),
    pl: computedStyles.getPropertyValue('padding-left'),
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: `calc(${clientRect.top + window.scrollY}px - ${styles.mt})`,
        left: `calc(${clientRect.left + window.scrollX}px - ${styles.ml})`,
        height: `calc(${clientRect.height}px + ${styles.mt} + ${styles.mb})`,
        width: `calc(${clientRect.width}px + ${styles.ml} + ${styles.mr})`,
        borderTopWidth: styles.mt,
        borderRightWidth: styles.mr,
        borderBottomWidth: styles.mb,
        borderLeftWidth: styles.ml,
        borderStyle: 'solid',
        borderColor: colorMargin,
        pointerEvents: 'none',
        opacity: 0.3,
      }}
    >
      <Box
        height="100%"
        sx={{
          borderTopWidth: styles.bt,
          borderRightWidth: styles.br,
          borderBottomWidth: styles.bb,
          borderLeftWidth: styles.bl,
          borderStyle: 'solid',
          borderColor: colorBorder,
        }}
      >
        <Box
          height="100%"
          sx={{
            borderTopWidth: styles.pt,
            borderRightWidth: styles.pr,
            borderBottomWidth: styles.pb,
            borderLeftWidth: styles.pl,
            borderStyle: 'solid',
            borderColor: colorPadding,
          }}
        >
          <Box height="100%" bg={colorContent} />
        </Box>
      </Box>
    </Box>
  );
};

export default ActiveIndicator;
