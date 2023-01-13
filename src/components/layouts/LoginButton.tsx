import Link from "next/link";
import { Navbar } from "@nextui-org/react";

const LoginButton = () => {
  return (
    <Navbar.Item>
      <Link
        href="/login"
        className="block rounded-lg bg-indigo-500 px-4 py-2 text-white  transition hover:bg-indigo-700 focus:outline-none focus:ring"
        type="button"
      >
        <span className="text-base font-semibold"> Login </span>
      </Link>
    </Navbar.Item>
  );
};

export default LoginButton;
