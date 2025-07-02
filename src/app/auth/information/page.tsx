// sections

import { InformationView } from 'src/sections/auth/information/view';

// ----------------------------------------------------------------------

export async function generateMetadata() {
    return {
        title: 'Information',
    };
}

export default function InformationPage() {
    return <InformationView />;
}
