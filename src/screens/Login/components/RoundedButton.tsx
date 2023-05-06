import {styled} from '@/global';
import {BaseOpacityButton} from '@/components/Buttons/BaseButton';
import {fTabletScale} from '@/utils/scale';
import {Colors} from '@/themes';

const RADIUS = fTabletScale(24);

export const RoundedButton = styled(BaseOpacityButton)`
  height: ${RADIUS * 2}px;
  border-radius: ${RADIUS}px;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${Colors.green1};
`;
