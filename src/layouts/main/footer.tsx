/* eslint-disable react/jsx-no-target-blank */
// @mui

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import { green, pink, blue, cyan } from '@mui/material/colors';
// locales
import { useLocales } from 'src/locales';
// components
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';

// paths
import { paths } from 'src/routes/paths';

// utils
import { yearFormat } from 'src/utils/format-time';
import { useBoolean } from 'src/hooks/use-boolean';
import TermsOfUseModal from 'src/sections/auth/information/terms-of-use-modal';

type LinkType = { name: string; href: string; onClick?: () => void };

const socials = [
  {
    name: 'WhatsApp',
    icon: 'bxl:whatsapp',
    link: 'https://wa.me/+989370180730',
    color: green[500],
  },
  {
    name: 'Instagram',
    icon: 'bxl:instagram',
    link: 'https://www.instagram.com/armogroup.tech',
    color: pink[500],
  },
  {
    name: 'Telegram',
    icon: 'bxl:telegram',
    link: 'https://t.me/ARmogrouptech00',
    color: cyan[500],
  },
  {
    name: 'LinkedIn',
    icon: 'bxl:linkedin',
    link: 'https://www.linkedin.com/company/armo-group-xr/',
    color: blue[400],
  },
];

// ----------------------------------------------------------------------

type Props = {
  light?: boolean;
};

export default function Footer({ light = false }: Props) {
  const { t, isRtl } = useLocales();
  const theme = useTheme();
  const visible = useBoolean();

  const LINKS: { headline?: string; children: LinkType[] }[] = [
    {
      // headline: t('landing.solutions'),
      children: [
        { name: t('landing.ar_solution'), href: paths.ar_solutions },
        { name: t('landing.how_it_works'), href: paths.how_it_works },
        { name: t('landing.faq'), href: paths.faq },
        { name: t('landing.ar_carpet'), href: paths.ar_carpet },
        { name: t('landing.cosmetics'), href: paths.makeup },
        { name: t('landing.eyewear'), href: paths.eyewear },
      ],
    },
    {
      // headline: t('landing.about_armo'),
      children: [
        { name: t('landing.about_us'), href: paths.about },
        { name: t('landing.terms_of_use'), href: '', onClick: visible.onTrue }, // دکمه برای باز کردن مدال
        { name: t('landing.pricing'), href: paths.pricing },
        { name: t('landing.old_dashboard'), href: 'https://app.armogroup.tech/login' },
      ],
    },
    {
      headline: t('landing.contact'),
      children: [
        { name: t('landing.armo_email'), href: '#' },
        {
          name: t('landing.armo_address'),
          href: '#',
        },
        { name: t('landing.armo_phone'), href: '#' },
        { name: t('landing.armo_mobile'), href: '#' },
      ],
    },
  ];

  const getTextDirection = (textName: string): string => {
    // Directly check for phone and mobile conditions
    if (textName === t('landing.armo_phone') || textName === t('landing.armo_mobile')) {
      return isRtl ? 'rtl' : 'ltr';
    }
    return 'ltr'; // Default return for non-specific cases
  };

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: light ? theme.palette.common.white : theme.palette.common.black,
      }}
    >
      <Divider />
      <Container sx={{ pt: 10, pb: 5, textAlign: { xs: 'center', md: 'unset' } }}>
        <TermsOfUseModal open={visible.value} onClose={visible.onFalse} />
        <Logo isWhite={!light} sx={{ mb: 3 }} />
        <Grid container justifyContent={{ xs: 'center', md: 'space-between' }}>
          <Grid xs={8} md={3}>
            <Typography
              variant="body2"
              color={light ? theme.palette.common.black : theme.palette.common.white}
              sx={{ maxWidth: 270, mx: { xs: 'auto', md: 'unset' } }}
            >
              {t('landing.about_us_footer')}
            </Typography>
            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 3, mb: { xs: 5, md: 0 } }}
            >
              {socials.map((social) => (
                <IconButton
                  key={social.name}
                  LinkComponent={RouterLink}
                  href={social.link}
                  sx={{ '&:hover': { bgcolor: alpha(social.color, 0.08) } }}
                >
                  <Iconify color={social.color} icon={social.icon} />
                </IconButton>
              ))}
            </Stack>
            <Box sx={{ mt: 3 }}>
              <a
                referrerPolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=534625&Code=9w3mDYUc51mMkIgWyY56nCveA4KDl5jZ"
              >
                <img
                  referrerPolicy="origin"
                  src="https://trustseal.enamad.ir/logo.aspx?id=534625&Code=9w3mDYUc51mMkIgWyY56nCveA4KDl5jZ"
                  alt="Enamad Logo"
                  style={{ cursor: 'pointer' }}
                />
              </a>
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Stack spacing={5} direction={{ xs: 'column', md: 'row' }}>
              {LINKS.map((list, indx) => (
                <Stack
                  key={indx}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                  sx={{ width: 1 }}
                >
                  <Typography
                    component="div"
                    variant="overline"
                    color={light ? theme.palette.common.black : theme.palette.common.white}
                  >
                    {list.headline}
                  </Typography>
                  {list.headline !== t('landing.contact')
                    ? list.children.map((link, index) =>
                        link.href === '' ? (
                          <Button
                            variant="text"
                            key={index}
                            onClick={link.onClick && link.onClick} // Check if onClick exists before using it
                            sx={{
                              color: light
                                ? theme.palette.common.black
                                : theme.palette.common.white,
                              padding: 0,
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            {link.name}
                          </Button>
                        ) : (
                          <Link
                            color={light ? theme.palette.common.black : theme.palette.common.white}
                            key={index}
                            component={RouterLink}
                            href={link.href}
                            variant="body2"
                          >
                            {link.name}
                          </Link>
                        )
                      )
                    : list.children.map((text, ind) => (
                        <Typography
                          color={light ? theme.palette.common.black : theme.palette.common.white}
                          key={ind}
                          variant="body2"
                          sx={{ direction: getTextDirection(text.name) }}
                        >
                          {text.name}
                        </Typography>
                      ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Typography
          color={light ? theme.palette.common.black : theme.palette.common.white}
          variant="body2"
          sx={{ mt: 10, textAlign: 'center' }}
        >
          © {yearFormat(isRtl, new Date())}. {t('landing.all_rights_reserved')}
        </Typography>
      </Container>
    </Box>
  );
}
