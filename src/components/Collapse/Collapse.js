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
  const toggleIcon = isVertical ? '▲' : '▶';

  return (
    <Box display="flex" sx={{ flexDirection: isVertical ? 'column' : 'row' }}>
      <Button
        bordered
        flex="1"
        justifyContent="flex-start"
        aria-expanded={isOpen}
        onClick={toggle}
      >
        <Text
          display="flex"
          justifyContent={isVertical ? 'space-between' : 'normal'}
          width={isVertical ? '100%' : 'auto'}
          sx={{
            writingMode: isVertical ? 'horizontal-tb' : 'vertical-lr',
            textOrientation: 'upright',
            whiteSpace: 'nowrap',
          }}
        >
          <div>{label}</div>{' '}
          <Box
            sx={{
              transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 300ms',
            }}
          >
            {toggleIcon}
          </Box>
        </Text>
      </Button>

      <Box
        display={isOpen ? 'block' : 'none'}
        sx={{ border: '2px solid black', marginTop: '-2px' }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Collapse;
