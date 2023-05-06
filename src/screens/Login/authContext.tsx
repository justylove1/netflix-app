import React from 'react';
import {createContext} from '@dwarvesf/react-utils';
import {
  ParamLoginInterface,
  ParamRegisterInterface,
} from '@/screens/Login/types';
import {Keyboard} from 'react-native';
import {requestSignIn, requestSignUp} from '@/store/user/functions';
import ToastService from '@/services/ToastService';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {getUserAccessToken} from '@/store/user';
import {goBack, navigateToMainStack} from '@/utils/navigation';

interface ContextValues {
  isSignIn?: boolean;
  isSignOut?: boolean;
  token: string;
  onSignIn?: (params: ParamLoginInterface) => void;
  onRegister?: (params: ParamRegisterInterface) => void;
  loading?: boolean;
  error?: Error;
}

const [Provider, useAuthContext] = createContext<ContextValues>();

export const AuthContextProvider: React.FC<any> = ({children}) => {
  const token = getUserAccessToken();

  const [{loading: loadingSignIn, error}, onSignIn] = useAsyncFn(
    async (paramsCustom: ParamLoginInterface) => {
      Keyboard.dismiss();
      const mes = await requestSignIn(paramsCustom);
      ToastService.show(mes);
      navigateToMainStack();
    },
    [],
  );

  const [{loading: loadingRegister, error: errorRegister}, onRegister] =
    useAsyncFn(async (paramsCustom: ParamRegisterInterface) => {
      Keyboard.dismiss();
      const mes = await requestSignUp(paramsCustom);
      ToastService.show(mes);
      goBack();
    }, []);

  return (
    <Provider
      value={{
        onSignIn: onSignIn,
        onRegister,
        loading: loadingRegister || loadingSignIn,
        error: error || errorRegister,
        token,
      }}>
      {children}
    </Provider>
  );
};

export {useAuthContext};
