import "./globals.css";
import { Montserrat } from "next/font/google";
import { withBasePath } from "./utils/basePath";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Apple's Portfolio",
  description: "A tech-art enthusiast portfolio",
  icons: {
    icon: [{ url: withBasePath("/images/apple-icon.png"), sizes: "any" }],
    apple: [{ url: withBasePath("/images/apple-icon.png"), sizes: "any" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href={withBasePath("/images/apple-icon.png")}
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href={withBasePath("/images/apple-icon.png")}
        />
        <link
          href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
