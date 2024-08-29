import { Button, Dropdown, MenuProps, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import usersStore, { UsersStoreProps } from "../store/users-store";
import { CircleUserRound } from "lucide-react";


function Header() {
    const {currentUser} = usersStore() as UsersStoreProps;
    const navigate = useNavigate();
    const onLogout = () => {
        Cookies.remove("token");
        message.success("Logged out successfully");
        navigate("/login");
    }
    const userMenuItems: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <Link to="/user/profile">Profile</Link>
          ),
        },
        {
            key: "2",
            label: (
             <Link to="/user/donations">Donations</Link>
            ),
        },
        {
            key: "3",
            label: (
                <Link to="/user/reports">Reports</Link>
            )
        },
        {
            key: "4",
            label:(
                <span onClick={onLogout}>
                    Logout
                </span>
            )
        },
      ];
      
      const adminMenuItems:MenuProps["items"] = [
        {
            key: "1",
            label: <Link to="/admin/donations">Donations</Link>
        },
        {
            key: "2",
            label: <Link to="/admin/campaigns">Campaigns</Link>
        },
        {
            key: "3",
            label: <Link to="/admin/users">Users</Link>
        },
        {
            key: "4",
            label: <Link to="/admin/reports">Reports</Link>
        },
        {
            key: "5",
            label: <span onClick={onLogout}>Logout</span>
        }
    ];

  const menuItemsToUse: any[] = currentUser?.isAdmin ? adminMenuItems : userMenuItems;
  return (
    <div className="bg-secondary flex justify-between items-center p-5">
      <h1 className="text-2xl font-bold text-primary cursor-pointer" 
        onClick={() => navigate("/")}>
        Krazy4Charity
      </h1>
      <Dropdown menu={{ items : menuItemsToUse }} placement="bottom">
        <Button size="middle" icon={<CircleUserRound size={16}/>}>
            {currentUser?.name}
        </Button>
      </Dropdown>
    </div>
  )
}

export default Header