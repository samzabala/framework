export const BrValue = {
  xxs: 0,
  xs:
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--fw-br-xs')
    ) || 600,
  sm:
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--fw-br-sm')
    ) || 1200,
  md:
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--fw-br-md')
    ) || 1600,
  lg:
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--fw-br-lg')
    ) || 1800,
  xl: 9999999,
};

export const BrTag = Object.keys(BrValue);
// Br_to_loop =  ['xs','sm','md','lg'];

export const BrMobileMax =
  parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--fw-br-mobile-max')
  ) || 'sm';

export const ValidateBr = (breakpoint, mode) => {
  mode = mode || 'below'; //below,within,above
  const currIndex = BrTag.indexOf(breakpoint);

  switch (mode) {
    case 'below': //max-width
      return document.documentElement.clientWidth <= BrValue[breakpoint];

    case 'within':
      return (
        document.documentElement.clientWidth <= BrValue[breakpoint] &&
        document.documentElement.clientWidth > BrValue[BrTag[currIndex - 1]]
      );

    case 'above':
      return currIndex > 0
        ? document.documentElement.clientWidth > BrValue[BrTag[currIndex - 1]]
        : document.documentElement.clientWidth > BrValue[BrTag[currIndex]];
  }
};
