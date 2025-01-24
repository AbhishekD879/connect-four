"use client";
import Header from "@/app/two-player/_components/Header";
import { DialogProvider } from "@/lib/context/DialogContext";
import { SettingsContextProvider } from "@/lib/context/ConfigureContext";

export default function TwoPlayerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <SettingsContextProvider>
        <DialogProvider>{children}</DialogProvider>
      </SettingsContextProvider>
    </>
  );
}
