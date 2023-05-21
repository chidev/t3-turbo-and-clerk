import { AuthPage, ThemedTitleV2 } from '@refinedev/mantine';

import { AppIcon } from '../components/app-icon';
import { AuthProps } from '@refinedev/core';

export const Auth = ({ type }: { type: AuthProps['type'] }) => {
  return (
    <AuthPage
      type={type}
      formProps={{
        initialValues: {
          email: 'info@refine.dev',
          password: 'refine-supabase',
        },
      }}
      title={
        <ThemedTitleV2
          collapsed={false}
          text="refine Project"
          icon={<AppIcon />}
        />
      }
    />
  );
};
