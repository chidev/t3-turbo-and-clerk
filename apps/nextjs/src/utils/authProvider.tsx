import { AuthBindings } from "@refinedev/core";
import { useAuth, UserButton } from "@clerk/nextjs";

export const useAuthProvider = (): [AuthBindings, JSX.Element] => {
  const clerk = useAuth();

  const userButton = (
    <UserButton
      appearance={{
        elements: {
          userButtonAvatarBox: {
            width: "2.2rem",
            height: "2.2rem",
          },
        },
      }}
    />
  );

  const authProvider: AuthBindings = {
    login: async () => {
      return {
        success: true,
      };
    },
    logout: async () => {
      try {
        await clerk.signOut();
      } catch (error) {
        return {
          success: false,
          error,
        };
      }

      return {
        success: true,
        redirectTo: "/sign-in",
      };
    },
    check: async (ctx) => {
      if (clerk.isSignedIn) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        redirectTo: "/sign-in",
      };
    },
    getPermissions: async () => {
      if (clerk.isSignedIn) {
        return clerk.actor?.roles;
      }

      return null;
    },
    // todo get profile from supabase db
    getIdentity: async () => {
      console.log(clerk);
      if (clerk.isSignedIn) {
        return {
          userId: clerk.userId,
          name: "jp",
          avatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
        };
      }

      return null;
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
  };

  return [authProvider, userButton];
};
