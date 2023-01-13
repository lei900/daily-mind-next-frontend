import { GetServerSideProps } from "next";
import nookies from "nookies";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Radio } from "@nextui-org/react";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserData, UserInfo } from "types/types";
import axios from "axios";
import { AvatarIcon } from "components/Icons";
import { useAuthContext } from "context/AuthContext";
import useAxios from "hooks/useAxios";
import { setUserInfoCookies } from "utils/manageCookies";

export default function UpgradePage() {
  return (
    <>
      <div>upgrade</div>
    </>
  );
}
