import {Route, Routes} from "react-router-dom";
import {
  Home,
  Other,
  Participate,
  Result,
} from "./pages";

export default function _Routes() {
  return (
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="other" element={<Other />} />
          <Route path="participate" element={<Participate />} />
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>
  );
}
