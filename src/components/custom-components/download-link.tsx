import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// This function now accepts an additional `lang` parameter to determine the language
const InsertDownloadLink = (text: string, url: string | undefined, lang: string) => {
  // Define the word to replace based on the language
  const downloadWord = lang === 'fa' ? 'دانلود' : 'download';

  // Split the text around the word "download" or "دانلود"
  const parts = text?.split(downloadWord);

  return (
    <Typography variant="body2" sx={{ mt: 3 }}>
      {parts[0]}
      <Link href={url} download underline="hover" sx={{ cursor: 'pointer', color: 'text.primary' }}>
        {downloadWord}
      </Link>
      {parts[1]}
    </Typography>
  );
};

export default InsertDownloadLink;
