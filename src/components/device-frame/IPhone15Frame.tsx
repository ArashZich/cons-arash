import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

// Styled components
const IPhoneFrame = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  width: '300px',
  height: '600px',
  borderRadius: '50px',
  backgroundColor: '#000',
  padding: '12px',
  boxShadow: '0 0 20px rgba(0,0,0,0.15)',
  border: '1px solid rgba(255,255,255,0.1)',
}));

const Screen = styled(Box)<BoxProps>({
  width: '100%',
  height: '100%',
  backgroundColor: '#000',
  borderRadius: '38px',
  overflow: 'hidden',
  position: 'relative',
});

const Notch = styled(Box)<BoxProps>({
  position: 'absolute',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '120px', // عرض تصویر Notch
  height: '35px', // ارتفاع تصویر Notch
  backgroundImage: `url('https://armogroup.storage.iran.liara.space/ar-carpet/Notch.webp')`,
  backgroundSize: 'cover', // تصویر را متناسب با ابعاد Box تنظیم می‌کند
  backgroundPosition: 'center', // تصویر را در وسط Box قرار می‌دهد
  zIndex: 10,
});

const VideoContainer = styled(Box)<BoxProps>({
  width: '100%',
  height: '100%',
  position: 'relative',
});

const StyledVideo = styled('video')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

interface IPhone15FrameProps {
  videoSource: string;
}

export default function IPhone15Frame({ videoSource }: IPhone15FrameProps) {
  return (
    <IPhoneFrame>
      <Screen>
        <Notch />
        <VideoContainer>
          <StyledVideo autoPlay loop muted playsInline>
            <source src={videoSource} type="video/webm" />
          </StyledVideo>
        </VideoContainer>
      </Screen>
    </IPhoneFrame>
  );
}
