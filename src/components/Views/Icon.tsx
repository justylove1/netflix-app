import styled from 'styled-components/native';

export const Icon = styled.Image<{
  size?: number | undefined;
  marginHorizontal?: number;
  marginVertical?: number;
}>`
  width: ${props => props.size || 24}px;
  height: ${props => props.size || 24}px;
  margin: ${props => props.marginVertical || 12}px
    ${props => props.marginHorizontal || 12}px;
`;
