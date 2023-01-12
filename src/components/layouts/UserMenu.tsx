import { Navbar, Text, Dropdown } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

import { AvatarIcon, BellIcon, LogoutIcon } from "components/Icons";
import { UserInfo } from "types/types";

type Props = {
  onLogout: () => {};
  userInfo: UserInfo;
};

const UserMenu = ({ onLogout, userInfo }: Props) => {
  return (
    <>
      {/* <Navbar.Item className="xs:flex hidden">
        <div className="group rounded-full hover:bg-gray-100 p-2">
          <BellIcon className="w-6 h-6 group-hover:stroke-gray-800" />
        </div>
      </Navbar.Item> */}
      <Dropdown placement="bottom-right">
        <Navbar.Item>
          <Dropdown.Trigger>
            {userInfo.avatar ? (
              <div className="sm:w-12 sm:h-12 w-10 h-10">
                <Image
                  src={userInfo.avatar}
                  width={48}
                  height={48}
                  alt="Avatar"
                  className="rounded-full"
                  priority
                />
              </div>
            ) : (
              <div className="cursor-pointer">
                <AvatarIcon className="sm:w-12 sm:h-12 w-10 h-10" />
              </div>
            )}
          </Dropdown.Trigger>
        </Navbar.Item>
        <Dropdown.Menu
          aria-label="User menu actions"
          color="secondary"
          // onAction={(actionKey) => console.log({ actionKey })}
        >
          <Dropdown.Item key="mypage" css={{ height: "$18" }}>
            <Link href={`/user/${userInfo.uid}`}>
              <Text color="inherit" css={{ d: "flex" }}>
                Welcome
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                {userInfo.nickname}
              </Text>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item key="edit-profile" withDivider>
            <Link href="/settings/profile">プロフィール編集</Link>
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
