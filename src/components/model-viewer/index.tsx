import Stack, { StackProps } from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// react
import React, { useEffect, useRef, useState, CSSProperties } from 'react';

// Define the outer progress bar container
const ProgressBar = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.grey[300],
  height: '5px',
  position: 'absolute',
  bottom: 0, // Ensure it's at the bottom
  display: 'none', // Initially hidden
}));

// Define the inner "updating" bar
const UpdateBar = styled('div')(({ theme }) => ({
  height: '5px',
  backgroundColor: theme.palette.primary.main,
  width: '0%', // Initial width is 0
}));

type ModelViewerProps = StackProps & {
  src: string; // The URL of the 3D model to display
  alt?: string; // A text description of the 3D model
  style?: CSSProperties; // Optional custom style, now primarily for additional styling
};

const ModelViewer: React.FC<ModelViewerProps> = ({ src, alt = '3D model', style, ...other }) => {
  const modelViewerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: '100%', height: '100%' }); // Defaults to full container size
  const [progress, setProgress] = useState(0); // Track progress as a percentage

  useEffect(() => {
    const handleProgress = (event: any) => {
      const { totalProgress } = event.detail;
      setProgress(totalProgress * 100);

      // Show or hide the ProgressBar based on progress
      if (totalProgress === 0) {
        modelViewerRef.current!.style.display = 'block';
      }
      // else if (totalProgress === 1) {
      //   setTimeout(() => {
      //     modelViewerRef.current!.style.display = 'none';
      //   }, 500); // Add delay for smoother transition
      // }
    };

    // Assuming modelViewerRef.current.querySelector('model-viewer') correctly selects your <model-viewer>
    const modelViewerElement = modelViewerRef.current?.querySelector('model-viewer');
    if (modelViewerElement) {
      modelViewerElement.addEventListener('progress', handleProgress);
    }

    return () => {
      if (modelViewerElement) {
        modelViewerElement.removeEventListener('progress', handleProgress);
      }
    };
  }, []);

  // Update ProgressBar and UpdateBar based on progress
  const progressBarStyle = { display: progress < 100 ? 'block' : 'none' }; // Control visibility
  const updateBarStyle = { width: `${progress}%` }; // Update width

  useEffect(() => {
    import('@google/model-viewer/dist/model-viewer').then(() => {
      // Ensures the model-viewer component is defined once the import is completed
    });

    const resizeObserver = new ResizeObserver((entries) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width: `${width}px`, height: `${height}px` });
      }
    });

    if (modelViewerRef.current) {
      resizeObserver.observe(modelViewerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Merge custom styles with dynamically calculated dimensions
  const finalStyle = { ...dimensions, ...style };

  return (
    <Stack ref={modelViewerRef} {...other}>
      <model-viewer src={src} alt={alt} auto-rotate camera-controls autoplay style={finalStyle}>
        <Button slot="ar-button" sx={{ display: 'none' }} />

        <ProgressBar style={progressBarStyle} slot="progress-bar">
          <UpdateBar style={updateBarStyle} />
        </ProgressBar>
      </model-viewer>
    </Stack>
  );
};

export default ModelViewer;

// import dynamic from 'next/dynamic';
//   const ModelViewer = dynamic(
//     () => import('@google/model-viewer').then((mod) => mod.ModelViewerElement),
//     { ssr: false }
//   );
