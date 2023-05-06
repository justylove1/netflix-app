import React, {memo} from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {styled} from '@/global';
import {IMG_TEACHER} from '@/assets';
import {Colors} from '@/themes';

export const ClassesScreen = memo(function ClassesScreen() {
  return (
    <ScreenWrapper>
      <DynamicHeader title={''} />
      <Container>
        <SImage source={IMG_TEACHER} />
        <TitleHeader>
          {'Để Loigiai.com hiểu thêm về bạn Bạn là học sinh lớp mấy?'}
        </TitleHeader>
      </Container>
    </ScreenWrapper>
  );
});

const Container = styled.View`
  flex: 1;
  padding: 12px 16px;
  align-items: center;
`;

const TitleHeader = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${Colors.black};
  text-align: center;
  margin-top: 16px;
`;

const SImage = styled.Image`
  width: 160px;
  height: 150px;
`;

export default ClassesScreen;
