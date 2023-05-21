// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import { App } from "ui/src/core/App";
import { appWithTranslation, useTranslation } from "next-i18next";
import { useAuthProvider } from "../utils/authProvider";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <ClerkProvider {...pageProps}>
      <App
        Component={Component}
        pageProps={pageProps}
        i18nProvider={i18nProvider}
        useAuthProvider={useAuthProvider}
      />
    </ClerkProvider>
  );
};

export default trpc.withTRPC(appWithTranslation(MyApp));
