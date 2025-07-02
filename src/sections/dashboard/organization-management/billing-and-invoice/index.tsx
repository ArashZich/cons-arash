// react
import React, { useCallback, useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
// immer
import { useImmerReducer, useImmer } from 'use-immer';
// i18n
import { useLocales } from 'src/locales';
// components
import { useSnackbar } from 'src/components/snackbar';
import { EditableInfoSection } from 'src/components/custom-editable-section/editable-info-section';
// req-hooks
import { useUpdateOrganizationMutation } from 'src/_req-hooks/reality/organization/useUpdateOrganizationMutation';
// redux
import { useSelector, useDispatch } from 'src/redux/store';
import { organizationSelector, organizationChanged } from 'src/redux/slices/organization';
// _types
import { Action, State } from 'src/_types/sections/organization-management/billing-and-invoice';

const initialState: State = {
  company_name: '',
  company_registration_number: '',
  national_code: '',
  legal_address: '',
  zip_code: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'company_name':
    case 'company_registration_number':
    case 'national_code':
    case 'legal_address':
    case 'zip_code':
      return { ...state, [action.type]: action.payload };
    case 'update':
      return action.payload;
    default:
      return state;
  }
}

function BillingAndInvoice() {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [status, setStatus] = useImmer('legal');
  const organization = useSelector(organizationSelector);
  const dispatchRedux = useDispatch();

  const { mutateAsync: updateOrganization } = useUpdateOrganizationMutation();

  const handleUpdateOrganization = useCallback(
    async (item: { value: string; id?: string }) => {
      const { value, id } = item;
      const itm =
        id &&
        ({
          ...organization,
          is_individual: status === 'individual',
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
        enqueueSnackbar(error?.data, { variant: 'error' });
      }
    },

    [dispatchRedux, enqueueSnackbar, organization, status, t, updateOrganization]
  );

  useEffect(() => {
    dispatch({
      type: 'update',
      payload: {
        company_name: organization?.company_name || '',
        company_registration_number: organization?.company_registration_number || '',
        national_code: organization?.national_code || '',
        legal_address: organization?.legal_address || '',
        zip_code: organization?.zip_code || '',
      },
    });
    setStatus(organization?.is_individual ? 'individual' : 'legal');
  }, [
    dispatch,
    organization?.company_name,
    organization?.company_registration_number,
    organization?.is_individual,
    organization?.legal_address,
    organization?.national_code,
    organization?.zip_code,
    setStatus,
  ]);

  return (
    <Stack spacing={3}>
      <Typography variant="h5">{t('organization_management.user_information')}</Typography>
      <Stack>
        <Typography>{t('organization_management.billing_and_invoice_information')}</Typography>
        <RadioGroup row defaultValue="g">
          <FormControlLabel
            onChange={() => setStatus('legal')}
            checked={status === 'legal'}
            value="legal"
            control={<Radio size="medium" color="default" />}
            label={t('organization_management.legal_user')}
          />
          <FormControlLabel
            onChange={() => setStatus('individual')}
            checked={status === 'individual'}
            value="individual"
            control={<Radio size="medium" color="default" />}
            label={t('organization_management.individual_user')}
          />
        </RadioGroup>
      </Stack>
      {status === 'legal' && (
        <Stack spacing={3}>
          <Typography variant="subtitle1">
            {t('organization_management.legal_information')}
          </Typography>
          <EditableInfoSection
            label={t('organization_management.company_registration_name')}
            value={state.company_name}
            id="company_name"
            onChange={handleUpdateOrganization}
          />

          <EditableInfoSection
            label={t('organization_management.company_registration_number')}
            value={state.company_registration_number}
            id="company_registration_number"
            onChange={handleUpdateOrganization}
          />

          <EditableInfoSection
            label={t('organization_management.national_id_or_economic_number')}
            value={state.national_code}
            id="national_code"
            onChange={handleUpdateOrganization}
          />

          <EditableInfoSection
            label={t('organization_management.registration_address')}
            value={state.legal_address}
            id="legal_address"
            onChange={handleUpdateOrganization}
          />

          <EditableInfoSection
            label={t('organization_management.zip_code')}
            value={state.zip_code}
            id="zip_code"
            onChange={handleUpdateOrganization}
          />
        </Stack>
      )}

      {status === 'individual' && (
        <Stack spacing={3}>
          <Typography variant="subtitle1">
            {t('organization_management.individual_information')}
          </Typography>

          <EditableInfoSection
            label={t('organization_management.name')}
            value={state.company_name}
            id="company_name"
            onChange={handleUpdateOrganization}
          />

          <EditableInfoSection
            label={t('organization_management.national_code')}
            value={state.national_code}
            id="national_code"
            onChange={handleUpdateOrganization}
          />

          <EditableInfoSection
            label={t('organization_management.address')}
            value={state.legal_address}
            id="legal_address"
            onChange={handleUpdateOrganization}
          />

          <EditableInfoSection
            label={t('organization_management.zip_code')}
            value={state.zip_code}
            id="zip_code"
            onChange={handleUpdateOrganization}
          />
        </Stack>
      )}
    </Stack>
  );
}

export default BillingAndInvoice;
