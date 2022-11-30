import {
  Navbar,
  Text,
  Avatar,
  Dropdown,
  Button,
  Container,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect } from "react";
import Router from "next/router";

import Head from "next/head";
import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";
import { useAuthContext } from "context/AuthContext";

export const Layout = ({ children }: any) => {
  const { currentUser, loading, logout } = useAuthContext();

  const userPhotoUrl = currentUser?.photoURL;

  // useEffect(() => {
  //   if (!loading && !currentUser) {
  //     Router.push("/");
  //   }
  // }, [currentUser, loading]);

  const collapseItems = [
    "認知療法とは",
    "使い方",
    "Activity",
    "About",
    "利用規約",
    "プライバシー",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <>
      <Head>
        <title>Daily Mind | 嫌な気持ちを楽にする</title>
        <meta
          name="description"
          content="認知療法で心のセルフケアを練習しましょう"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container lg>
        <Navbar isBordered variant="sticky">
          <Navbar.Toggle showIn="sm" />
          <Navbar.Brand
            css={{
              "@xs": {
                w: "12%",
              },
            }}
          >
            <Link href="/">
              <div className="text-2xl font-bold">Daily Mind</div>
            </Link>
          </Navbar.Brand>
          <Navbar.Content
            enableCursorHighlight
            activeColor="secondary"
            hideIn="sm"
            variant="highlight-rounded"
          >
            <Navbar.Item>
              <Link href="/" className="pt-2.5">
                Home
              </Link>
            </Navbar.Item>
            <Navbar.Item isActive>
              <Link href="guide" className="pt-2.5">
                認知療法とは
              </Link>
            </Navbar.Item>
            <Navbar.Item>
              <Link href="#" className="pt-2.5">
                About
              </Link>
            </Navbar.Item>
          </Navbar.Content>
          <Navbar.Content>
            {currentUser ? (
              <UserMenu currentUser={currentUser} onLogout={logout} />
            ) : (
              <LoginButton />
            )}
          </Navbar.Content>
          <Navbar.Collapse>
            {collapseItems.map((item, index) => (
              <Navbar.CollapseItem
                key={item}
                activeColor="secondary"
                css={{
                  color: index === collapseItems.length - 1 ? "$error" : "",
                }}
                isActive={index === 0}
              >
                <Link href="#">{item}</Link>
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>
        </Navbar>
        {children}
      </Container>
    </>
  );
};
