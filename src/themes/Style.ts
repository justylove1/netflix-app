import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const gutters = responsiveWidth(5.33);
export const mainBorderRadius = 10;
export const resHeight = (height: number | string) => {
  if (typeof height === 'number') {
    return responsiveHeight(height / 8.12); // 812px height follow by iPhone X
  }
  return height;
};
export const resWidth = (width: number | string) => {
  if (typeof width === 'number') {
    return responsiveWidth(width / 3.75); // 375px width follow by iPhone X
  }
  return width;
};

export type BorderStyle = {
  bor?: number;
  color?: string;
  width?: number;
  btw?: number;
  blw?: number;
  brw?: number;
  bbw?: number;
  das?: boolean;
  bblr?: number;
  bbrr?: number;
  btlr?: number;
  btrr?: number;
};

const border = ({
  bor,
  color,
  width,
  btw,
  blw,
  brw,
  bbw,
  das,
  bblr,
  bbrr,
  btlr,
  btrr,
}: BorderStyle) => ({
  ...(typeof bor === 'number' ? {borderRadius: resWidth(bor)} : {}),
  ...(typeof color === 'string' ? {borderColor: color} : {}),
  ...(typeof width === 'number' ? {borderWidth: resWidth(width)} : {}),
  ...(typeof btw === 'number' ? {borderTopWidth: resHeight(btw)} : {}),
  ...(typeof blw === 'number' ? {borderLeftWidth: resWidth(blw)} : {}),
  ...(typeof brw === 'number' ? {borderRightWidth: resWidth(brw)} : {}),
  ...(typeof bbw === 'number' ? {borderBottomWidth: resHeight(bbw)} : {}),
  ...(typeof bblr === 'number'
    ? {borderBottomLeftRadius: resHeight(bblr)}
    : {}),
  ...(typeof bbrr === 'number'
    ? {borderBottomRightRadius: resHeight(bbrr)}
    : {}),
  ...(typeof btlr === 'number' ? {borderTopLeftRadius: resHeight(btlr)} : {}),
  ...(typeof btrr === 'number' ? {borderTopRightRadius: resHeight(btrr)} : {}),
  ...(das !== undefined ? {borderStyle: 'dashed'} : {}),
});

export type ContainerStyle = {
  flex?: 1 | 2 | 3 | 4 | 5 | 6;
  direc?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  bg?: string;
  w?: number | string | '100%' | 'auto';
  h?: number | string | '100%' | 'auto';
  bor?: number;
  borColor?: string;
  m?: number | string | 'auto';
  mt?: number | string | 'auto';
  ml?: number | string | 'auto';
  mr?: number | string | 'auto';
  mb?: number | string | 'auto';
  mx?: number | string | 'auto';
  my?: number | string | 'auto';
  p?: number | string;
  pt?: number | string;
  pl?: number | string;
  pr?: number | string;
  pb?: number | string;
  px?: number | string;
  py?: number | string;
  cen?: boolean;
  items?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-evenly'
    | 'space-between'
    | 'space-around';
  self?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  pos?: string;
  l?: number | string;
  t?: number | string;
  r?: number | string;
  b?: number | string;
  size?: number;
  tin?: string;
  z?: number;
  wrap?: 'wrap' | 'nowrap';
  mw?: number | string;
  over?: string;
  op?: number;
  rotate?: string;
};

const con = ({
  flex,
  direc,
  bg,
  w,
  h,
  bor,
  borColor,
  m,
  mt,
  ml,
  mr,
  mb,
  mx,
  my,
  p,
  pt,
  pl,
  pr,
  pb,
  px,
  py,
  cen = false,
  items,
  justify,
  self,
  pos,
  l,
  t,
  r,
  b,
  size,
  tin,
  z,
  wrap,
  mw,
  over,
  op,
  rotate,
}: ContainerStyle) =>
  ({
    ...(typeof flex === 'number' ? {flex: flex} : {}),
    ...(typeof direc === 'string' ? {flexDirection: direc} : {}),
    ...(typeof bg === 'string' ? {backgroundColor: bg} : {}),
    ...(w !== undefined ? {width: resWidth(w)} : {}),
    ...(h !== undefined ? {height: resHeight(h)} : {}),
    ...(bor !== undefined ? {borderRadius: resWidth(bor)} : {}),
    ...(m !== undefined ? {margin: resWidth(m)} : {}),
    ...(mx !== undefined ? {marginHorizontal: resWidth(mx)} : {}),
    ...(my !== undefined ? {marginVertical: resHeight(my)} : {}),
    ...(mt !== undefined ? {marginTop: resHeight(mt)} : {}),
    ...(ml !== undefined ? {marginLeft: resWidth(ml)} : {}),
    ...(mr !== undefined ? {marginRight: resWidth(mr)} : {}),
    ...(mb !== undefined ? {marginBottom: resHeight(mb)} : {}),
    ...(px !== undefined ? {paddingHorizontal: resWidth(px)} : {}),
    ...(py !== undefined ? {paddingVertical: resHeight(py)} : {}),
    ...(p !== undefined ? {padding: resWidth(p)} : {}),
    ...(pt !== undefined ? {paddingTop: resHeight(pt)} : {}),
    ...(pl !== undefined ? {paddingLeft: resWidth(pl)} : {}),
    ...(pr !== undefined ? {paddingRight: resWidth(pr)} : {}),
    ...(pb !== undefined ? {paddingBottom: resHeight(pb)} : {}),
    ...(typeof justify === 'string' ? {justifyContent: justify} : {}),
    ...(typeof items === 'string' ? {alignItems: items} : {}),
    ...(typeof self === 'string' ? {alignSelf: self} : {}),
    ...(typeof pos === 'string' ? {position: pos} : {}),
    left: typeof l === 'number' ? resWidth(l) : l,
    top: typeof t === 'number' ? resHeight(t) : t,
    right: typeof r === 'number' ? resWidth(r) : r,
    bottom: typeof b === 'number' ? resHeight(b) : b,
    ...(tin !== undefined ? {tintColor: tin} : {}),
    ...(z !== undefined ? {zIndex: z} : {}),
    ...(wrap !== undefined ? {flexWrap: wrap} : {}),
    ...(mw !== undefined ? {maxWidth: mw} : {}),
    ...(typeof over === 'string' ? {overflow: over} : {}),
    ...(typeof op === 'number' ? {opacity: op} : {}),
    ...(typeof borColor === 'string' ? {borderColor: borColor} : {}),
    ...(typeof rotate === 'string' ? {transform: [{rotate: rotate}]} : {}),
    ...(cen
      ? {
          justifyContent: 'center',
          alignItems: 'center',
        }
      : {}),
    ...(typeof size === 'number'
      ? {
          width: size,
          height: size,
        }
      : {}),
  } as any);

const Style = {
  con,
  border,
  sha: (
    color = 'rgba(0, 0, 0, 0.07)',
    width: number | string,
    height: number | string,
    radius: number,
    ele = 5,
  ) => ({
    shadowColor: color,
    shadowOffset: {
      width: width,
      height: height,
    },
    shadowOpacity: 1,
    shadowRadius: radius,
    elevation: ele ?? radius * 3,
  }),
};

export default Style;
