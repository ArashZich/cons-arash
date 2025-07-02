import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import { useSelector } from 'src/redux/store';
import { organizationSelector } from 'src/redux/slices/organization';
import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';
import Carousel, { CarouselDots, CarouselArrows, useCarousel } from 'src/components/carousel';
import { useGetProductViewQuery } from 'src/_req-hooks/reality/view/useGetProductView';
import { GetProductViewQueryParamsType } from 'src/_types/reality/view/getProductView';
import { FilterOperatorsEnum } from 'src/_types/site/filters';

export default function OverviewTopProjects() {
  const { t } = useLocales();
  const organization = useSelector(organizationSelector);

  const { data: productData, isSuccess } = useGetProductViewQuery({
    filters: {
      organization_id: { op: FilterOperatorsEnum._, value: organization?.ID },
    },
  });

  const productDataLength = productData?.data?.length ?? 0;

  const carousel = useCarousel({
    slidesToShow: productDataLength >= 4 ? 4 : productDataLength,
    centerMode: productDataLength > 3,
    centerPadding: productDataLength <= 3 ? '30px' : '0', // Adjust padding when there are 2 or 3 items
    autoplay: true,
    infinite: true,
    variableWidth: productDataLength <= 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
    ...CarouselDots({
      rounded: true,
      sx: { mt: 3 },
    }),
  });

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="h6">{t('overview.top_projects')}</Typography>
        <Stack ml="auto">
          <Button
            LinkComponent={Link}
            href={paths.dashboard.projects.category}
            sx={{ color: 'primary.main' }}
          >
            {t('overview.see_more')}
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          height: 'auto',
        }}
      >
        {isSuccess && (
          <CarouselArrows
            active={productDataLength > 4}
            filled
            shape="rounded"
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
          >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
              {productData?.data?.map((item) => (
                <Box key={item.ID} sx={{ px: 1, width: 'auto', height: 'auto' }}>
                  <CarouselItem len={productDataLength || 1} {...item} />
                </Box>
              ))}
            </Carousel>
          </CarouselArrows>
        )}
      </Box>
    </Stack>
  );
}

function CarouselItem(item: GetProductViewQueryParamsType & { len: number }) {
  const { t } = useLocales();
  const { product_uid, name, thumbnail_uri, view_count, len } = item;

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        maxWidth: len < 3 ? 300 : 'auto',
        width: len <= 2 ? 300 : 'auto',
      }}
    >
      <CardActionArea LinkComponent={Link} href={paths.project.details(product_uid)}>
        <Image alt={name} src={thumbnail_uri} ratio="1/1" />

        <CardContent
          sx={{
            bottom: 0,
            width: '100%',
            textAlign: 'left',
          }}
        >
          <TextMaxLine variant="subtitle2" sx={{ mb: 2 }}>
            {name.length > 20 ? `${name.slice(0, 20)}...` : name}
          </TextMaxLine>

          <Typography variant="caption" color="text.disabled">
            {view_count} {t('analytics.views')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
