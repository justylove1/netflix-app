import React, {memo, useCallback, useState} from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {StatusBarViewTransparent} from '@/components/Header/DynamicHeader';
import {styled} from '@/global';
import {IC_APPLE, IC_FACEBOOK, IC_GOOGLE} from '@/assets';
import {scale} from '@/utils/scale';
import {InputBorder} from '@/components/Input/components/InputBorder';
import {ParamLoginInterface} from '@/screens/Login/types';
import {StyleSheet} from 'react-native';
import {DynamicCheckbox} from '@/components/Checkbox';
import {Colors} from '@/themes';
import {RoundedButton} from '@/screens/Login/components/RoundedButton';
import {Icon} from '@/components/Views/Icon';
import useAutoToastError from '@/hooks/useAutoToastError';
import {useAuthContext} from '@/screens/Login/authContext';
import {navigateToRegisterScreen} from '@/utils/navigation';
import {Logo} from '@/screens/Login/components/Logo';

export const LoginScreen = memo(function LoginScreen() {
  const [paramsCustom, setParamsCustom] = useState<ParamLoginInterface>({
    username: '',
    password: '',
  });

  const onTextChange = useCallback((keyName: string, value: string) => {
    setParamsCustom(state => ({...state, [keyName]: value}));
  }, []);

  const {onSignIn, error, loading} = useAuthContext();

  const onSubmit = useCallback(() => {
    onSignIn && onSignIn(paramsCustom);
  }, [onSignIn, paramsCustom]);

  const onNavigate = useCallback(() => {
    navigateToRegisterScreen();
  }, []);

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <StatusBarViewTransparent />
      <Container>
        <Logo />
        <InputBorder
          value={paramsCustom.username}
          keyName={'username'}
          placeHolder={'Tên đăng nhập'}
          onTextChange={onTextChange}
          containerStyle={styles.containerInput}
        />
        <InputBorder
          value={paramsCustom.password}
          keyName={'password'}
          placeHolder={'Mật khẩu'}
          onTextChange={onTextChange}
          secureTextEntry={true}
        />
        <ContainerForgotPassword>
          <WrapperSavePassword>
            <SDynamicCheckbox value={true} />
            <Title>{'Lưu mật khẩu'}</Title>
          </WrapperSavePassword>
          <Title>{'Quên mật khẩu'}</Title>
        </ContainerForgotPassword>
        <SRoundedButton onPress={onSubmit} disabled={loading}>
          <Title color={Colors.white}>{'Đăng nhập'}</Title>
        </SRoundedButton>
        <WrapperTitleOr>
          <Title>{'Hoặc'}</Title>
        </WrapperTitleOr>
        <ContainerLoginSocial>
          <Icon source={IC_APPLE} />
          <Icon source={IC_FACEBOOK} />
          <Icon source={IC_GOOGLE} />
        </ContainerLoginSocial>
        <ContainerSubTitle>
          <SubTitle>{'Nếu chưa có tài khoản,đăng ký'}</SubTitle>
          <STouch onPress={onNavigate}>
            <Title color={Colors.blue}>{' Tại đây'}</Title>
          </STouch>
        </ContainerSubTitle>
      </Container>
    </ScreenWrapper>
  );
});

const SRoundedButton = styled(RoundedButton)`
  margin-top: ${scale(40)}px;
`;

const STouch = styled.TouchableOpacity``;

const ContainerSubTitle = styled.View`
  flex: 1;
  padding: 32px;
  flex-direction: row;
  align-items: flex-end;
`;

const ContainerLoginSocial = styled.View`
  flex-direction: row;
`;

const WrapperTitleOr = styled.View`
  margin-top: 40px;
  margin-bottom: 24px;
`;

const SDynamicCheckbox = styled(DynamicCheckbox)`
  margin-right: 12px;
`;

const WrapperSavePassword = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text<{color?: string}>`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.color || Colors.gray1};
`;

const SubTitle = styled(Title)``;

const ContainerForgotPassword = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const SImageSymbol = styled.Image`
  width: ${scale(180)}px;
  height: ${scale(200)}px;
  margin-top: ${scale(80)}px;
`;

const Container = styled.View`
  align-items: center;
  flex: 1;
  padding: 12px 16px;
  flex-wrap: wrap;
`;

const styles = StyleSheet.create({
  containerInput: {
    marginVertical: 24,
  },
});
export default LoginScreen;
