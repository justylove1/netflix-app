import React, {memo, PropsWithChildren} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {ViewStyle} from 'react-native';

export interface BlockViewInterface {
  borderRadius?: number;
  containerStyle?: ViewStyle;
  color?: string;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  isDashed?: boolean;
  shadowColor?: string;
  isRotate?: boolean;
  subBoxStyles?: ViewStyle;
}

export const BlockView = memo(function BlockView({
  children,
  borderRadius,
  containerStyle,
  color,
  top,
  bottom,
  right,
  left,
  isDashed,
  shadowColor,
  isRotate,
  subBoxStyles,
}: PropsWithChildren<BlockViewInterface>) {
  return (
    <SWrapper style={containerStyle}>
      <Container
        borderRadius={borderRadius}
        shadowColor={shadowColor}
        isRotate={isRotate}>
        <BlockWrapper
          color={color}
          borderRadius={borderRadius}
          top={top}
          bottom={bottom}
          right={right}
          left={left}
          isDashed={isDashed}
          style={subBoxStyles}
          isRotate={isRotate}>
          {children}
        </BlockWrapper>
      </Container>
    </SWrapper>
  );
});
const SWrapper = styled.View`
  align-items: center;
`;

const Container = styled.View<{
  borderRadius?: number;
  shadowColor?: string;
  isRotate?: boolean;
}>`
  border-radius: ${props => (props.borderRadius ? props.borderRadius : 1)}px;
  background-color: ${props => props.shadowColor || Colors.white};
  border-width: 1px;
  align-items: center;
  padding: ${props => (props.isRotate ? 1.5 : 0)}px;
  transform: rotate(${props => (props.isRotate ? '-3.5deg' : '0deg')});
`;

const BlockWrapper = styled.View<{
  borderRadius?: number;
  color?: string;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  isDashed?: boolean;
  isRotate?: boolean;
}>`
  transform: rotate(${props => (props.isRotate ? '3.5deg' : '0deg')});
  top: ${props => props.top || -2.5};
  left: ${props => props.left || -2.5};
  bottom: ${props => props.bottom || 0};
  right: ${props => props.right || 0};
  padding: 4px 16px;
  border-width: 1px;
  border-style: ${props => (props.isDashed ? 'dashed' : 'solid')};
  flex-direction: row;
  border-color: ${Colors.gray1};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : 1)}px;
  background-color: ${props => (props.color ? props.color : Colors.gray5)};
`;
