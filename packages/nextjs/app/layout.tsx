import { Geist } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import "@scaffold-ui/components/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata = getMetadata({
  title: "Tokenization",
  description: "Discover, mint, and transfer fantasy character NFTs on Ethereum Sepolia.",
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning className={`${geist.variable} font-sans`}>
      <body>
        <ThemeProvider defaultTheme="dark" enableSystem={false}>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
