import { metadata } from './metadata';
import ClientLayout from './client-layout';
import '../styles/globals.css';

// Export the metadata for Next.js
export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}