import { Navbar } from "@nextui-org/react";
import Link from "next/link";

import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";
import { useAuthContext } from "context/AuthContext";

export const Header = () => {
  const { currentUser, loading, logout, userInfo } = useAuthContext();

  const collapseItems = [
    "ホーム",
    "認知療法とは",
    "コミュニティ",
    "利用規約",
    "プライバシー",
    "ヘルプ＆お問い合わせ",
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
        <Link href="/">
          <div className="text-2xl font-bold">Daily Mind</div>
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
          <UserMenu onLogout={logout} userInfo={userInfo} />
        ) : (
          <LoginButton />
        )}
      </Navbar.Content>
      {/* <Navbar.Collapse>
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
      </Navbar.Collapse> */}
    </Navbar>
  );
};
