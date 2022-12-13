import RoutesNotFound from "@/utilities/routesNotFound";
import { lazy } from "react";
import { Route } from "react-router-dom";
import Posts from "./Post/Posts";

const Home = lazy(() => import("./Home/components/Home"));
const Profile = lazy(() => import("./Profile/Profile"));
const Messages = lazy(() => import("./Messages/Messages"));

const Private = () => {
  return (
    <RoutesNotFound>
      <Route path="/" element={<Home></Home>}>
        <Route path="/" element={<Posts></Posts>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/:id" element={<Profile></Profile>}></Route>
        <Route path="/messages" element={<Messages></Messages>}></Route>
      </Route>
    </RoutesNotFound>
  );
};
export default Private;
