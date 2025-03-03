import { getSettings } from "@/actions/content.actions";
import "./globals.css";
import Layout from "@/components/layout";
import { getServices } from "@/actions/service.actions";

// export async function generateMetadata() {
//   const settings = await getSettings();

//   return {
//     title: `${settings.site_name} | ${settings.site_main_title}`,
//     description: settings.site_description,
//     openGraph: {
//       title: `${settings.site_name} | ${settings.site_main_title}`,
//       description: settings.site_description,
//       url: `${settings.domain}`,
//       images: [{ url: settings.image }],
//       type: 'website',
//     },
//   };
// }

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const services = await getServices()
  const settings = await getSettings();

  return (
    <html lang="en">
      <body>
        <Layout services={services} settings={settings}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
