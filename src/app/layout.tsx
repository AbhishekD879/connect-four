import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#CCD2D8] md:max-w-5xl mx-auto h-screen relative">
        {children}
      </body>
    </html>
  );
}
