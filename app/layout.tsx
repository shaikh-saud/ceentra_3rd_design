import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Centra | منصة تربطك بأفضل شركات التسويق الرقمي في السعودية",
  description: "منصة سنترا تربطك بأفضل شركات التسويق الرقمي المعتمدة في السعودية. اطلب خدمتك بسهولة، قارن العروض، وابدأ بتنمية أعمالك بثقة.",
  keywords: [
    "منصة تسويق",
    "شركات تسويق رقمي",
    "السعودية",
    "خدمات تسويق",
    "تسويق إلكتروني",
  ],
  openGraph: {
    title: "Centra | منصة التسويق الرقمي في السعودية",
    description: "اكتشف أفضل شركات التسويق الرقمي المعتمدة وابدأ بتنمية أعمالك بسهولة وثقة.",
    type: "website",
    url: "https://ceentra.com/",
    images: [
      {
        url: "/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Centra | منصة التسويق الرقمي",
    description: "ابدأ رحلتك في التسويق الرقمي مع أفضل الشركات المعتمدة في السعودية.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo">{children}</body>
    </html>
  );
}
