import moment from 'moment';

export function formatDateBasedOnFormat(date, format) {
  if (date === null || date === undefined) {
    return null;
  }
  return moment(date).format(format);
}

export function formatDateFromOneFormatToOther(date, currentFormat, newFormat) {
  if (date === null || date === undefined) {
    return null;
  }
  return moment(date, currentFormat).format(newFormat);
}
