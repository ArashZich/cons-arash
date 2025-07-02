interface Info {
  value: string;
  placeholder: string;
  info: string;
}

export const VideoFormBuilder: Info[] = [
  {
    value: 'phone_number',
    placeholder: '+98 21 1234 5678',
    info: 'project.video_phone_number',
  },
  {
    value: 'cell_phone',
    placeholder: '+98 912 345 6789',
    info: 'project.video_cell_phone_number',
  },
  {
    value: 'website',
    placeholder: 'https://www.yourwebsite.com',
    info: 'project.video_website',
  },
  {
    value: 'telegram',
    placeholder: 'your telegram',
    info: 'project.video_telegram',
  },
  {
    value: 'instagram',
    placeholder: 'your instagram',
    info: 'project.video_instagram',
  },
  {
    value: 'linkedin',
    placeholder: 'your account',
    info: 'project.video_linkedin',
  },
  {
    value: 'survey',
    placeholder: 'https://docs.google.com/forms/example',
    info: 'project.video_survey',
  },
];
