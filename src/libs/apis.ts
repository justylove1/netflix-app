// destructuring env keys might not work in old node versions
import fetcher from './fetcher';
import {
  ParamLoginInterface,
  ParamRegisterInterface,
} from '@/screens/Login/types';
import {RawRequestAPI} from '@/types';
import {RawApiDataUserInterface, RawUserInterface} from '@/store/user';

/* eslint-disable prefer-destructuring */
export const BASE_URL = 'https://loigiai.codeinet.com/api';

export const GET_PATHS = {
  signIn: '/signin',
  signUp: '/signup',
};

class Client {
  headers: HeadersInit_ = {
    'Content-Type': 'application/json',
  };

  privateHeaders: HeadersInit_ = {
    'Content-Type': 'application/json',
  };

  address: string = '';

  setHeaders(headers: Record<string, any>) {
    this.headers = {...this.headers, ...headers};
  }

  setAddress(newAddress: string) {
    this.address = newAddress;
  }

  setPrivateHeaders(headers: Record<string, any>) {
    this.privateHeaders = {...this.privateHeaders, ...headers};
  }

  setSignature(Signature: string) {
    console.log('setSignature ' + Signature);
    this.setPrivateHeaders({Signature});
  }

  setChallenge(Challenge: string) {
    console.log('setChallenge ' + Challenge);
    this.setPrivateHeaders({Challenge});
  }

  postSignIn(params: ParamLoginInterface) {
    return fetcher<RawRequestAPI<RawApiDataUserInterface>>(
      `${BASE_URL}${GET_PATHS.signIn}`,

      {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify(params),
      },
    );
  }

  postSignUp(params: ParamRegisterInterface) {
    return fetcher<RawRequestAPI<RawUserInterface>>(
      `${BASE_URL}${GET_PATHS.signUp}`,
      {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify(params),
      },
    );
  }
}

const client = new Client();

export {client};
