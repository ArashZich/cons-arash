// @mui/material
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
// components
import Iconify from '../iconify';

export const AccordionFAQ = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
  borderRadius: '24px',
  backgroundColor: '#FFFFFF1A',

  // اضافه کردن این استایل‌ها
  '&:hover': {
    backgroundColor: '#FFFFFF1A',
  },
  '&.Mui-expanded': {
    backgroundColor: '#FFFFFF1A',
  },
  '&.MuiButtonBase-root': {
    backgroundColor: '#FFFFFF1A',
  },
  '& .MuiAccordionSummary-root': {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-expanded': {
      backgroundColor: 'transparent',
    },
  },
}));

export const AccordionSummaryFAQ = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <Iconify
        icon="eva:arrow-ios-upward-fill"
        sx={{ width: 32, height: 32, color: 'secondary.light' }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  padding: theme.spacing(4, 2),
  alignItems: 'center', // این خط اضافه شد
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(180deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    margin: 0, // این خط اضافه شد
    marginLeft: theme.spacing(1),
  },
}));
