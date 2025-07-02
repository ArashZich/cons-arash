// react
import React, { useCallback, useEffect, useMemo } from 'react';
// use-immer
import { useImmerReducer } from 'use-immer';
// @mui/material
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// lodash
import isEmpty from 'lodash/isEmpty';
// component
import { UploadAvatar } from 'src/components/upload';
import { useSnackbar } from 'src/components/snackbar';
import CircleProgress from 'src/components/modal-progress/circular-progress';
import { EditableInfoSection } from 'src/components/custom-editable-section/editable-info-section';
import Iconify from 'src/components/iconify';
// locals
import { useLocales } from 'src/locales';
// req-hooks
import { useUploadFileMutation } from 'src/_req-hooks/bytebase/file/useUploadFileMutation';
import { usePackagesQuery } from 'src/_req-hooks/reality/package/usePackagesQuery';
import { useUpdateOrganizationMutation } from 'src/_req-hooks/reality/organization/useUpdateOrganizationMutation';
import { useSetupDomainMutation } from 'src/_req-hooks/reality/organization/useSetupDomainMutation';
import { useSetupShowroomUrlMutation } from 'src/_req-hooks/reality/organization/useSetupShowroomUrlMutation';

// types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// redux
import { useSelector, useDispatch } from 'src/redux/store';
import { organizationSelector, organizationChanged } from 'src/redux/slices/organization';
// _types
import {
  Action,
  State,
} from 'src/_types/sections/organization-management/organization-information';
// constants
import { domain_description, showroom_url_description } from 'src/constants';

const initialState: State = {
  company_logo: null,
  name: '',
  email: '',
  phone_number: '',
  website: '',
  domain: '',
  company_size: 0,
  industry: '',
  showroom_url: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'company_logo':
    case 'name':
    case 'email':
    case 'phone_number':
    case 'website':
    case 'domain':
    case 'company_size':
    case 'industry':
      return { ...state, [action.type]: action.payload };
    case 'update':
      return action.payload;
    default:
      return state;
  }
}

const IMAGE_MEGABYTE = 1048576;

function OrganizationInformation() {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const organization = useSelector(organizationSelector);
  const dispatchRedux = useDispatch();

  const { data: packageData, isSuccess } = usePackagesQuery(
    {
      per_page: 1,
      filters: {
        organization_id: { op: FilterOperatorsEnum._, value: organization?.ID },
      },
    },
    { enabled: !!organization?.ID }
  );

  const { mutateAsync: upload, isLoading: uploadLoading } = useUploadFileMutation();
  const { mutateAsync: updateOrganization, isLoading: updateOrganizationLoading } =
    useUpdateOrganizationMutation();

  const handleUpdateOrganization = useCallback(
    async (item: { value: string; id?: string }) => {
      const { value, id } = item;
      const itm =
        id &&
        ({
          ...organization,
          [id]: value,
        } as any);

      try {
        const { data } = await updateOrganization({
          ID: organization?.ID || 0,
          organization: itm,
        });

        dispatchRedux(organizationChanged(data));

        enqueueSnackbar(t('organization_management.update_organization_success'), {
          variant: 'success',
        });
      } catch (error) {
        enqueueSnackbar(error?.message, { variant: 'error' });
      }
    },
    [dispatchRedux, enqueueSnackbar, organization, t, updateOrganization]
  );

  const setFile = useCallback(
    (newFile: File | null) => {
      dispatch({ type: 'company_logo', payload: newFile });
    },
    [dispatch]
  );

  const handleDropSingleFile = useCallback(
    async (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0];

      if (newFile) {
        setFile(
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        );

        try {
          const filesResult = await upload({ files: [newFile] });
          dispatch({
            type: 'company_logo',
            payload: process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0],
          });
          handleUpdateOrganization({
            value: process.env.NEXT_PUBLIC_BYTEBASE_BASE_URL_DOWNLOAD + filesResult.data[0],
            id: 'company_logo',
          });
        } catch (error) {
          enqueueSnackbar(error?.data, { variant: 'error' });
        }
      }
    },
    [dispatch, enqueueSnackbar, handleUpdateOrganization, setFile, upload]
  );

  const { mutateAsync: setupDomain } = useSetupDomainMutation();
  const { mutateAsync: setupShowroomUrl } = useSetupShowroomUrlMutation();

  const handleUpdateDomain = useCallback(
    async (item: { value: string; id?: string }) => {
      const { value, id } = item;
      const itm =
        id &&
        ({
          ...organization,
          [id]: value,
        } as any);

      try {
        const setupDomainResult = await setupDomain({
          domain: value,
          mainCategoryNumber: organization?.category_id || 0,
        });

        if (setupDomainResult) {
          // Setup domain was successful
          const { data } = await updateOrganization({
            ID: organization?.ID || 0,
            organization: itm,
          });

          dispatchRedux(organizationChanged(data));

          enqueueSnackbar(t('organization_management.update_organization_success'), {
            variant: 'success',
          });
        } else {
          // An error occurred during domain setup
          enqueueSnackbar('Error setting up domain', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar(error?.data, { variant: 'error' });
      }
    },
    [dispatchRedux, enqueueSnackbar, organization, setupDomain, t, updateOrganization]
  );

  const handleUpdateShowroomUrl = useCallback(
    async (item: { value: string; id?: string }) => {
      const { value, id } = item;
      const itm =
        id &&
        ({
          ...organization,
          [id]: value,
        } as any);

      try {
        const setupDomainResult = await setupShowroomUrl({
          showroom_url: value,
          mainCategoryNumber: organization?.category_id || 0,
        });

        if (setupDomainResult) {
          // Setup domain was successful
          const { data } = await updateOrganization({
            ID: organization?.ID || 0,
            organization: itm,
          });

          dispatchRedux(organizationChanged(data));

          enqueueSnackbar(t('organization_management.update_organization_success'), {
            variant: 'success',
          });
        } else {
          // An error occurred during domain setup
          enqueueSnackbar('Error setting up domain', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar(error?.data, { variant: 'error' });
      }
    },
    [dispatchRedux, enqueueSnackbar, organization, setupShowroomUrl, t, updateOrganization]
  );

  const handleDropRejected = useCallback(
    (err: { errors: { code: string }[] }[]) => {
      if (err[0].errors[0].code === 'file-too-large') {
        enqueueSnackbar(t('project.project_image_size_1mb'), { variant: 'error' });
      }
    },
    [enqueueSnackbar, t]
  );

  useEffect(() => {
    dispatch({
      type: 'update',
      payload: {
        domain: organization?.domain || '',
        email: organization?.email || '',
        company_logo: organization?.company_logo || null,
        name: organization?.name || '',
        phone_number: organization?.phone_number || '',
        website: organization?.website || '',
        company_size: organization?.company_size || 0,
        industry: organization?.industry || '',
        showroom_url: organization?.showroom_url || '',
      },
    });
  }, [
    dispatch,
    organization?.company_logo,
    organization?.company_size,
    organization?.domain,
    organization?.email,
    organization?.industry,
    organization?.name,
    organization?.phone_number,
    organization?.website,
    organization?.showroom_url, // این خط رو اضافه کردیم
  ]);

  const isCategoryValid = useMemo(() => {
    const validCategoryIds = [1, 14, 21, 23, 29];
    return (
      isSuccess &&
      (packageData?.data.items[0].plan.title === 'premium' ||
        packageData?.data.items[0].plan.title === 'enterprise') &&
      organization?.category_id &&
      validCategoryIds.includes(organization?.category_id)
    );
  }, [isSuccess, packageData, organization?.category_id]);

  const isCategoryValidShowroom = useMemo(() => {
    const validCategoryIds = [1, 14, 21, 23, 29];
    return (
      isSuccess &&
      packageData?.data.items[0].plan.title === 'premium' &&
      organization?.category_id &&
      validCategoryIds.includes(organization?.category_id)
    );
  }, [isSuccess, packageData, organization?.category_id]);

  return (
    <Stack spacing={3}>
      <Typography variant="h5">{t('organization_management.organization_information')}</Typography>
      <Stack alignItems="flex-start" sx={{ width: 128 }}>
        <CircleProgress open={uploadLoading || updateOrganizationLoading} />
        <UploadAvatar
          maxSize={IMAGE_MEGABYTE}
          onDrop={handleDropSingleFile}
          onDropRejected={handleDropRejected}
          file={state.company_logo}
          sx={{ borderRadius: '10%' }}
          caption={
            <Typography variant="caption">
              {state.company_logo
                ? t('organization_management.upload_logo')
                : t('organization_management.update_logo')}
            </Typography>
          }
        />
      </Stack>
      <EditableInfoSection
        label={t('organization_management.organization_name')}
        value={state.name}
        id="name"
        onChange={handleUpdateOrganization}
      />
      <EditableInfoSection
        label={t('organization_management.email')}
        value={state.email}
        id="email"
        onChange={handleUpdateOrganization}
      />
      <EditableInfoSection
        label={t('organization_management.phone_number')}
        value={state.phone_number}
        id="phone_number"
        onChange={handleUpdateOrganization}
      />
      <EditableInfoSection
        label={t('organization_management.website')}
        value={state.website}
        id="website"
        onChange={handleUpdateOrganization}
      />
      {isCategoryValid && (
        <EditableInfoSection
          label={t('organization_management.domain')}
          value={state.domain}
          id="domain"
          btnDisabled={!isEmpty(state.domain)}
          onChange={handleUpdateDomain}
          iconName="mdi:information"
          popoverTitle={t('organization_management.setting_custom_domain_title')}
          warningText={t('organization_management.note_setting_subdomain')}
          popoverDescription={
            <List>
              <ListItem>
                <Typography variant="caption" sx={{ textAlign: 'justify' }}>
                  {t('organization_management.setting_custom_domain_description1')}
                </Typography>
              </ListItem>
              {React.Children.toArray(
                domain_description(t).map((text) => (
                  <Stack direction="row" alignItems="center" ml={2}>
                    <Iconify icon="bi:dot" />
                    <ListItem>
                      <Typography variant="caption" sx={{ textAlign: 'justify' }}>
                        {text}
                      </Typography>
                    </ListItem>
                  </Stack>
                ))
              )}
            </List>
          }
        />
      )}

      {isCategoryValidShowroom && (
        <EditableInfoSection
          label={t('organization_management.showroom_url')}
          value={state.showroom_url}
          id="showroom_url"
          btnDisabled={!isEmpty(state.showroom_url)}
          onChange={handleUpdateShowroomUrl}
          iconName="mdi:information"
          popoverTitle={t('organization_management.setting_showroom_url_title')}
          warningText={t('organization_management.note_setting_showroom')}
          popoverDescription={
            <List>
              <ListItem>
                <Typography variant="caption" sx={{ textAlign: 'justify' }}>
                  {t('organization_management.setting_showroom_url_description1')}
                </Typography>
              </ListItem>
              {React.Children.toArray(
                showroom_url_description(t).map((text) => (
                  <Stack direction="row" alignItems="center" ml={2}>
                    <Iconify icon="bi:dot" />
                    <ListItem>
                      <Typography variant="caption" sx={{ textAlign: 'justify' }}>
                        {text}
                      </Typography>
                    </ListItem>
                  </Stack>
                ))
              )}
            </List>
          }
        />
      )}

      <Divider />
      <EditableInfoSection
        label={t('organization_management.company_size')}
        value={state.company_size}
        content={<span />}
      />
      <EditableInfoSection
        label={t('organization_management.industry')}
        value={state.industry}
        content={<span />}
      />
    </Stack>
  );
}

export default OrganizationInformation;
