import { Poppins, Urbanist } from "next/font/google";

export const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap", variable: "--font-poppins" });
export const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-urbanist"
});
