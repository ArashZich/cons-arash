import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
// utils
import { fDate, jfDate } from 'src/utils/format-time';
// locales
import { useLocales } from 'src/locales';
import { UserData } from 'src/_types/reality/user/userData';

type Props = {
  currentUser?: UserData;
};

export default function UserDetailsForm({ currentUser }: Props) {
  const { t, isRtl } = useLocales();

  if (!currentUser) return null;

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <Card
          sx={{ pt: 10, pb: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box sx={{ mb: 5 }}>
            <Avatar
              alt={currentUser.name}
              src={currentUser.avatar_url}
              variant="rounded"
              sx={{ width: 150, height: 150 }}
            />
          </Box>
        </Card>
      </Grid>

      <Grid xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            {/* Personal Details */}
            <Typography variant="h6" gutterBottom>
              {t('user_information.personal_details')}
            </Typography>
            <br />
            <TextField
              disabled
              name="name"
              label={t('user_information.name')}
              defaultValue={currentUser.name}
            />
            <TextField
              disabled
              name="last_name"
              label={t('user_information.last_name')}
              defaultValue={currentUser.last_name}
            />
            <TextField
              disabled
              name="email"
              label={t('user_information.email')}
              defaultValue={currentUser.email}
            />
            <TextField
              disabled
              name="phone"
              label={t('user_information.phone')}
              defaultValue={currentUser.phone}
            />

            {/* Invite Code */}
            {currentUser.invite && (
              <>
                <br />
                <Typography variant="h6" gutterBottom>
                  {t('user_information.invite')}
                </Typography>
                <br />
                <TextField
                  disabled
                  name="invite_code"
                  label={t('user_information.invite_code')}
                  defaultValue={currentUser.invite.code}
                />
              </>
            )}

            {/* Organization Details */}
            {currentUser.organizations &&
              currentUser.organizations.map((organization, index) => (
                <React.Fragment key={index}>
                  <Typography variant="h6" gutterBottom>
                    {t('user_information.organization')}
                  </Typography>
                  <br />

                  <TextField
                    disabled
                    name={`organization_name_${index}`}
                    label={t('user_information.organization_name')}
                    defaultValue={organization.name}
                  />
                  <TextField
                    disabled
                    name={`organization_website_${index}`}
                    label={t('user_information.organization_website')}
                    defaultValue={organization.website}
                  />
                  <TextField
                    disabled
                    name={`organization_phone_${index}`}
                    label={t('user_information.organization_phone')}
                    defaultValue={organization.phone_number}
                  />
                  <TextField
                    disabled
                    name={`organization_industry_${index}`}
                    label={t('user_information.organization_industry')}
                    defaultValue={organization.industry}
                  />
                  <TextField
                    disabled
                    name={`organization_company_size_${index}`}
                    label={t('user_information.organization_company_size')}
                    defaultValue={organization.company_size}
                  />
                  <TextField
                    disabled
                    name={`organization_created_at_${index}`}
                    label={t('user_information.organization_created_at')}
                    defaultValue={
                      isRtl ? jfDate(organization.created_at) : fDate(organization.created_at)
                    }
                  />
                  <TextField
                    disabled
                    name={`organization_category_${index}`}
                    label={t('user_information.category')}
                    defaultValue={t(`category.${organization?.category?.title}`)}
                  />
                  <TextField
                    disabled
                    name={`organization_national_or_company_id_${index}`}
                    label={t('user_information.national_or_company_id')}
                    defaultValue={organization.national_code}
                  />

                  {/* Package Details */}
                  {organization.packages &&
                    organization.packages.map((packageItem, packageIndex) => (
                      <React.Fragment key={packageIndex}>
                        <Typography variant="h6" gutterBottom>
                          {t('user_information.active_package')}
                        </Typography>
                        <br />
                        <TextField
                          disabled
                          name={`package_price_${index}_${packageIndex}`}
                          label={t('user_information.package_price')}
                          defaultValue={packageItem.price}
                        />
                        <TextField
                          disabled
                          name={`package_product_limit_${index}_${packageIndex}`}
                          label={t('user_information.package_product_limit')}
                          defaultValue={packageItem.product_limit}
                        />
                        <TextField
                          disabled
                          name={`package_storage_limit_mb_${index}_${packageIndex}`}
                          label={t('user_information.package_storage_limit_mb')}
                          defaultValue={packageItem.storage_limit_mb}
                        />
                        <TextField
                          disabled
                          name={`package_created_at_${index}_${packageIndex}`}
                          label={t('user_information.package_created_at')}
                          defaultValue={
                            isRtl ? jfDate(packageItem.created_at) : fDate(packageItem.created_at)
                          }
                        />
                        <TextField
                          disabled
                          name={`package_expired_at_${index}_${packageIndex}`}
                          label={t('user_information.package_expired_at')}
                          defaultValue={
                            isRtl ? jfDate(packageItem.expired_at) : fDate(packageItem.expired_at)
                          }
                        />

                        {/* Plan Details */}
                        {packageItem.plan && (
                          <>
                            <br />
                            <Typography variant="h6" gutterBottom>
                              {t('user_information.last_plan')}
                            </Typography>
                            <br />
                            <TextField
                              disabled
                              name={`plan_title_${index}_${packageIndex}`}
                              label={t('user_information.plan_title')}
                              defaultValue={t(`plan.${packageItem.plan.title}`)}
                            />
                            <TextField
                              disabled
                              name={`plan_day_length_${index}_${packageIndex}`}
                              label={t('user_information.plan_day_length')}
                              defaultValue={packageItem.plan.day_length}
                            />
                          </>
                        )}
                      </React.Fragment>
                    ))}
                </React.Fragment>
              ))}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
