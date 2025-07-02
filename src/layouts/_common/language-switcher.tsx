import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
// locales
import { useLocales, LangValues } from 'src/locales';

// ----------------------------------------------------------------------

export default function LanguageSwitcher() {
  const locales = useLocales();
  const [currentLang, setCurrentLang] = useState(locales.currentLang);

  const handleChangeLang = useCallback(() => {
    const newLang = currentLang.value === LangValues.Fa ? LangValues.En : LangValues.Fa;
    locales.onChangeLang(newLang);
    const updatedLang = locales.allLangs.find((lang) => lang.value === newLang);
    if (updatedLang) {
      setCurrentLang(updatedLang);
    }
  }, [currentLang, locales]);

  // نمایش زبان دیگر (زبان انتخاب نشده)
  const otherLangLabel =
    currentLang.value === LangValues.Fa
      ? locales.allLangs.find((lang) => lang.value === LangValues.En)?.label
      : locales.allLangs.find((lang) => lang.value === LangValues.Fa)?.label;

  return (
    <Button
      onClick={handleChangeLang}
      variant="text"
      sx={{ mx: 2.5, mt: 2, color: (theme) => theme.palette.grey[500] }}
    >
      {otherLangLabel}
    </Button>
  );
}
