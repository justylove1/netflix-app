import {client} from '@/libs';
import {
  ParamLoginInterface,
  ParamRegisterInterface,
} from '@/screens/Login/types';
import {setAccessToken, setUserInfo} from '@/store/user/slice';

export const requestSignIn = async (params: ParamLoginInterface) => {
  const res = await client.postSignIn(params);
  if (res.error) {
    throw new Error(res.message);
  }
  setUserInfo(res.data.user);
  setAccessToken(res.data.accessToken);
  return res.message;
};

export const requestSignUp = async (params: ParamRegisterInterface) => {
  const res = await client.postSignUp(params);
  if (res.error) {
    throw new Error(res.message);
  }
  return 'Đăng ký thành công';
};
