import {Navigate, Route, Routes} from "react-router-dom";
import {
  Home,
} from "./pages";

export default function _Routes() {
  return (
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
  );
}
