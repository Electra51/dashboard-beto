import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { hydrate, logout } from "@/store/authSlice";
import { User } from "@/types";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("auth-token");
        const userString = localStorage.getItem("auth-user");

        if (token && userString) {
          const user: User = JSON.parse(userString);
          dispatch(hydrate({ token, user }));
        }
      } catch (error) {
        console.error("error.....", error);
        localStorage.removeItem("auth-token");
        localStorage.removeItem("auth-user");
      }
    };

    initializeAuth();
  }, [dispatch]);

  const logoutUser = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
    dispatch(logout());
    router.push("/login");
  };

  const requireAuth = () => {
    if (!auth.isAuthenticated) {
      router.push("/login");
      return false;
    }
    return true;
  };

  const isUserInRole = (roles: string | string[]): boolean => {
    if (!auth.user) return false;

    const userRoles = Array.isArray(roles) ? roles : [roles];
    return userRoles.includes(auth.user.role);
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    user: auth.user,
    token: auth.token,

    logout: logoutUser,
    requireAuth,
    isUserInRole,

    userName: auth.user?.name || "",
    userEmail: auth.user?.email || "",
    userRole: auth.user?.role || "",
    userAvatar: auth.user?.avatar || "",
  };
};
