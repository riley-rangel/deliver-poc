import React, { useState, useCallback } from 'react';
import { Box, Text } from 'rebass';

import { Button } from '../Button';

/**
 * Collapsible component with a trigger to show and hide content. Can be used vertically or horizontally.
 *
 * @typedef {{
 *  isOpenDefault?: boolean;
 *  label: React.ReactNode;
 *  orientation?: 'horizontal' | 'vertical';
 * }} CollapseProps
 *
 * @type {React.FC<CollapseProps>}
 */
const Collapse = ({
  children,
  isOpenDefault = true,
  label,
  orientation = 'vertical',
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const isVertical = orientation === 'vertical';
  const openIcon = isVertical ? '▲' : '▶';
  const closedIcon = isVertical ? '▼' : '◀';

  return (
    <Box display="flex" sx={{ flexDirection: isVertical ? 'column' : 'row' }}>
      <Button flex="1" aria-expanded={isOpen} onClick={toggle} width="100%">
        <Text
          sx={{
            writingMode: isVertical ? 'horizontal-tb' : 'vertical-lr',
            textOrientation: 'upright',
            whiteSpace: 'nowrap',
          }}
        >
          {`${label} ${isOpen ? openIcon : closedIcon}`}
        </Text>
      </Button>

      {isOpen && children}
    </Box>
  );
};

export default Collapse;
