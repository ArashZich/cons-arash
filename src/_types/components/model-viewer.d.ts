// src/custom-elements.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'ios-src'?: string;
      src?: string;
      poster?: string;
      alt?: string;
      ar?: boolean;
      'ar-modes'?: string;
      'ar-placement'?: 'floor' | 'wall';
      'camera-controls'?: boolean;
      'auto-rotate'?: boolean;
      'ar-scale'?: 'auto' | 'fixed';
      showPoster?: (a: any, b: any) => void; // Adjust the type of parameters a and b as needed
      'interpolation-decay'?: string;
      'ar-tracking'?: string;
      'xr-environment'?: boolean;
      'environment-image'?: string;
      'shadow-intensity'?: string;
      'shadow-softness'?: string;
      loading?: 'eager';
      autoplay?: boolean;
      // Include any additional properties as needed
    };
  }
}
