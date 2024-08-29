import dayjs from "dayjs"
import PageTitle from "../../../../components/page-title"
import usersStore, { UsersStoreProps } from "../../../../store/users-store"



function ProfilePage() {
  const {currentUser} = usersStore() as UsersStoreProps
  // const [oldPassword, setOldPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");

  const getUserProperty = (key:string, value:string)=>{
    return<div className="flex flex-col">
      <span className="text-[#cf8f50] font-semibold">{key}</span>
      <span className="text-secondary text-s,">{value}</span>
    </div>
  }
  return (
    <div>
      <PageTitle title="Profile"/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
        {getUserProperty("ID", currentUser?._id as string) ||  ""}
        {getUserProperty("Name", currentUser?.name || "")}
        {getUserProperty("Email", currentUser?.email || "")}
        {getUserProperty("Role", currentUser?.isAdmin ? "Admin" : "User")}
        {getUserProperty("Created At", dayjs(currentUser?.createdAt).format('MMM DD YYYY, hh:mm A') || "")}
        {getUserProperty("Updated At", dayjs(currentUser?.updatedAt).format('MMM DD YYYY, hh:mm A') || "")}
      </div>
      {/* <div className="mt-7 border border-secondary p-5">
        <h1 className="text-lg font-semibold text-secondary">Change Password</h1>
        <div className="flex gap-5">
        <div className="flex flex-col mt-5">
          <label  htmlFor="Old Password">
            <Input className="bg-primary border-secondary"
             type="password"
             placeholder="Old Password"
             value={oldPassword}
             onChange={(e) => setOldPassword(e.target.value)}/>
          </label>       
       </div>
       <div className="flex flex-col mt-5">
          <label  htmlFor="new Password">
            <Input className="bg-primary border-secondary"
             type="password"
             placeholder="New Password"
             value={newPassword}
             onChange={(e) => setNewPassword(e.target.value)}/>
          </label>       
       </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button type="primary">Update Password</Button>
        </div>
      </div> */}
    </div>
  )
}

export default ProfilePage