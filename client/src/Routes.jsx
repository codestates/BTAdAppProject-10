import {Navigate, Route, Routes} from "react-router-dom";
import {
  Home,
  Participate,
  Result,
} from "./pages";

export default function _Routes() {
  return (
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="participate" element={<Participate />} />
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>
  );
}
