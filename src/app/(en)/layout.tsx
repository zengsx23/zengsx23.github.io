import type { ReactNode } from 'react';
import Script from 'next/script';
import SiteRootLayout, {
  buildChunkRecoveryScript,
  buildLocalizedMetadata,
  getDeploymentVersion,
} from '@/components/layout/SiteRootLayout';
import '../globals.css';

export const metadata = buildLocalizedMetadata('en');

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  const deploymentVersion = getDeploymentVersion();

  return (
    <SiteRootLayout
      locale="en"
      deploymentVersion={deploymentVersion}
      recoveryScript={(
        <Script
          id="chunk-load-recovery"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: buildChunkRecoveryScript(deploymentVersion) }}
        />
      )}
    >
      {children}
    </SiteRootLayout>
  );
}
