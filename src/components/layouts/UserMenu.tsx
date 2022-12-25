import { Navbar, Text, Avatar, Dropdown, Popover } from "@nextui-org/react";
import Link from "next/link";
import { User } from "firebase/auth";

type Props = {
  currentUser: User;
  onLogout: () => {};
};

const UserMenu = ({ currentUser, onLogout }: Props) => {
  const userPhotoUrl = currentUser.photoURL;
  const userName = currentUser.displayName;

  return (
    <Navbar.Content
      css={{
        "@xs": {
          w: "12%",
          jc: "flex-end",
        },
      }}
    >
      <Dropdown placement="bottom-right">
        <Navbar.Item>
          <Dropdown.Trigger>
            <Avatar as="button" size="md" src={userPhotoUrl!} />
          </Dropdown.Trigger>
        </Navbar.Item>
        <Dropdown.Menu
          aria-label="User menu actions"
          color="secondary"
          onAction={(actionKey) => console.log({ actionKey })}
        >
          <Dropdown.Item key="profile" css={{ height: "$18" }}>
            <Text b color="inherit" css={{ d: "flex" }}>
              Welcome
            </Text>
            <Text b color="inherit" css={{ d: "flex" }}>
              {userName!}
            </Text>
          </Dropdown.Item>
          <Dropdown.Item key="settings" withDivider>
            My Settings
          </Dropdown.Item>
          <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
          <Dropdown.Item key="analytics" withDivider>
            Analytics
          </Dropdown.Item>
          <Dropdown.Item key="system">System</Dropdown.Item>
          <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
          <Dropdown.Item key="help_and_feedback" withDivider>
            Help & Feedback
          </Dropdown.Item>
          <Dropdown.Item key="logout" withDivider color="error">
            <div onClick={onLogout}>ログアウト</div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar.Content>
  );
};

export default UserMenu;
