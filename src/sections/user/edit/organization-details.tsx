// src/sections/reality/user/details/organization-details.tsx
import React, { useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// date
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// lodash
import { toInteger } from 'lodash';
// utils
import { fDate, jfDate } from 'src/utils/format-time';
// constants
import { ORGANIZATION_TYPES } from 'src/constants';
// types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
import { CreateOrganizationRequestBodyType } from 'src/_types/reality/organization/createOrganization';
// icons
import Iconify from 'src/components/iconify';
// hooks
import { usePlansQuery } from 'src/_req-hooks/reality/plan/usePlansQuery';
import { useDeleteOrganizationMutation } from 'src/_req-hooks/reality/organization/useDeleteOrganizationMutation';
import { useCreatePackageByAdminMutation } from 'src/_req-hooks/reality/package/useCreatePackageByAdminMutation';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

type OrganizationDetailsProps = {
  organization: any;
  index: number;
  currentUserId: number;
  t: (key: string) => string;
  isRtl: boolean;
  enqueueSnackbar: any;
  formValues: any;
  organizationTypes: { [key: number]: string };
  enterpriseChecked: { [key: number]: boolean };
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    packageIndex: number
  ) => void;
  handleDateChange: (newValue: Date | null, index: number, packageIndex: number) => void;
  handleReport: (organizationId: number) => void;
  handleEnterprise: (organizationId: number) => Promise<void>;
  handleEnterpriseCheckboxChange: (
    organizationId: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeOrganizationTypes: (index: number) => (event: SelectChangeEvent) => void;
  onSubmitType: (
    organizationId: number,
    organization: CreateOrganizationRequestBodyType,
    index: number
  ) => Promise<void>;
  onSubmit: (packageItem: any, index: number, packageIndex: number) => Promise<void>;
};

const OrganizationDetails = React.memo(
  ({
    organization,
    index,
    currentUserId,
    t,
    isRtl,
    enqueueSnackbar,
    formValues,
    organizationTypes,
    enterpriseChecked,
    handleChange,
    handleDateChange,
    handleReport,
    handleEnterprise,
    handleEnterpriseCheckboxChange,
    handleChangeOrganizationTypes,
    onSubmitType,
    onSubmit,
  }: OrganizationDetailsProps) => {
    const [selectedPlan, setSelectedPlan] = useState<number | ''>('');
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [copiedLinks, setCopiedLinks] = useState<{ [key: string]: boolean }>({});

    const { copy } = useCopyToClipboard();

    // Get plans for this organization
    const { data: plansData } = usePlansQuery(
      {
        order: 'asc',
        filters: {
          category_id: { op: FilterOperatorsEnum._, value: toInteger(organization.category?.ID) },
          //   day_length: { op: FilterOperatorsEnum._, value: 90 },
        },
      },
      {
        enabled: !!organization.category?.ID,
      }
    );

    const { mutateAsync: createPackageByAdmin } = useCreatePackageByAdminMutation();
    const { mutateAsync: deleteOrganization, isLoading: isDeleting } =
      useDeleteOrganizationMutation();

    const handlePlanChange = (event: SelectChangeEvent<number>) => {
      setSelectedPlan(event.target.value as number);
    };

    const handleDeleteOrganization = async () => {
      try {
        await deleteOrganization([organization.ID]);

        enqueueSnackbar(t('organization_management.delete_success'), {
          variant: 'success',
        });

        // بعد از حذف موفق، صفحه را رفرش می‌کنیم
        window.location.reload();
      } catch (error) {
        enqueueSnackbar(error?.data || t('organization_management.delete_error'), {
          variant: 'error',
        });
        setConfirmDelete(false);
      }
    };

    const handleCreatePackage = async () => {
      try {
        if (!selectedPlan) {
          enqueueSnackbar(t('organization_management.select_plan_first'), {
            variant: 'error',
          });
          return;
        }

        await createPackageByAdmin({
          user_id: currentUserId,
          plan_id: selectedPlan,
          organization_id: organization.ID,
        });

        enqueueSnackbar(t('organization_management.package_created_success'), {
          variant: 'success',
        });

        window.location.reload();
      } catch (error) {
        enqueueSnackbar(error?.data || t('organization_management.package_creation_error'), {
          variant: 'error',
        });
      }
    };

    // Generate organization links based on type
    const getOrganizationLinks = () => {
      const orgType = organizationTypes[index] || organization.organization_type;
      const orgUid = organization.organization_uid;

      if (!orgUid) return [];

      const links = [];

      switch (orgType) {
        case 'showroom':
          links.push({
            type: 'showroom',
            url: `https://showroom.armogroup.tech/${orgUid}`,
            label: t('user_information.showroom_link'),
          });
          break;
        case 'recommender':
          links.push({
            type: 'recommender',
            url: `https://recommender-carpet.armogroup.tech/${orgUid}`,
            label: t('user_information.recommender_link'),
          });
          break;
        case 'enterprise':
          links.push(
            {
              type: 'showroom',
              url: `https://showroom.armogroup.tech/${orgUid}`,
              label: t('user_information.showroom_link'),
            },
            {
              type: 'recommender',
              url: `https://recommender-carpet.armogroup.tech/${orgUid}`,
              label: t('user_information.recommender_link'),
            }
          );
          break;
        default:
          return [];
      }

      return links;
    };

    const handleCopyLink = async (url: string, linkType: string) => {
      const success = await copy(url);
      if (success) {
        setCopiedLinks((prev) => ({ ...prev, [linkType]: true }));
        enqueueSnackbar(t('organization_management.link_copied'), {
          variant: 'success',
        });

        // Reset copied state after 2 seconds
        setTimeout(() => {
          setCopiedLinks((prev) => ({ ...prev, [linkType]: false }));
        }, 2000);
      } else {
        enqueueSnackbar(t('organization_management.copy_failed'), {
          variant: 'error',
        });
      }
    };

    const handleOpenLink = (url: string) => {
      window.open(url, '_blank');
    };

    const organizationLinks = getOrganizationLinks();

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom sx={{ gridColumn: '1/-1' }}>
          {t('user_information.organization')}
        </Typography>

        {/* فیلدهای موجود */}
        <TextField
          disabled
          name={`organization_name_${index}`}
          label={t('user_information.organization_name')}
          defaultValue={organization.name}
        />
        <TextField
          disabled
          name={`organization_uid_${index}`}
          label={t('user_information.organization_uid')}
          defaultValue={organization.organization_uid}
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
          defaultValue={isRtl ? jfDate(organization.created_at) : fDate(organization.created_at)}
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

        {/* نمایش تعداد محصولات سازمان */}
        <TextField
          disabled
          name={`organization_products_count_${index}`}
          label={t('user_information.products_count')}
          defaultValue={organization.products?.length || 0}
        />

        {/* دکمه گزارش */}
        <Button variant="contained" color="primary" onClick={() => handleReport(organization.ID)}>
          {t('user_information.user_reports')}
        </Button>

        {/* بخش حذف سازمان با چک‌باکس تایید */}
        <FormControlLabel
          control={
            <Checkbox
              checked={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.checked)}
              name="deleteConfirmCheckbox"
              color="error"
            />
          }
          label={t('organization_management.confirm_delete_checkbox')}
        />

        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteOrganization}
          disabled={!confirmDelete || isDeleting}
          sx={{ mt: 1, py: 1 }}
        >
          {t('organization_management.delete_organization')}
          {isDeleting && '...'}
        </Button>

        <FormControl>
          <InputLabel id={`organization-type-${index}`}>
            {t('user_information.organization_type')}
          </InputLabel>
          <Select
            id={`organization-type-${index}`}
            value={organizationTypes[index] || ''}
            onChange={handleChangeOrganizationTypes(index)}
            input={<OutlinedInput label="OrganizationTypes" />}
          >
            {ORGANIZATION_TYPES(t)?.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={() => onSubmitType(organization.ID, organization, index)}
        >
          {t('user_management.ok')}
        </Button>

        {/* Organization Links Section */}
        {organizationLinks.length > 0 && (
          <Box sx={{ gridColumn: '1/-1', mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('user_information.organization_links')}
            </Typography>
            <Stack spacing={2}>
              {organizationLinks.map((link) => (
                <Box
                  key={link.type}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <Chip label={link.label} color="primary" variant="outlined" size="small" />
                  <TextField
                    value={link.url}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ flexGrow: 1 }}
                  />
                  <IconButton
                    onClick={() => handleCopyLink(link.url, `${organization.ID}_${link.type}`)}
                    color="primary"
                    size="small"
                    title={t('user_information.copy_link')}
                  >
                    {copiedLinks[`${organization.ID}_${link.type}`] ? (
                      <Iconify icon="eva:checkmark-fill" />
                    ) : (
                      <Iconify icon="eva:copy-fill" />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenLink(link.url)}
                    color="primary"
                    size="small"
                    title={t('user_information.open_link')}
                  >
                    <Iconify icon="eva:external-link-fill" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Package Creation Section */}
        <Box sx={{ gridColumn: '1/-1' }}>
          <Typography variant="h6" gutterBottom>
            {t('user_information.add_new_package')}
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>{t('user_information.select_plan')}</InputLabel>
            <Select
              value={selectedPlan}
              onChange={handlePlanChange}
              input={<OutlinedInput label={t('user_information.select_plan')} />}
            >
              {plansData?.data?.items.map((plan: any) => (
                <MenuItem key={plan.ID} value={plan.ID}>
                  {t(`plan.${plan.title}`)} - {plan.price} - {plan.day_length}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!selectedPlan}
            onClick={handleCreatePackage}
          >
            {t('user_information.create_package')}
          </Button>
        </Box>

        {/* بقیه کد */}
        {/* Existing Packages */}
        {organization.packages?.map((packageItem: any, packageIndex: number) => (
          <React.Fragment key={packageIndex}>
            <Typography variant="h6" gutterBottom sx={{ gridColumn: '1/-1' }}>
              {t('user_information.active_package')}
            </Typography>

            <TextField
              disabled
              name={`package_price_${index}_${packageIndex}`}
              label={t('user_information.package_price')}
              defaultValue={packageItem.price}
            />
            <TextField
              name="package_product_limit"
              label={t('user_information.package_product_limit')}
              defaultValue={packageItem.product_limit}
              onChange={(event) => handleChange(event, index, packageIndex)}
            />
            <TextField
              name="package_storage_limit_mb"
              label={t('user_information.package_storage_limit_mb')}
              defaultValue={packageItem.storage_limit_mb}
              onChange={(event) => handleChange(event, index, packageIndex)}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
              <DatePicker
                label={t('user_information.package_expired_at')}
                value={
                  formValues[`${index}_${packageIndex}_package_expired_at`] ||
                  new Date(packageItem.expired_at)
                }
                onChange={(newValue) => handleDateChange(newValue, index, packageIndex)}
              />
              <TextField
                disabled
                label={t('user_information.package_expired_at_jalali')}
                value={jfDate(
                  formValues[`${index}_${packageIndex}_package_expired_at`] ||
                    new Date(packageItem.expired_at)
                )}
                sx={{ minWidth: '180px' }}
              />
            </Box>
            <TextField
              disabled
              name={`package_created_at_${index}_${packageIndex}`}
              label={t('user_information.package_created_at')}
              defaultValue={isRtl ? jfDate(packageItem.created_at) : fDate(packageItem.created_at)}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() => onSubmit(packageItem, index, packageIndex)}
            >
              {t('user_management.ok')}
            </Button>

            {/* Plan Details */}
            {packageItem.plan && (
              <>
                <Typography variant="h6" gutterBottom sx={{ gridColumn: '1/-1' }}>
                  {t('user_information.last_plan')}
                </Typography>
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

        {/* Enterprise Upgrade Section */}
        <FormControlLabel
          control={
            <Checkbox
              checked={!!enterpriseChecked[organization.ID]}
              onChange={handleEnterpriseCheckboxChange(organization.ID)}
              name={`enterpriseCheckbox_${organization.ID}`}
            />
          }
          label={t('organization_management.confirm_enterprise_upgrade')}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => handleEnterprise(organization.ID)}
          disabled={!enterpriseChecked[organization.ID]}
          sx={{
            py: 2,
            fontSize: '1.1rem',
            zIndex: 1,
          }}
        >
          {t('organization_management.upgrade_to_enterprise')}
        </Button>
      </React.Fragment>
    );
  }
);

export default OrganizationDetails;
