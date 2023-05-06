import React from 'react';
import {styled, useNavigation} from '@/global';
import {useSetupLanguage} from '@/hooks/useSetupLanguage';
import {navigateToRootScreen} from '@/utils/navigation';
import ScreenWrapper from '@/components/ScreenWrapper';
import {ActivityIndicator} from 'react-native';
import {Colors} from '@/themes';
import {useAsyncEffect} from '@dwarvesf/react-hooks';
import {useSimulator} from '@/utils/device';
import {client} from '@/libs/apis';

export const PreloadScreen = React.memo(function PreloadScreen() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const {isSimulator} = useSimulator();

  useSetupLanguage();

  useAsyncEffect(async () => {
    setLoading(true);
    if (isSimulator) {
      const dataStored = {
        address: '0x6c8a46A2b3403479c29209196D3D666Da2f3eba8',
        signature:
          '0x4cc641a9f3a5952ec2f72290faa6096f0795c0972d8a352b7575334d2b1c6a8d159e1814c4f72effb20cb4cc88f08b1517ba389fd7d424e570c7558232bce8c21c',
        challenge:
          'eyJleHAiOjE2ODM5NDc2MzcsImFkZHJlc3MiOiIweDZjOGE0NkEyYjM0MDM0NzljMjkyMDkxOTZEM0Q2NjZEYTJmM2ViYTgifQ==',
      };

      client.setAddress(dataStored.address);
      client.setChallenge(dataStored.challenge);
      client.setSignature(dataStored.signature);
      navigateToRootScreen();

      return;
    }

    const data = JSON.parse('{}');

    if (data?.address && data?.signature) {
      navigateToRootScreen();
      setTimeout(() => {
        navigateToRootScreen();
      }, 1000);
    } else {
    }
  }, [isSimulator]);
  return (
    <SScreenWrapper>
      {loading && <ActivityIndicator size="large" color={Colors.primary} />}
    </SScreenWrapper>
  );
});

const SScreenWrapper = styled(ScreenWrapper)`
  align-items: center;
  justify-content: center;
`;

export default PreloadScreen;
