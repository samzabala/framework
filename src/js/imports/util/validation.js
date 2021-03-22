//valid shits
export const DisableClasses = [
  'table-row-disabled',
  'tab-disabled',
  'btn-disabled',
  'input-disabled',
  'disabled',
];

// @TODO push instead of hard coding to arrays because

export const lookupResetToParentClass = ['input-group', 'btn-group'];

export const lookupResetFromClosestComponent = [
  'dropdown',
  'modal-default',
  'modal-board',
  'switch',
  'alert',
];

export const lookupResetFromClosestComponentUi = [
  //root component name, subcomponent mods
  'modal-default',
  'modal-board',
  'input-calendar',
  'input-tags',
];

export const DateTimePreset = {
  HumanDate: {
    placeholder: 'mm/dd/yyyy',
    pattern: /^\d{2}\/\d{2}\/\d{4}$/,
    template: 'mm/dd/yy',
  },
  HumanTime24: {
    placeholder: 'hh:mm',
    pattern: '',
    template: 'HH:MM',
  },
  HumanTime12: {
    placeholder: 'hh:mm',
    pattern: '',
    template: 'HH:MM',
  },
  Value: {
    placeholder: 'yyyy-mm-dd',
    pattern: /^\d{4}[-]\d{2}[-]\d{2}$/,
    template: 'yy-mm-dd',
  },
  ValueDateTimePreset: {
    placeholder: 'yy-mm-ddThh:gg',
    pattern: '',
    template: 'yy-mm-ddThh:gg',
  },
};

export const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const dayNamesShorter = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const Palette = [
  'base',
  'primary',
  'secondary',
  'accent',
  'neutral',
  'error',
  'caution',
  'success',
];
