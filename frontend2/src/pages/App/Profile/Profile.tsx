import { AppStore } from "@/redux/store";
import { Text } from "@/styled-components";
import { useSelector } from "react-redux";
import { ProfileBox } from "./Profile.styled";

const Profile = () => {
  console.log("profile");
  const user = useSelector((store: AppStore) => store.user);

  return (
    <ProfileBox>
      {/* <Text fontSize="2rem">
        {JSON.stringify({ email: user.email, name: user.name })}
      </Text> */}
    </ProfileBox>
  );
};
export default Profile;
