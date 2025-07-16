'use client';

// @mui
import Stack from '@mui/material/Stack';
// req-hooks
import { useProductsQuery } from 'src/_req-hooks/reality/product/useProductsQuery';
// types
import { FilterOperatorsEnum } from 'src/_types/site/filters';
// redux
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';
//
import ProjectDetails from '../project-details';

// ----------------------------------------------------------------------

type Props = {
  uid: string;
};

export default function ProjectDetailsView({ uid }: Props) {
  const organization = useSelector(organizationSelector);

  const { data: currentProducts, isSuccess } = useProductsQuery({
    per_page: 1,
    filters: {
      product_uid: {
        op: FilterOperatorsEnum._,
        value: uid,
      },
      organization_id: { op: FilterOperatorsEnum._, value: organization?.ID },
    },
  });

  return (
    <Stack
      maxWidth={1440}
      sx={{ height: '100%', px: 2 }}
      alignItems="center"
      justifyContent="center"
    >
      {isSuccess && <ProjectDetails project={currentProducts.data.items[0]} />}
    </Stack>
  );
}
