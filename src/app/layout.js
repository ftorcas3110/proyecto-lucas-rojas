import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Background from "@/components/Background";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";

//const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  title: "Licitaciones Lucas Rojas",
  description: "Licitaciones Lucas Rojas",
  manifest: '/manifest.json'
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header session={session}/>
        <Background/>
        <Toaster position="top-center"
        containerClassName=""
        containerStyle={{
          top: 80
        }}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#21b026",
            color: "#fff",
          },
        }} />
        {children}
        </body>
    </html>
  );
}