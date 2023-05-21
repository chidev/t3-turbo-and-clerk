import { AuthPage, ThemedTitleV2 } from "@refinedev/mantine";

import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// import { authProvider } from "../../utils/authProvider";

import { Auth } from "ui/src/core/Auth";
import { getAuth } from "@clerk/nextjs/server";

export default function Register() {
  return <Auth type="register" />;
}

Register.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const a = await getAuth(context.req);
  console.log(a);
  // const { authenticated } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!!a.session) {
    return {
      props: {},
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
