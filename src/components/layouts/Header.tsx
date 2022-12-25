import { Navbar } from "@nextui-org/react";
import Link from "next/link";

import UserMenu from "./UserMenu";
import LoginButton from "./LoginButton";
import { useAuthContext } from "context/AuthContext";

export const Header = () => {
  const { currentUser, loading, logout } = useAuthContext();

  const collapseItems = [
    "認知療法とは",
    "使い方",
    "About",
    "利用規約",
    "プライバシー",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar isBordered maxWidth="lg" variant="sticky" className="bg-opacity-10">
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
        gap={20}
      >
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="guide">Guide</Navbar.Link>
        <Navbar.Link href="#">Community</Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
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
  );
};
