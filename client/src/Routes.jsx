import {Route, Routes} from "react-router-dom";
import {
  Home,
  Other,
  CurrentBet,
  Result,
} from "./pages";

export default function _Routes() {
  return (
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="other" element={<Other />} />
          <Route path="current" element={<CurrentBet />} />
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>
  );
}
