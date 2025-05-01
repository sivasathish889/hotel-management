import axios from "axios";
import "./globals.css";
import db from "./lib/db";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  // db Connection
  db();
  return (
    <html lang="en">
      <body
        className={` antialiased h-[100vh] bg-[#f5f5f5] flex items-center justify-center`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
