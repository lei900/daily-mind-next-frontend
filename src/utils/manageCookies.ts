import { setCookie, destroyCookie } from "nookies";
import nookies from "nookies";
import { UserInfo } from "types/types";

export const setUserInfoCookies = (userInfo: UserInfo) => {
  setCookie(null, "uid", userInfo.uid, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
  setCookie(null, "avatar", userInfo.avatar || "", {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
  setCookie(null, "nickname", userInfo.nickname, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
  setCookie(null, "bio", userInfo.bio || "", {
    maxAge: 30 * 24 * 60 * 60,
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
