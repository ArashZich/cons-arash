// react-query
import { useQueryClient } from '@tanstack/react-query';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// utils
import { fDate, jfDate } from 'src/utils/format-time';
// i18n
import { useLocales } from 'src/locales';
// _types
import { PostData } from 'src/_types/reality/post/postData';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// _req-hooks
import { useDeletePostsMutation } from 'src/_req-hooks/reality/post/useDeletePostsMutation';
import { useUpdatePublishedPostMutation } from 'src/_req-hooks/reality/post/useUpdatePublishedPostMutation';

// ----------------------------------------------------------------------

type Props = {
  post: PostData;
};

export default function PostItemHorizontal({ post }: Props) {
  const { t, isRtl } = useLocales();
  const queryClient = useQueryClient();
  const popover = usePopover();

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { mutateAsync: deletePost } = useDeletePostsMutation();
  const { mutateAsync: publishPost } = useUpdatePublishedPostMutation();

  const handleDelete = async (id: number) => {
    await deletePost({ ids: [id] });
    queryClient.invalidateQueries(['getAllPostsQuery']);
    popover.onClose();
  };

  const handlePublish = async (ID: number) => {
    await publishPost({
      post: {
        published: true,
      },
      ID,
    });
    queryClient.invalidateQueries(['getAllPostsQuery']);
    popover.onClose();
  };

  const {
    title,
    user_name,
    user_avatar,
    created_at,
    cover_url,

    description,
  } = post;

  return (
    <>
      <Stack component={Card} direction="row" justifyContent="space-between">
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              {isRtl ? jfDate(created_at) : fDate(created_at)}
            </Box>
          </Stack>

          <Stack spacing={1} flexGrow={1}>
            <Link color="inherit" component={RouterLink} href={paths.dashboard.post.details(title)}>
              <TextMaxLine variant="subtitle2" line={2}>
                {title}
              </TextMaxLine>
            </Link>

            <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </TextMaxLine>
          </Stack>

          <Stack direction="row" alignItems="center">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>
          </Stack>
        </Stack>

        {mdUp && (
          <Box
            sx={{
              width: 180,
              height: 240,
              position: 'relative',
              flexShrink: 0,
              p: 1,
            }}
          >
            <Avatar
              alt={user_name}
              src={user_avatar}
              sx={{ position: 'absolute', top: 16, right: 16, zIndex: 9 }}
            />
            <Image alt={title} src={cover_url} sx={{ height: 1, borderRadius: 1.5 }} />
          </Box>
        )}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-center"
        sx={{ width: 140 }}
      >
        {!post.published && (
          <MenuItem onClick={() => handlePublish(post.ID)}>
            <Iconify icon="solar:file-send-bold" />
            {t('posts.publish')}
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard.post.details(title));
          }}
        >
          <Iconify icon="solar:eye-bold" />
          {t('posts.view')}
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard.post.edit(title));
          }}
        >
          <Iconify icon="solar:pen-bold" />
          {t('posts.edit')}
        </MenuItem>

        <MenuItem onClick={() => handleDelete(post.ID)} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          {t('posts.delete')}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
