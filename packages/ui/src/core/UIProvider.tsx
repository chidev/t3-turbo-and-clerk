import { SaasProvider, LinkProps } from '@saas-ui/react';
import { theme } from '../theme';

export const UIProvider = ({ children, NextLink }: any) => {
  const Link: React.FC<LinkProps> = (props) => {
    return <NextLink {...props} legacyBehavior />;
  };

  return (
    <SaasProvider theme={theme} linkComponent={Link}>
      {children}
    </SaasProvider>
  );
};
