// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// locales
import { useLocales } from 'src/locales';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';
import ModelViewer from '../model-viewer';

// ----------------------------------------------------------------------

type Props = {
  handleClick: (url: string) => void;
  data: {
    id: number;
    src: string;
    name: string;
    description: string;
    ar_link: string;
  }[];
};

export default function CarouselCenterMode({ data, handleClick }: Props) {
  const carousel = useCarousel({
    slidesToShow: 4,
    centerMode: true,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  });

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CarouselArrows filled onNext={carousel.onNext} onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (
            <Box key={item.id} sx={{ px: 1 }}>
              <CarouselItem
                item={item}
                handleClick={(url) => {
                  handleClick(url);
                }}
              />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    id: number;
    src: string;
    name: string;
    description: string;
    ar_link: string;
  };
  handleClick: (url: string) => void;
};

function CarouselItem({ item, handleClick }: CarouselItemProps) {
  const expanded = useBoolean();
  const { src } = item;
  const { t, isRtl } = useLocales();

  const buttonAlignment = isRtl ? 'end' : 'start'; // Adjust 'fa' to your locale code for Farsi if different

  const toggleExpanded = () => {
    expanded.onToggle();
  };

  return (
    <Box sx={{ textAlign: { md: 'left', sm: 'center' } }}>
      <Stack alignItems="center">
        <ModelViewer src={src} height="308px" width="340px" />
      </Stack>
      <Typography variant="h4" sx={{ mt: 2, direction: 'ltr' }} color="grey.100">
        {item.name}
      </Typography>
      <Stack direction="column" spacing={1}>
        <Typography
          variant="body1"
          color="grey.300"
          sx={{
            direction: 'ltr',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: expanded.value ? 'none' : 3,
            WebkitBoxOrient: 'vertical',
            maxHeight: expanded.value ? 'none' : '72px',
          }}
        >
          {item.description}
        </Typography>
        <Button
          sx={{
            mb: 2,
            color: 'secondary.darker',
            variant: 'text',
            textTransform: 'none',
            p: 0,
            minWidth: 'auto', // Adjusts button size to content width
            alignSelf: buttonAlignment, // Dynamically set based on the current locale
            width: 'fit-content', // Ensures the button doesn't stretch to fill its container
            '&:hover': {
              background: 'transparent',
            },
          }}
          onClick={toggleExpanded}
        >
          {expanded.value ? t('landing.show_less') : t('landing.show_more')}
        </Button>
      </Stack>
      <Button
        sx={{ mt: 2 }}
        color="secondary"
        variant="outlined"
        onClick={() => handleClick(item.ar_link)}
      >
        {t('landing.view_in_ar')}
      </Button>
    </Box>
  );
}
