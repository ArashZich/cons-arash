'use client';

import merge from 'lodash/merge';
import {
  enUS as enUSAdapter,
  faIR as faIRAdapter,
  // tr as trAdapter
} from 'date-fns/locale';
// core
import {
  enUS as enUSCore,
  faIR as faIRCore,
  //  trTR as trTRCore
} from '@mui/material/locale';
// date-pickers
import {
  enUS as enUSDate,
  faIR as faIRDate,
  //  trTR as trTRDate
} from '@mui/x-date-pickers/locales';
// data-grid
import {
  enUS as enUSDataGrid,
  faIR as faIRDataGrid,
  // trTR as trTRDataGrid
} from '@mui/x-data-grid';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export enum LangValues {
  Fa = 'fa-IR',
  En = 'en-UK',
  // Tr = 'tr-TR',
}

export const allLangs = [
  {
    label: 'فارسی',
    value: LangValues.Fa,
    systemValue: merge(faIRDate, faIRDataGrid, faIRCore),
    adapterLocale: faIRAdapter,
    direction: 'rtl',
    icon: 'emojione-v1:flag-for-iran',
    isRtl: true,
  },
  {
    label: 'English',
    value: LangValues.En,
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    direction: 'ltr',
    icon: 'emojione-v1:flag-for-united-kingdom',
    isRtl: false,
  },
  // {
  //   label: 'Türkçe',
  //   value: LangValues.Tr,
  //   systemValue: merge(trTRDate, trTRDataGrid, trTRCore),
  //   adapterLocale: trAdapter,
  //   direction: 'ltr',
  //   icon: 'emojione-v1:flag-for-turkey',
  //   isRtl: false,
  // },
];

export const defaultLang = allLangs[0]; // Persian
// export const defaultLang = allLangs[1]; // English

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
