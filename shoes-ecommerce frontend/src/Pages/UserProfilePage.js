import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/UserProfile";

function UserProfilePage() {
    return (
      <>
        <Navbar>
          <UserProfile></UserProfile>
        </Navbar>
      </>
    );
  }
  export default UserProfilePage;