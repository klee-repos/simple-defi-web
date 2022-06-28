// external
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
// internal
import { primary } from "../css/muiThemes";
import "../css/navbar.scss";
import { connectWeb3Wallet, getApprovedTokens } from "../utils/InitHelper";

const ObserveNetwork = observer(({ user }) => (
  <div className="nav-network-container">
    <span>{user.networkName}</span>
  </div>
));

async function handleLogin(user, cookies) {
  await connectWeb3Wallet(user, cookies);
  await getApprovedTokens(user);
}

const ObserveLogin = observer(({ user, cookies }) => (
  <>
    {user.walletAddress.length > 0 ? (
      <Button
        theme={primary}
        variant="contained"
        className="button"
        onClick={() => {
          user.setSettingsDialog(true);
        }}
      >
        {user.walletAddress.substring(0, 4)}...
        {user.walletAddress.substring(
          user.walletAddress.length - 4,
          user.walletAddress
        )}
      </Button>
    ) : (
      <Button
        theme={primary}
        variant="contained"
        className="button"
        onClick={() => {
          handleLogin(user, cookies);
        }}
      >
        Sign Up / Login
      </Button>
    )}
  </>
));

const Navbar = ({ user, cookies }) => {
  return (
    <div className="navbar-container">
      <div className="nav-left">
        <span className="logo-text">🚀 Simple DeFi</span>
      </div>
      <div className="nav-right">
        <ObserveNetwork user={user} />
        <ObserveLogin user={user} cookies={cookies} />
      </div>
    </div>
  );
};

export default Navbar;
