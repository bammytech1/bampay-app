import { BrowserRouter as Routes, Route } from "react-router-dom";
import StartTrade from "./StartTrade";
import GetVerified from "./GetVerified";
import GiftCodeDetails from "./GiftCodeDetails";

const Stepper = () => {
  <Routes>
    <Route exact path="/startTrade" component={<StartTrade />} />
    <Route path="/getVerified" component={<GetVerified />} />
    <Route path="/giftCardCode" component={<GiftCodeDetails />} />
  </Routes>;
};

export default Stepper;
