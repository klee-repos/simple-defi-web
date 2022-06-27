// external
import { observer } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";
// internal
import "../css/lending.scss";
import { primary } from "../css/muiThemes";
import Navbar from "./Navbar";
import SettingsDialog from "./SettingsDialog";
import { connectWeb3Wallet } from "../utils/Auth";
import TokenCard from "./TokenCard";
import AddTokenSupport from "./AddTokenSupport";
import {
  ObserveAddTokenSuccessSnackbar,
  ObserveErrorSnackbar,
} from "./Snackbars";

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
          <div className="card-container">
            <AddTokenSupport user={user} />
            <TokenCard user={user} />
          </div>
        </div>
        <SettingsDialog user={user} cookies={cookies} />
        <ObserveAddTokenSuccessSnackbar user={user} />
        <ObserveErrorSnackbar user={user} />
      </>
    );
  } else {
    return (
      <div className="loading-container">
        <CircularProgress theme={primary} />
      </div>
    );
  }
}

const ObeserverIntiailLoad = observer(({ user, cookies }) => (
  <>{initialLoad(user, cookies)}</>
));

const Deposits = ({ user, cookies }) => {
  return (
    <div className="main">
      <ObeserverIntiailLoad user={user} cookies={cookies} />
    </div>
  );
};

export default Deposits;
