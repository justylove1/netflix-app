import React, {memo, ReactElement, useCallback, useEffect} from 'react';
import {styled, useNavigation} from '@/global';
import {Keyboard, StatusBar, ViewProps, ViewStyle} from 'react-native';
import {StyledText} from '../CommonStyled';
import {IC_CLOSE, IC_DROPDOWN} from '@/assets';
import {SearchBar} from '@/components/SearchBar';
import {StatusBarView} from '@/components/Header/DynamicHeader';
import {Colors} from '@/themes';

const Wrapper = styled.View`
  background-color: ${Colors.backgroundHeader};
`;

const LeftActions = styled.View`
  margin-left: 8px;
`;
const RightActions = styled.View`
  margin-right: 8px;
`;

const Container = styled.View<{hideSeparator?: boolean}>`
  flex-direction: row;
  justify-content: space-between;
  height: 48px;
  align-items: center;
  border-bottom-color: ${Colors.grey5}80;
  border-bottom-width: ${p => (p.hideSeparator ? 0 : 1)}px;
`;

const ViewSearch = styled.View`
  justify-content: center;
  flex: 1;
`;

const IconWhite = styled.Image`
  tint-color: ${Colors.white};
`;

const ContainerSearch = styled.View<{hideSeparator?: boolean}>`
  height: 48px;
  flex-direction: row;
  border-bottom-color: ${Colors.grey5}80;
  border-bottom-width: ${p => (p.hideSeparator ? 0 : 1)}px;
`;

const Title = styled(StyledText.Medium)`
  font-size: 20px;
  color: ${Colors.white}
  line-height: 22px;
  text-align: center;
`;
const SImage = styled.Image`
  tint-color: ${Colors.white};
`;

const STouchTitle = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  flex: 1;
`;

export const HeaderIconWrapper = styled.TouchableOpacity`
  min-width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

interface DynamicHeaderProps extends ViewProps {
  title: string;
  isSearch: boolean;
  onPresTitle?: () => void;
  onChangeText: (text: string) => void;
  styleTitle?: ViewStyle;
  hideInputSearch: () => void;
  hideSeparator?: boolean;
  children?: ReactElement | ReactElement[] | null;
}

export const DynamicHeaderWithSearch = memo(function DynamicHeaderWithSearch({
  title,
  isSearch,
  hideInputSearch,
  onChangeText,
  children,
  hideSeparator,
  onPresTitle,
  styleTitle,
  ...props
}: DynamicHeaderProps) {
  const {canGoBack, goBack} = useNavigation();

  useEffect(() => {
    const entry = StatusBar.pushStackEntry({
      barStyle: 'light-content',
    });

    return () => {
      StatusBar.popStackEntry(entry);
    };
  }, []);

  const hide = useCallback(async () => {
    await Keyboard.dismiss;
    onChangeText('');
    hideInputSearch();
  }, [hideInputSearch, onChangeText]);

  return (
    <Wrapper {...props}>
      <StatusBarView />
      {!isSearch && (
        <Container hideSeparator={hideSeparator}>
          <LeftActions>
            {canGoBack() ? (
              <HeaderIconWrapper onPress={goBack}>
                <IconWhite source={require('./assets/back_icon.png')} />
              </HeaderIconWrapper>
            ) : null}
          </LeftActions>
          <STouchTitle
            activeOpacity={0.6}
            disabled={!onPresTitle}
            onPress={onPresTitle}>
            <Title style={styleTitle} numberOfLines={1}>
              {title}
            </Title>
            {onPresTitle && <SImage source={IC_DROPDOWN} />}
          </STouchTitle>

          <RightActions>
            {!children && canGoBack() ? <HeaderIconWrapper /> : null}
            {children}
          </RightActions>
        </Container>
      )}
      {isSearch && (
        <ContainerSearch hideSeparator={hideSeparator}>
          <ViewSearch>
            <SearchBar autoFocus={true} onSearchTextChange={onChangeText} />
          </ViewSearch>
          <RightActions>
            <HeaderIconWrapper onPress={hide}>
              <IconWhite source={IC_CLOSE} />
            </HeaderIconWrapper>
          </RightActions>
        </ContainerSearch>
      )}
    </Wrapper>
  );
});
