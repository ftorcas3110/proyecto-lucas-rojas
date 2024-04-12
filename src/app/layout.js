import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Background from "@/components/Background";
import { Toaster } from "react-hot-toast";

//const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header/>
        <Background/>
        <Toaster/>
        {children}
        </body>
    </html>
  );
}
