// external
import { observer } from "mobx-react-lite";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 as uuidv4 } from "uuid";
// internal
import "../css/lending.scss";
import { primary } from "../css/muiThemes";
import Navbar from "./Navbar";
import SettingsDialog from "./SettingsDialog";
import { connectWeb3Wallet, getApprovedTokens } from "../utils/InitHelper";
import TokenCard from "./TokenCard";
import AddTokenSupport from "./AddTokenSupport";
import {
  ObserveAddTokenSuccessSnackbar,
  ObserveErrorSnackbar,
  ObserveDepositSuccessSnackbar,
} from "./Snackbars";

function initialLoad(user, cookies, db) {
  if (user.initialLoad === false) {
    let hasConnected = cookies.get("connected");
    if (hasConnected === "false") {
      user.setInitialLoad(true);
    }
    if (hasConnected === "true" && user.connectToWallet === false) {
      connectWeb3Wallet(user, cookies);
    }
    if (user.connectToWallet === true) {
      getApprovedTokens(user);
    }
  }
  if (user.initialLoad) {
    return (
      <>
        <Navbar user={user} cookies={cookies} />
        <div className="content-container">
          {user.walletAddress.length > 0 ? (
            <div className="card-container">
              {user.isContractOwner ? <AddTokenSupport user={user} /> : <></>}
              {user.approvedTokens.length > 0 ? (
                <>
                  {user.approvedTokens.map((token) => {
                    return (
                      <TokenCard user={user} token={token} key={uuidv4()} />
                    );
                  })}
                </>
              ) : (
                <div className="card">No approved tokens</div>
              )}
            </div>
          ) : (
            <div className="card-container">
              <div className="card">Welcome. Login to continue.</div>
            </div>
          )}
        </div>
        <SettingsDialog user={user} cookies={cookies} />
        <ObserveAddTokenSuccessSnackbar user={user} />
        <ObserveDepositSuccessSnackbar user={user} />
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

const ObeserverIntiailLoad = observer(({ user, cookies, db }) => (
  <>{initialLoad(user, cookies, db)}</>
));

const Deposits = ({ user, cookies, db }) => {
  return (
    <div className="main">
      <ObeserverIntiailLoad user={user} cookies={cookies} db={db} />
    </div>
  );
};

export default Deposits;
