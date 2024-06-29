import Navbar from "../features/navbar/Navbar";
import UserOrder from "../features/user/UserOrder";

function UserOrdersPage() {
    return (
      <>
        <Navbar>
          <UserOrder></UserOrder>
        </Navbar>
      </>
    );
  }
  export default UserOrdersPage;