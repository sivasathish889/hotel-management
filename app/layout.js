import "./globals.css";
import db from "./lib/db";


export default function RootLayout({ children }) {
  db()
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
