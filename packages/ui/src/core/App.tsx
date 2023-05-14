import { GitHubBanner, Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import {
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
  ThemedTitleV2,
} from '@refinedev/mantine';
import routerProvider from '@refinedev/nextjs-router';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';

import { Header } from '../components/header';
import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
// import { NotificationsContainer } from '@mantine/notifications';
import { dataProvider } from '@refinedev/supabase';
// import { appWithTranslation, useTranslation } from 'next-i18next';
import { authProvider } from '../utils/authProvider';
import { AppIcon } from '../components/app-icon';
import { supabaseClient } from '../utils';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
        Header={() => <Header sticky />}
        Title={({ collapsed }) => (
          <ThemedTitleV2
            collapsed={collapsed}
            text="refine Project"
            icon={<AppIcon />}
          />
        )}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  // const { t, i18n } = useTranslation();
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const i18nProvider = {
    translate: (key: string, params: object) => key, //t(key, params),
    changeLocale: async (lang: string) => {}, //</>(lang: string) => i18n.changeLanguage(lang),
    getLocale: () => 'en', //i18n.language,
  };

  return (
    <>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          {/* You can change the theme colors here. example: theme={{ ...RefineThemes.Magenta, colorScheme:colorScheme }} */}
          <MantineProvider
            theme={{ ...RefineThemes.Red, colorScheme: colorScheme }}
            withNormalizeCSS
            withGlobalStyles
          >
            <Global styles={{ body: { WebkitFontSmoothing: 'auto' } }} />
            {/* <NotificationsContainer position="top-right"> */}
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(supabaseClient)}
              authProvider={authProvider}
              notificationProvider={notificationProvider}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: 'blog_posts',
                  list: '/blog-posts',
                  create: '/blog-posts/create',
                  edit: '/blog-posts/edit/:id',
                  show: '/blog-posts/show/:id',
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: 'categories',
                  list: '/categories',
                  create: '/categories/create',
                  edit: '/categories/edit/:id',
                  show: '/categories/show/:id',
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              {renderComponent()}
              <RefineKbar />
              <routerProvider.UnsavedChangesNotifier />
            </Refine>
            {/* </NotificationsContainer> */}
          </MantineProvider>
        </ColorSchemeProvider>
      </RefineKbarProvider>
    </>
  );
};
