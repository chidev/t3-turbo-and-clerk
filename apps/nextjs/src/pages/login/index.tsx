import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// import { authProvider } from "../../utils/authProvider";
import { Auth } from "ui/src/core/Auth";

export default function Login() {
  return <Auth type="login" />;
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  // const { authenticated } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (true) {
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
