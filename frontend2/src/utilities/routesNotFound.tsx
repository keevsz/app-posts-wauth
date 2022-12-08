import NotFound from "@/pages/Others/NotFound";
import { Route, Routes } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
const RoutesNotFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default RoutesNotFound;
