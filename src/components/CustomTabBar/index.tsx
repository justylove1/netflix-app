import React, {memo, useCallback, useRef} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  Animated,
  ImageSourcePropType,
  InteractionManager,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import {Colors} from '@/themes';
import {screenShortDimension} from '@/utils/scale';
import {BlockView} from '@/components/BlockView';
import {useBoolean} from 'react-use';

export interface TabBarIconProps {
  icon: ImageSourcePropType;
  focused: boolean;
  color: any;
}

export interface TabBarLabelProps {
  isFocused: boolean;
}

export const TabBarIcon = memo(function TabBarIcon({
  icon,
  focused,
  color,
}: TabBarIconProps) {
  if (focused) {
    return (
      <BlockView borderRadius={32} color={Colors.colorYellow}>
        <Icon source={icon} focused={focused} color={color} />
      </BlockView>
    );
  }
  return <Icon source={icon} focused={focused} color={color} />;
});

export const TabBarLabel = memo(function TabBarLabel({
  isFocused,
}: TabBarLabelProps) {
  return <Label focused={isFocused} />;
});

export const CustomTabBar = memo(function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [visible, hide] = useBoolean(false);
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  const onHide = useCallback(() => {
    Animated.parallel([
      Animated.timing(rotateAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    hide();
  }, [hide, rotateAnimation]);

  return (
    <View>
      <ContentContainer style={styles.containerAbsolute}>
        <BlockView color={Colors.green2}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const isFocused = state.index === index;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const onPress = useCallback(() => {
              onHide();
              InteractionManager.runAfterInteractions(() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              });
            }, [route, isFocused]);

            return (
              <TouchableOpacity
                key={'tab-' + index.toString()}
                accessibilityRole="button"
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.bottomBarIcon}>
                {options &&
                  options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    color: 'black',
                    size: 0,
                  })}
              </TouchableOpacity>
            );
          })}
        </BlockView>
      </ContentContainer>
    </View>
  );
});

const Icon = styled.Image<{color?: string; focused?: boolean}>`
  width: 25px;
  height: 25px;
  tint-color: ${props => (props.focused ? Colors.gray1 : Colors.white)};
`;

const Label = styled.Text<{focused: boolean}>`
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  padding-top: 4px;
  color: ${p => (p.focused ? Colors.red0 : Colors.grey1)};
`;
const ContentContainer = styled.View`
  background-color: ${Colors.backgroundColor};
`;

const styles = StyleSheet.create({
  containerAbsolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56 + getBottomSpace(),
    marginHorizontal: 32,
  },
  modalStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 0,
    marginLeft: 16,
    marginRight: 16,
    width: screenShortDimension - 32,
    maxWidth: 400,
    marginBottom: 80 + getBottomSpace(),
  },
  contentContainer: {
    flexDirection: 'row',
    marginBottom: getBottomSpace(),
  },
  viewIconAdd: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: -20,
  },
  bottomBarIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusHorizontal: {
    position: 'absolute',
    zIndex: 1,
    width: 3,
    height: 20,
    borderRadius: 2,
  },
  plusVertical: {
    position: 'absolute',
    zIndex: 1,
    width: 20,
    height: 3,
    borderRadius: 2,
  },
});
