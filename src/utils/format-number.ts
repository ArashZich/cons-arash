import numeral from 'numeral';

// ----------------------------------------------------------------------

type InputValue = string | number | null;

export function fNumber(number: InputValue) {
  return numeral(number).format();
}

export function fCurrency(number: InputValue) {
  const format = number ? numeral(number).format('$0,0.00') : '';

  return result(format, '.00');
}

export function fPercent(number: InputValue) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number: InputValue) {
  const format = number ? numeral(number).format('0.00a') : '0';

  return result(format, '.00');
}

export function fData(number: InputValue) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format: string, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}

export function fNumberPrice(number: InputValue) {
  const format = number ? numeral(number).format('0,0.00') : '0';

  return result(format, '.00');
}

// 🆕 تابع جدید برای فرمت کردن اعداد بر اساس زبان
export function fNumberLocale(number: InputValue, locale: string = 'en'): string {
  if (!number || number === null) return '0';

  const numValue = typeof number === 'string' ? parseFloat(number) : number;

  if (Number.isNaN(numValue)) return '0';

  // برای زبان فارسی از fa-IR استفاده کن
  if (locale === 'fa' || locale === 'fa-IR') {
    return numValue.toLocaleString('fa-IR');
  }

  // برای انگلیسی و سایر زبان‌ها
  return numValue.toLocaleString('en-US');
}

// 🆕 تابع جدید برای قیمت با زبان (با حذف اعشار اضافی)
export function fPriceLocale(number: InputValue, locale: string = 'en'): string {
  if (!number || number === null) return '0';

  const numValue = typeof number === 'string' ? parseFloat(number) : number;

  if (Number.isNaN(numValue)) return '0';

  let formatted: string;

  // برای زبان فارسی
  if (locale === 'fa' || locale === 'fa-IR') {
    formatted = numValue.toLocaleString('fa-IR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  } else {
    // برای انگلیسی و سایر زبان‌ها
    formatted = numValue.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  return formatted;
}

// 🆕 تابع Helper برای استفاده در کامپوننت‌ها
export function useFormatNumber() {
  return {
    fNumberLocale,
    fPriceLocale,
  };
}
