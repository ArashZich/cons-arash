import { format, getTime, formatDistanceToNow } from 'date-fns';
import { format as jFormat } from 'date-fns-jalali';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function jfDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMMM yyyy';

  return date ? jFormat(new Date(date), fm) : '';
}

/**
 * Formats the year of the provided date based on the text direction.
 * If isRtl is true, it uses the Jalali (Persian) calendar,
 * otherwise it uses the Gregorian calendar.
 *
 * @param {boolean} isRtl - Indicates if the text direction is Right to Left.
 * @param {InputValue} date - The date to be formatted, expecting a year as a string, number, or a Date object.
 * @returns {string} The formatted year.
 */
export function yearFormat(isRtl: boolean, date: InputValue): string {
  if (!date) return ''; // Handle null, undefined, or invalid date inputs gracefully.

  // Convert date input to a Date object if it's not already one
  const dateObj = typeof date === 'number' || typeof date === 'string' ? new Date(date) : date;

  // Ensure the input is a valid Date object before attempting to format
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(dateObj.getTime())) {
    return ''; // Return an empty string if the date is invalid
  }

  const yearFa = jFormat(dateObj, 'yyyy');
  const yearEn = format(dateObj, 'yyyy');

  // Return formatted year based on the locale
  return isRtl ? yearFa : yearEn;
}

export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

export function formatDateForInput(dateString: string | Date): string {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16); // This will return "YYYY-MM-DDTHH:mm"
}

/**
 * تابع مخصوص PDF که بدون LRM و RTM کار می‌کند
 * برای نمایش صحیح تاریخ در PDF
 */
export const formatDateForPDF = (date: string | Date, isRtl: boolean): string => {
  if (!date) return '';

  const dateObj = new Date(date);
  if (Number.isNaN(dateObj.getTime())) return '';

  if (isRtl) {
    // تبدیل تاریخ میلادی به شمسی با date-fns-jalali
    const shamsiDate = jFormat(dateObj, 'yyyy/MM/dd');

    // برگرداندن تاریخ شمسی با اعداد انگلیسی
    return shamsiDate;
  }

  // برای انگلیسی
  return format(dateObj, 'dd/MM/yyyy');
};
