import { m } from 'framer-motion';
// @mui
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
// react-query
import { useQueryClient } from '@tanstack/react-query';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// redux
import { useDispatch } from 'src/redux/store';
import { planPurchaseChanged } from 'src/redux/slices/organization';
// locals
import { useLocales } from 'src/locales';
// _types
import { NotificationData } from 'src/_types/reality/notification/notificationData';
//
import { useUpdateNotificationMutation } from 'src/_req-hooks/reality/notification/useUpdateNotificationMutation';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// utils
import { fDate, jfDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type NotificationsPopoverProps = {
  notifications?: NotificationData[]; // تغییر داده شده به NotificationData[] | undefined
};

const smallRotateAnimation = {
  animate: {
    rotate: [0, 10, -10, 10, -10, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'loop' as const,
      repeatDelay: 5, // هر چند ثانیه یک بار انیمیشن تکرار شود
    },
  },
};

export default function NotificationsPopover({ notifications = [] }: NotificationsPopoverProps) {
  const popover = usePopover();
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, isRtl } = useLocales();
  const queryClient = useQueryClient(); // برای invalidateQueries
  const totalUnRead = notifications.length > 8 ? '+10' : notifications.length.toString();

  const { mutateAsync: updateNotification } = useUpdateNotificationMutation();
  const handleUpdateNotifications = async (id: number) => {
    await updateNotification({
      id,
      notification: {
        is_read: true,
      },
    });
    // فراخوانی invalidateQueries برای به‌روزرسانی داده‌ها
    queryClient.invalidateQueries(['getAllNotificationsQuery']);
  };

  const handleUpgradeAccount = (id: number) => {
    dispatch(planPurchaseChanged('plan_and_purchasing'));
    router.push(paths.dashboard.organization_management);
    handleUpdateNotifications(id);
  };

  const extractDiscountCode = (message: string) => {
    const regex = /کد تخفیف\s+(\S+)/;
    const match = message.match(regex);
    return match ? match[1] : null;
  };

  const handleChangeRoutes = () => {
    router.push(paths.notifications.root);
  };

  return (
    <>
      {totalUnRead !== '0' ? (
        <m.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          animate={notifications.length > 0 ? smallRotateAnimation.animate : {}}
        >
          <IconButton
            color={popover.open ? 'inherit' : 'default'}
            onClick={popover.onOpen}
            sx={{
              ...(popover.open && {
                bgcolor: (theme) => theme.palette.action.selected,
              }),
            }}
          >
            <Badge badgeContent={totalUnRead} color="error">
              <Iconify icon="mdi:bell-outline" width={24} />
            </Badge>
          </IconButton>
        </m.div>
      ) : (
        <IconButton color="inherit" onClick={handleChangeRoutes}>
          <Iconify icon="mdi:bell-outline" width={24} />
        </IconButton>
      )}

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 420 }}>
        <Stack sx={{ p: 2, pb: 1 }} flexDirection="row" justifyContent="space-between">
          <Typography variant="h6">{t('dashboard.notifications')}</Typography>
          <Iconify icon="mdi:tick-all" width={24} />
        </Stack>
        <Scrollbar sx={{ height: 480 }}>
          {notifications.map((notification, index) => (
            <Box key={notification.ID}>
              <MenuItem
                sx={{ display: 'block', mb: 3 }}
                onClick={
                  notification.type === 'info'
                    ? () => handleUpdateNotifications(notification.ID)
                    : undefined
                }
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ width: '100%' }}
                >
                  <ListItemText
                    primary={
                      <span dir="rtl">
                        <Typography
                          variant="body2"
                          color="text.primary"
                          sx={{ whiteSpace: 'pre-line' }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          {isRtl ? jfDate(notification.created_at) : fDate(notification.created_at)}
                        </Typography>
                      </span>
                    }
                    primaryTypographyProps={{
                      typography: 'subtitle2',
                      style: {
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        width: 'calc(100% - 5px)',
                      },
                    }}
                    secondaryTypographyProps={{
                      typography: 'caption',
                      color: 'text.disabled',
                    }}
                    sx={{ p: 1, width: 'calc(100% - 500px)' }}
                  />
                  <Iconify icon="mdi:dot" width={50} color="info.main" />
                </Stack>

                {notification.type === 'warning' && (
                  <Box sx={{ mt: 1, p: 1 }}>
                    <Button
                      variant="contained"
                      color="inherit"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleUpgradeAccount(notification.ID)}
                    >
                      {t('dashboard.upgrade_account')}
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      size="small"
                      onClick={() => handleUpdateNotifications(notification.ID)}
                    >
                      {t('dashboard.decline')}
                    </Button>
                  </Box>
                )}

                {notification.type === 'discount' && (
                  <Box sx={{ mt: 1, p: 1 }}>
                    <Button
                      variant="contained"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        handleUpdateNotifications(notification.ID);
                        const code = extractDiscountCode(notification.message);
                        if (code) navigator.clipboard.writeText(code);
                      }}
                    >
                      {t('dashboard.copy')}
                    </Button>
                  </Box>
                )}
              </MenuItem>
              {index < notifications.length - 1 && <Divider sx={{ borderStyle: 'dashed' }} />}
            </Box>
          ))}
        </Scrollbar>
        <Box sx={{ p: 1, textAlign: 'center' }}>
          <Button variant="text" fullWidth onClick={handleChangeRoutes}>
            {t('dashboard.view_all')}
          </Button>
        </Box>
      </CustomPopover>
    </>
  );
}
