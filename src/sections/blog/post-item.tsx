// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
// i18n
import { useLocales } from 'src/locales';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// utils
import { fDate, jfDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
// types
import { PostData } from 'src/_types/reality/post/postData';
// utils
import { readingTime } from 'src/utils/seo-helpers';

// ----------------------------------------------------------------------

type Props = {
  post: PostData;
  index?: number;
  dark?: boolean;
};

export default function PostItem({ post, dark, index }: Props) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const { cover_url, title, created_at, views } = post;

  const latestPost = index === 0 || index === 1 || index === 2;

  const linkTo = paths.blog.details(title);

  if (mdUp && latestPost) {
    return (
      <Card sx={{ bgcolor: dark ? theme.palette.grey[800] : theme.palette.common.white }}>
        <Link component={RouterLink} href={linkTo} color="inherit" underline="none">
          <Box sx={{ position: 'relative' }}>
            <Image
              alt={title}
              src={cover_url}
              overlay={alpha(theme.palette.grey[900], 0.48)}
              sx={{
                width: 1,
                height: 360,
              }}
            />
            <PostContent
              dark={dark}
              title={title}
              createdAt={created_at}
              index={index}
              totalViews={views}
            />
          </Box>
        </Link>
      </Card>
    );
  }

  return (
    <Card sx={{ bgcolor: dark ? theme.palette.grey[800] : theme.palette.common.white }}>
      <Link component={RouterLink} href={linkTo} color="inherit" underline="none">
        <Box sx={{ position: 'relative' }}>
          <Image alt={title} src={cover_url} ratio="4/3" />
          <PostContent
            dark={dark}
            title={title}
            createdAt={created_at}
            totalViews={views}
            content={post.content}
          />
        </Box>
      </Link>
    </Card>
  );
}

// ----------------------------------------------------------------------

type PostContentProps = {
  title: string;
  index?: number;
  createdAt: Date | string | number;
  dark?: boolean;
  totalViews: number;
  content?: string;
};

// در فایل post-item.tsx، در کامپوننت PostContent

export function PostContent({
  title,
  createdAt,
  index,
  dark,
  totalViews,
  content,
}: PostContentProps) {
  const mdUp = useResponsive('up', 'md');
  const { isRtl, t } = useLocales();

  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  return (
    <CardContent
      sx={{
        pt: 6,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
      }}
    >
      <Typography
        variant="caption"
        component="div"
        sx={{
          mb: 1,
          color: dark ? 'common.white' : 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {isRtl ? jfDate(createdAt) : fDate(createdAt)}
      </Typography>

      <TextMaxLine
        sx={{
          color: dark ? 'common.white' : 'inherit',
        }}
        variant={mdUp && latestPostLarge ? 'h5' : 'subtitle2'}
        line={2}
        persistent
      >
        {title}
      </TextMaxLine>
      <Stack
        spacing={1.5}
        direction="row"
        justifyContent="space-between"
        sx={{
          mt: 3,
          typography: 'caption',
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {/* نمایش زمان مطالعه */}
        <Stack direction="row" alignItems="center">
          <Iconify icon="mdi:clock-outline" width={16} sx={{ mr: 0.5 }} />
          {readingTime(content || '')} {t('posts.min_read')}
        </Stack>

        {/* نمایش تعداد بازدیدها */}
        <Stack direction="row" alignItems="center">
          <Iconify icon="solar:eye-bold" width={16} sx={{ mr: 0.5 }} />
          {fShortenNumber(totalViews)}
        </Stack>
      </Stack>
    </CardContent>
  );
}
