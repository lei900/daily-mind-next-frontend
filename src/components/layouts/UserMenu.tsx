import { Navbar, Text, Avatar, Dropdown } from "@nextui-org/react";
import Link from "next/link";
import { AvatarIcon, BellIcon, LogoutIcon } from "components/Icons";
import { User } from "firebase/auth";

type Props = {
  currentUser: User;
  onLogout: () => {};
};

const UserMenu = ({ currentUser, onLogout }: Props) => {
  // const userPhotoUrl = currentUser.photoURL;
  const userName = "User_" + currentUser.uid.slice(0, 4);

  return (
    <>
      <Navbar.Item className="xs:flex hidden">
        <div className="group rounded-full hover:bg-gray-100 p-2">
          <BellIcon className="w-6 h-6 group-hover:stroke-gray-800" />
        </div>
      </Navbar.Item>
      <Dropdown placement="bottom-right">
        <Navbar.Item>
          <Dropdown.Trigger>
            <Avatar as="button" size="md" icon={<AvatarIcon />} />
          </Dropdown.Trigger>
        </Navbar.Item>
        <Dropdown.Menu
          aria-label="User menu actions"
          color="secondary"
          // onAction={(actionKey) => console.log({ actionKey })}
        >
          <Dropdown.Item key="profile" css={{ height: "$18" }}>
            <Text b color="inherit" css={{ d: "flex" }}>
              Welcome
            </Text>
            <Text b color="inherit" css={{ d: "flex" }}>
              {userName!}
            </Text>
          </Dropdown.Item>
          <Dropdown.Item key="add-diaries" withDivider>
            <Link href="/diaries/new">今日の気持ち作成</Link>
          </Dropdown.Item>
          <Dropdown.Item key="add-thought-analyses">
            <Link href="/thought-analyses/new">ゆがみ分析作成</Link>
          </Dropdown.Item>
          <Dropdown.Item
            key="logout"
            withDivider
            color="error"
            icon={<LogoutIcon />}
          >
            <div onClick={onLogout}>ログアウト</div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default UserMenu;
