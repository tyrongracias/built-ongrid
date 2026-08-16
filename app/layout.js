import './globals.css';

export const metadata = {
  title: 'BUILT// ONGRID — Creative Digital Studio',
  description: 'We build your business and help them get OnGrid.',
  metadataBase: new URL('https://builtongrid.com'),
  openGraph: {
    title: 'BUILT// ONGRID — Creative Digital Studio',
    description: 'We build your business and help them get OnGrid.',
    type: 'website',
    siteName: 'BUILT// ONGRID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BUILT// ONGRID — Creative Digital Studio',
    description: 'We build your business and help them get OnGrid.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
