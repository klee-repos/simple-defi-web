import { observer } from "mobx-react-lite";

import Navbar from "./Navbar";
import "../css/lending.scss";
import SettingsDialog from "./SettingsDialog";
import { connectWeb3Wallet } from "../utils/Auth";

function initialLoad(user, cookies) {
  if (user.initialLoad === false) {
    let hasConnected = cookies.get("connected");
    if (hasConnected === "true") {
      connectWeb3Wallet(user, cookies);
    } else {
      user.setInitialLoad(true);
    }
  }
  if (user.initialLoad) {
    return (
      <>
        <Navbar user={user} cookies={cookies} />
        <div className="content-container">
          <div className="profile-card-container">
            <div className="profile-card">
              <span>Token: {user.erc20Name}</span>
              <span>Total Supply: {user.erc20TotalSupply}</span>
            </div>
          </div>
        </div>
        <SettingsDialog user={user} cookies={cookies} />
      </>
    );
  } else {
    return <div className="loading-container">Loading...</div>;
  }
}

const ObeserverIntiailLoad = observer(({ user, cookies }) => (
  <>{initialLoad(user, cookies)}</>
));

const Lending = ({ user, cookies }) => {
  return (
    <div className="main">
      <ObeserverIntiailLoad user={user} cookies={cookies} />
    </div>
  );
};

export default Lending;
