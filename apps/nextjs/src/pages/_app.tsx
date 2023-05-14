// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import NextLink from "next/link";
import { UIProvider } from "ui";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <UIProvider NextLink={NextLink}>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </UIProvider>
  );
};

export default trpc.withTRPC(MyApp);
