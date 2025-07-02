// imports
import React from 'react';

// @mui components
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
// react-query
import { useQueryClient } from '@tanstack/react-query';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { organizationSelector, planPurchaseChanged } from 'src/redux/slices/organization';
// context
import { useAuthContext } from 'src/auth/hooks';
// locals
import { useLocales } from 'src/locales';
// _req-hooks
import { useUpdateNotificationMutation } from 'src/_req-hooks/reality/notification/useUpdateNotificationMutation';
import { useNotificationsQuery } from 'src/_req-hooks/reality/notification/useNotificationsQuery';
// _types
import { FilterOperatorsEnum } from 'src/_types/site/filters';

// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
// utils
import { fDate, jfDate } from 'src/utils/format-time';

// NotificationPage component
export default function NotificationPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, isRtl } = useLocales();
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const organization = useSelector(organizationSelector);

  const { mutateAsync: updateNotification } = useUpdateNotificationMutation();
  const handleUpdateNotifications = async (id: number, isRead: boolean) => {
    if (!isRead) {
      await updateNotification({
        id,
        notification: {
          is_read: true,
        },
      });
      queryClient.invalidateQueries(['getAllNotificationsQuery']);
    }
  };

  const handleUpgradeAccount = (id: number, isRead: boolean) => {
    dispatch(planPurchaseChanged('plan_and_purchasing'));
    router.push(paths.dashboard.organization_management);
    handleUpdateNotifications(id, isRead);
  };

  const extractDiscountCode = (message: string) => {
    const regex = /کد تخفیف\s+(\S+)/;
    const match = message.match(regex);
    return match ? match[1] : null;
  };

  const { data: notificationsData } = useNotificationsQuery(
    {
      page: 1,
      per_page: 10,
      filters: {
        user_id: { op: FilterOperatorsEnum._, value: user?.ID },
        organization_id: { op: FilterOperatorsEnum._, value: organization?.category_id },
      },
    },
    { enabled: !!user?.ID }
  );

  const notificationsToShow = notificationsData?.data.items || [];

  return (
    <Stack maxWidth="sm">
      <Scrollbar sx={{ p: 2 }}>
        {notificationsToShow.map((notification, index) => (
          <Card key={notification.ID} sx={{ mt: 2, p: 2 }}>
            {notification.type === 'info' ? (
              <CardActionArea
                onClick={() => handleUpdateNotifications(notification.ID, notification.is_read)}
              >
                <NotificationContent
                  notification={notification}
                  isRtl={isRtl}
                  t={t}
                  handleUpgradeAccount={handleUpgradeAccount}
                  handleUpdateNotifications={handleUpdateNotifications}
                  extractDiscountCode={extractDiscountCode}
                />
              </CardActionArea>
            ) : (
              <NotificationContent
                notification={notification}
                isRtl={isRtl}
                t={t}
                handleUpgradeAccount={handleUpgradeAccount}
                handleUpdateNotifications={handleUpdateNotifications}
                extractDiscountCode={extractDiscountCode}
              />
            )}
          </Card>
        ))}
      </Scrollbar>
    </Stack>
  );
}

type NotificationContentProps = {
  notification: any;
  isRtl: boolean;
  t: (key: string) => string;
  handleUpgradeAccount: (id: number, isRead: boolean) => void;
  handleUpdateNotifications: (id: number, isRead: boolean) => void;
  extractDiscountCode: (message: string) => string | null;
};

const NotificationContent = ({
  notification,
  isRtl,
  t,
  handleUpgradeAccount,
  handleUpdateNotifications,
  extractDiscountCode,
}: NotificationContentProps) => (
  <>
    <Stack direction="row" alignItems="center">
      <ListItemText
        primary={
          <span>
            <Typography variant="body2" color="text.primary" sx={{ whiteSpace: 'pre-line' }}>
              {notification.message}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {isRtl ? jfDate(notification.created_at) : fDate(notification.created_at)}
            </Typography>
          </span>
        }
        primaryTypographyProps={{
          typography: 'subtitle2',
          style: { whiteSpace: 'normal', wordWrap: 'break-word', width: '380px' },
        }}
        secondaryTypographyProps={{
          typography: 'caption',
          color: 'text.disabled',
        }}
        sx={{ p: 1 }}
      />
      {!notification.is_read && <Iconify icon="mdi:dot" width={50} color="info.main" />}
    </Stack>
    {notification.type === 'warning' && (
      <Box sx={{ mt: 1, p: 1 }}>
        <Button
          variant="contained"
          color="inherit"
          size="small"
          sx={{ mr: 1 }}
          onClick={() => handleUpgradeAccount(notification.ID, notification.is_read)}
        >
          {t('dashboard.upgrade_account')}
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          onClick={() => handleUpdateNotifications(notification.ID, notification.is_read)}
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
            handleUpdateNotifications(notification.ID, notification.is_read);
            const code = extractDiscountCode(notification.message);
            if (code) navigator.clipboard.writeText(code);
          }}
        >
          {t('dashboard.copy')}
        </Button>
      </Box>
    )}
  </>
);
