// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// i18n
import { useLocales } from 'src/locales';
// utils
import { fDate, jfDate } from 'src/utils/format-time';
// theme
import { bgGradient } from 'src/theme/css';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

export type IPostHero = {
  title: string;
  coverUrl: string;
  createdAt?: Date;
  author?: {
    name: string;
    avatarUrl: string;
  };
};

// ----------------------------------------------------------------------

export default function PostDetailsHero({ title, author, coverUrl, createdAt }: IPostHero) {
  const theme = useTheme();
  const { isRtl, t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = title;

    let shareUrl = '';

    switch (platform) {
      case 'linkedin':
        // روش جدید برای اشتراک‌گذاری در لینکدین
        shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
          text
        )}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    enqueueSnackbar(t('posts.link_copied'), { variant: 'success' });
  };

  return (
    <Box
      sx={{
        height: 480,
        overflow: 'hidden',
        ...bgGradient({
          imgUrl: coverUrl,
          startColor: `${alpha(theme.palette.grey[900], 0.64)} 0%`,
          endColor: `${alpha(theme.palette.grey[900], 0.64)} 100%`,
        }),
      }}
    >
      <Container sx={{ height: 1, position: 'relative' }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: 1,
            width: 1,
            zIndex: 9,
            position: 'absolute',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            align="center"
            sx={{
              color: 'common.white',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            {title}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
            <Tooltip title={t('posts.share_linkedin') || 'LinkedIn'}>
              <IconButton
                color="error"
                onClick={() => handleShare('linkedin')}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.12)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                  color: 'common.white',
                }}
              >
                <Iconify icon="eva:linkedin-fill" />
              </IconButton>
            </Tooltip>

            <Tooltip title={t('posts.share_whatsapp') || 'WhatsApp'}>
              <IconButton
                color="success"
                onClick={() => handleShare('whatsapp')}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.12)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                  color: 'common.white',
                }}
              >
                <Iconify icon="bi:whatsapp" />
              </IconButton>
            </Tooltip>

            <Tooltip title={t('posts.share_telegram') || 'Telegram'}>
              <IconButton
                onClick={() => handleShare('telegram')}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.12)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                  color: 'common.white',
                }}
              >
                <Iconify icon="bxl:telegram" />
              </IconButton>
            </Tooltip>

            <Tooltip title={t('posts.copy_link') || 'Copy link'}>
              <IconButton
                onClick={handleCopyLink}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.12)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                  color: 'common.white',
                }}
              >
                <Iconify icon="eva:link-2-fill" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Stack
          sx={{
            left: 0,
            width: 1,
            bottom: 0,
            position: 'absolute',
            display: 'none',
          }}
        >
          {author && createdAt && (
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                px: { xs: 2, md: 3 },
                pb: { xs: 3, md: 8 },
              }}
            >
              <Avatar
                alt={author.name}
                src={author.avatarUrl}
                sx={{ width: 64, height: 64, mr: 2 }}
              />

              <ListItemText
                sx={{ color: 'common.white' }}
                primary={author.name}
                secondary={isRtl ? jfDate(createdAt) : fDate(createdAt)}
                primaryTypographyProps={{ typography: 'subtitle1', mb: 0.5 }}
                secondaryTypographyProps={{
                  color: 'inherit',
                  sx: { opacity: 0.64 },
                }}
              />
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
