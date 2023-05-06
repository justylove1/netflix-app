import {RawUserInterface} from '@/store/user/types';
import {createUserReducer} from '@/store/user/reducer';

export const {
  setStore: setUserStore,
  actions: userActions,
  reducer: userReducer,
  getAccessToken: getUserAccessToken,
  setInfo: setUserInfo,
  setAccessToken,
} = createUserReducer<RawUserInterface>('user');
