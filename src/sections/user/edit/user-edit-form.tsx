// src/sections/reality/user/details/UserDetailsForm.tsx
import React, { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
// routes
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// components
import { useSnackbar } from 'src/components/snackbar';
// locales
import { useLocales } from 'src/locales';
// types
import { UserData } from 'src/_types/reality/user/userData';
import { RoleData } from 'src/_types/reality/role/roleData';
import { CreateOrganizationRequestBodyType } from 'src/_types/reality/organization/createOrganization';
// req-hooks
import { useRolesQuery } from 'src/_req-hooks/reality/roles/useRolesQuery';
import { useUpdateUserRolesMutation } from 'src/_req-hooks/reality/user/useUpdateUserRolesMutation';
import { useSetEnterpriseMutation } from 'src/_req-hooks/reality/package/useSetEnterpriseMutation';
import { useUpdateOrganizationMutation } from 'src/_req-hooks/reality/organization/useUpdateOrganizationMutation';
import { useUpdatePackageMutation } from 'src/_req-hooks/reality/package/useUpdatePackageMutation';
// sections
import OrganizationDetails from './organization-details';

type Props = {
  currentUser?: UserData;
};

interface FormValues {
  [key: string]: string | Date | any;
}

export default function UserDetailsForm({ currentUser }: Props) {
  const { t, isRtl } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [roles, setRoles] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [enterpriseChecked, setEnterpriseChecked] = useState<{ [key: number]: boolean }>({});
  const [organizationTypes, setOrganizationTypes] = useState<{ [key: number]: string }>({});

  const { data: rolesData } = useRolesQuery({});
  const { mutateAsync: updateUser } = useUpdateUserRolesMutation();
  const { mutateAsync: updatePackage } = useUpdatePackageMutation();
  const { mutateAsync: setEnterprise } = useSetEnterpriseMutation();
  const { mutateAsync: updateOrganization } = useUpdateOrganizationMutation();

  const handleChangeRoles = (event: SelectChangeEvent<typeof roles>) => {
    const {
      target: { value },
    } = event;
    setRoles(typeof value === 'string' ? value.split(',') : value);
  };

  const handleUpdateRoles = async () => {
    try {
      await updateUser({
        requestBody: {
          roles: roles.map(String),
          id: String(currentUser?.ID),
        },
      });
      enqueueSnackbar(t('organization_management.role_update_success'), {
        variant: 'success',
      });
    } catch (err) {
      enqueueSnackbar(t('organization_management.role_update_unsuccess'), {
        variant: 'error',
      });
    }
  };

  const handleChangeOrganizationTypes =
    (index: number) =>
    ({ target: { value } }: SelectChangeEvent) => {
      setOrganizationTypes((prev) => ({
        ...prev,
        [index]: value,
      }));
    };

  const handleEnterpriseCheckboxChange =
    (organizationId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEnterpriseChecked((prev) => ({
        ...prev,
        [organizationId]: event.target.checked,
      }));
    };

  const handleDateChange = (newValue: Date | null, index: number, packageIndex: number) => {
    const key = `${index}_${packageIndex}_package_expired_at`;
    const parsedValue = typeof newValue === 'string' ? new Date(newValue) : newValue;
    setFormValues((prev) => ({
      ...prev,
      [key]: parsedValue,
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | any,
    index: number,
    packageIndex: number
  ) => {
    const { name, value } = event.target;
    const key = `${index}_${packageIndex}_${name}`;
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReport = async (organizationId: number) => {
    router.push(`${paths.dashboard.analytics.user_report(organizationId)}`);
  };

  const handleEnterprise = async (organization_id: number) => {
    try {
      await setEnterprise({
        organization_id,
        user_id: currentUser?.ID as number,
      });
      enqueueSnackbar(t('organization_management.enterprise_upgrade_success'), {
        variant: 'success',
      });
      // Optional: Refresh the page or refetch data
      window.location.reload();
    } catch (error) {
      enqueueSnackbar(error?.data || t('organization_management.enterprise_upgrade_error'), {
        variant: 'error',
      });
    }
  };

  const onSubmitType = async (
    organizationId: number,
    organization: CreateOrganizationRequestBodyType,
    index: number
  ) => {
    try {
      const updateData = {
        ...organization,
        organization_type: organizationTypes[index],
      };

      await updateOrganization({
        ID: organizationId,
        organization: updateData,
      });

      enqueueSnackbar(t('organization_management.update_organization_success'), {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(error?.data, { variant: 'error' });
    }
  };

  const onSubmit = async (packageItem: any, index: number, packageIndex: number) => {
    try {
      const keyBase = `${index}_${packageIndex}_`;
      const updatedPackage = {
        product_limit: parseInt(
          formValues[`${keyBase}package_product_limit`] ?? packageItem.product_limit,
          10
        ),
        storage_limit_mb: parseInt(
          formValues[`${keyBase}package_storage_limit_mb`] ?? packageItem.storage_limit_mb,
          10
        ),
        expired_at: formValues[`${keyBase}package_expired_at`]
          ? (formValues[`${keyBase}package_expired_at`] as Date).toISOString()
          : packageItem.expired_at.toString(),
      };

      await updatePackage({
        data: updatedPackage,
        ID: packageItem.ID,
      });

      enqueueSnackbar(t('organization_management.update_package_success'), {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(error?.data, { variant: 'error' });
    }
  };

  useEffect(() => {
    const rolesUser = currentUser?.roles.map((role) => role.ID) || [];
    setRoles(rolesUser);
  }, [currentUser?.roles]);

  useEffect(() => {
    const typesMap =
      currentUser?.organizations?.reduce(
        (acc, org, index) => {
          acc[index] = org.organization_type;
          return acc;
        },
        {} as { [key: number]: string }
      ) || {};

    setOrganizationTypes(typesMap);
  }, [currentUser?.organizations]);

  if (!currentUser) return null;

  return (
    <Grid container spacing={3}>
      {/* Avatar Section */}
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

      {/* Main Content Section */}
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
            {/* Personal Details Section */}
            <Typography variant="h6" gutterBottom sx={{ gridColumn: '1/-1' }}>
              {t('user_information.personal_details')}
            </Typography>

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

            {/* Roles Section */}
            <FormControl sx={{ gridColumn: '1/-1' }}>
              <InputLabel>{t('user_information.roles')}</InputLabel>
              <Select
                multiple
                value={roles}
                onChange={handleChangeRoles}
                input={<OutlinedInput label={t('user_information.roles')} />}
              >
                {rolesData?.data?.map((role: RoleData) => (
                  <MenuItem key={role.ID} value={role.ID}>
                    {role.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateRoles}
              sx={{ gridColumn: '1/-1' }}
            >
              {t('user_management.ok')}
            </Button>

            {/* Organizations Section */}
            {currentUser.organizations?.map((organization, index) => (
              <OrganizationDetails
                key={organization.ID}
                organization={organization}
                index={index}
                currentUserId={currentUser.ID}
                t={t}
                isRtl={isRtl}
                enqueueSnackbar={enqueueSnackbar}
                formValues={formValues}
                organizationTypes={organizationTypes}
                enterpriseChecked={enterpriseChecked}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                handleReport={handleReport}
                handleEnterprise={handleEnterprise}
                handleEnterpriseCheckboxChange={handleEnterpriseCheckboxChange}
                handleChangeOrganizationTypes={handleChangeOrganizationTypes}
                onSubmitType={onSubmitType}
                onSubmit={onSubmit}
              />
            ))}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
