import { Navbar } from "@nextui-org/react";
import Link from "next/link";

import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";
import { useAuthContext } from "context/AuthContext";
import { Logo } from "./Logo";

export const Header = () => {
  const { currentUser, loading, logout, userInfo } = useAuthContext();

  const collapseItems = [
    { name: "ホーム", url: "/" },
    { name: "認知療法とは", url: "/guide" },
    { name: "Daily Mindについて", url: "/about" },
    { name: "お問い合わせ", url: "https://forms.gle/fdNoCX7MzChWnLFy7" },
  ];

  return (
    <Navbar isBordered maxWidth="lg" variant="sticky" className="bg-opacity-10">
      <Navbar.Toggle showIn="sm" aria-label="toggle navigation" />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <Link href="/" className="flex flex-row">
          <Logo className="sm:h-9 sm:w-9" />
          <div className="text-2xl font-semibold ml-1">Daily Mind</div>
        </Link>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        hideIn="sm"
        gap={20}
      >
        <Navbar.Item>
          <Link href="/">ホーム</Link>
        </Navbar.Item>
        <Navbar.Item>
          <Link href="/guide">認知療法とは</Link>
        </Navbar.Item>
        <Navbar.Item>
          <Link href="https://forms.gle/fdNoCX7MzChWnLFy7" target="_blank">
            お問い合わせ
          </Link>
        </Navbar.Item>
      </Navbar.Content>
      <Navbar.Content>
        {!loading && currentUser ? (
          <UserMenu
            currentUser={currentUser}
            onLogout={logout}
            userInfo={userInfo}
          />
        ) : (
          <LoginButton />
        )}
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={index}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={index === 0}
          >
            <Link href={item.url}>{item.name}</Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};
