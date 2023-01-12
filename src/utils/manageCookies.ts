import { setCookie, destroyCookie } from "nookies";
import nookies from "nookies";
import { UserInfo } from "types/types";

export const setUserInfoCookies = (userInfo: UserInfo) => {
  setCookie(null, "uid", userInfo.uid, { path: "/" });
  setCookie(null, "avatar", userInfo.avatar || "", {
    path: "/",
  });
  setCookie(null, "nickname", userInfo.nickname, {
    path: "/",
  });
  setCookie(null, "bio", userInfo.bio || "", {
    path: "/",
  });
};

export const clearUserInfoCookies = () => {
  nookies.destroy(null, "token");
  destroyCookie(null, "uid");
  destroyCookie(null, "avatar");
  destroyCookie(null, "bio");
  destroyCookie(null, "nickname");
};
