import "./globals.css";
import db from "./lib/db";


export default function RootLayout({ children }) {
  db()
  return (
    <html lang="en">
      <body
        className={` antialiased h-[100vh] bg-[#f5f5f5] flex items-center justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
