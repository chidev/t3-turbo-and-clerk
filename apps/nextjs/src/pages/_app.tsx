// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import { App } from "ui/src/core/App";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <App Component={Component} pageProps={pageProps} />
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
