import './globals.css';

export const metadata = {
  title: 'BUILT// ONGRID — Creative Digital Studio',
  description: 'We build businesses. We put them on the network.',
  metadataBase: new URL('https://builtongrid.com'),
  openGraph: {
    title: 'BUILT// ONGRID — Creative Digital Studio',
    description: 'We build businesses. We put them on the network.',
    type: 'website',
    siteName: 'BUILT// ONGRID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BUILT// ONGRID — Creative Digital Studio',
    description: 'We build businesses. We put them on the network.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
