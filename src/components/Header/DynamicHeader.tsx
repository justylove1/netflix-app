import React, {
  memo,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
} from 'react';
import {styled, useNavigation} from '@/global';
import {
  Image,
  Platform,
  StatusBar,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import {StyledText} from '../CommonStyled';
import {IC_CLOSE} from '@/assets';
import {Colors} from '@/themes/Colors';

const Wrapper = styled.View`
  background-color: ${Colors.backgroundColor};
`;

const TransparentWrapper = styled.View`
  width: 100%;
  background-color: ${Colors.backgroundColor};
`;

const LeftActions = styled.View``;
const RightActions = styled.View`
  margin-right: 8px;
`;

const Container = styled.View<{hideSeparator?: boolean}>`
  flex-direction: row;
  justify-content: space-between;
  height: 48px;
  align-items: center;
`;

const TransparentContainer = styled.View<{hideSeparator?: boolean}>`
  flex-direction: row;
  justify-content: space-between;
  height: 48px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.grey6};
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${Colors.black};
  line-height: 22px;
  padding: 0 16px;
  text-align: center;
`;

const LeftTitle = styled(Title)`
  text-align: left;
`;

const LeftTransparentTitle = styled(Title)`
  text-align: left;
  color: ${p => p.theme.grey1};
`;

const IconBack = styled(Image)`
  tint-color: ${Colors.black};
  margin: 6px 0px;
  width: 20px;
  height: 20px;
`;

export const HeaderIconWrapper = styled.TouchableOpacity`
  min-width: 52px;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

export const RightHeaderIconWrapper = styled(HeaderIconWrapper)`
  background-color: ${Colors.blueviolet};
  border-radius: 8px;
  margin-right: 8px;
`;

const _HeaderActionText = styled(StyledText.Regular)`
  font-size: 16px;
  color: ${Colors.grey6};
`;

const IconClose = styled.Image`
  tint-color: ${Colors.white};
`;

const DarkIconClose = styled.Image`
  tint-color: ${Colors.grey1};
`;
export const HeaderActionText = memo(function HeaderActionText({
  text,
  ...props
}: {text: string} & TouchableOpacityProps) {
  return (
    <RightHeaderIconWrapper {...props}>
      <_HeaderActionText>{text}</_HeaderActionText>
    </RightHeaderIconWrapper>
  );
});

interface DynamicHeaderProps extends ViewProps {
  title: string;
  titleStyle?: TextStyle;
  hideSeparator?: boolean;
  children?: ReactElement | ReactElement[] | null;
  hideGoBack?: boolean;
  onGoBack?: () => void;
  isCrossIcon?: boolean;
  isHiddenTitle?: boolean;
  centerComponent?: ReactElement | ReactElement[];
  isHiddenSafeArea?: boolean;
}

export const EmptyHeader = memo(function EmptyHeader({
  children,
  hideSeparator,
  hideGoBack,
  onGoBack,
  isCrossIcon,
  isHiddenSafeArea,
  ...props
}: Omit<DynamicHeaderProps, 'title'>) {
  const {canGoBack, goBack} = useNavigation();

  useEffect(() => {
    const entry = StatusBar.pushStackEntry({
      barStyle: 'dark-content',
    });

    return () => {
      StatusBar.popStackEntry(entry);
    };
  }, []);

  const onClose = useCallback(() => {
    onGoBack && onGoBack();
    goBack();
  }, [goBack, onGoBack]);

  return (
    <Wrapper {...props}>
      {!isHiddenSafeArea && <StatusBarViewTransparent />}
      <Container hideSeparator={hideSeparator}>
        <LeftActions>
          {canGoBack() ? (
            hideGoBack ? (
              <HeaderIconWrapper />
            ) : (
              <HeaderIconWrapper onPress={onClose}>
                <View>
                  <IconBack
                    source={
                      isCrossIcon ? IC_CLOSE : require('./assets/back_icon.png')
                    }
                  />
                </View>
              </HeaderIconWrapper>
            )
          ) : null}
        </LeftActions>
        {children}
      </Container>
    </Wrapper>
  );
});

export const DynamicHeader = memo(function DynamicHeader({
  title,
  children,
  onGoBack,
  isHiddenTitle,
  centerComponent,
  titleStyle,
  ...props
}: DynamicHeaderProps) {
  const {canGoBack} = useNavigation();
  return (
    <EmptyHeader onGoBack={onGoBack} {...props}>
      {!isHiddenTitle ? (
        <Title style={titleStyle} numberOfLines={1}>
          {title}
        </Title>
      ) : (
        <></>
      )}
      {centerComponent ? <View>{centerComponent}</View> : <></>}
      <RightActions>
        {!children && canGoBack() ? <HeaderIconWrapper /> : null}
        {children}
      </RightActions>
    </EmptyHeader>
  );
});

export const StatusBarViewIos = styled.View<{isSafe?: boolean}>`
  height: ${isIphoneX() ? getStatusBarHeight(true) : 20}px;
  background-color: ${Colors.backgroundHeader};
`;

const StatusBarViewAndroid = memo(() => {
  return <StatusBar backgroundColor={Colors.backgroundHeader} />;
});

export const StatusBarViewIosTransparent = styled.View<{isSafe?: boolean}>`
  height: ${isIphoneX()
    ? getStatusBarHeight(true)
    : getStatusBarHeight(true) + 22}px;
  background-color: ${Colors.backgroundColor};
`;

const StatusBarViewAndroidTransparent = memo(() => {
  return <StatusBar backgroundColor={Colors.backgroundColor} />;
});

export const StatusBarView = Platform.select({
  ios: StatusBarViewIos as unknown as typeof View,
  default: StatusBarViewAndroid as unknown as typeof View,
});

export const StatusBarViewTransparent = Platform.select({
  ios: StatusBarViewIosTransparent as unknown as typeof View,
  default: StatusBarViewAndroidTransparent as unknown as typeof View,
});

export const LeftModalHeader = memo(function LeftModalHeader({
  title,
  hideSeparator,
  ...props
}: DynamicHeaderProps) {
  const {canGoBack, goBack} = useNavigation();

  return (
    <Wrapper {...props}>
      <StatusBarView />
      <Container hideSeparator={hideSeparator}>
        <LeftTitle numberOfLines={1}>{title}</LeftTitle>
        <RightActions>
          {canGoBack() ? (
            <HeaderIconWrapper onPress={goBack}>
              <IconClose source={IC_CLOSE} />
            </HeaderIconWrapper>
          ) : (
            <HeaderIconWrapper />
          )}
        </RightActions>
      </Container>
    </Wrapper>
  );
});

export const LeftModalTransparentHeader = memo(
  function LeftModalTransparentHeader({
    title,
    hideSeparator,
    children,
    ...props
  }: PropsWithChildren<DynamicHeaderProps>) {
    const {canGoBack, goBack} = useNavigation();

    return (
      <TransparentWrapper {...props}>
        <StatusBarViewTransparent />
        <TransparentContainer hideSeparator={hideSeparator}>
          {children ? (
            children
          ) : (
            <LeftTransparentTitle numberOfLines={1}>
              {title}
            </LeftTransparentTitle>
          )}
          <RightActions>
            {canGoBack() ? (
              <HeaderIconWrapper onPress={goBack}>
                <DarkIconClose source={IC_CLOSE} />
              </HeaderIconWrapper>
            ) : (
              <HeaderIconWrapper />
            )}
          </RightActions>
        </TransparentContainer>
      </TransparentWrapper>
    );
  },
);
