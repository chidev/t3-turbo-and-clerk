import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getAuth } from "@clerk/nextjs/server";

import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Sign In
        </h1>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  </main>
);

SignInPage.noLayout = true;

export default SignInPage;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { userId } = getAuth(context.req);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!!userId) {
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
