// external
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import _ from "lodash";
// internal
import TVLChart from "./TVLChart";
import { primary } from "../css/muiThemes";
import DepositDrawer from "./DepositDrawer";
import WithdrawDrawer from "./WithdrawDrawer";

const ObserveTokenName = observer(({ token }) => <span>{token.name}</span>);

const ObserveTokenSymbol = observer(({ token }) => <span>{token.symbol}</span>);

const ObserveTokenTL = observer(({ token }) => (
  <span>
    {token.depositTotal > 0 ? token.depositTotal : 0} {token.symbol}
  </span>
));

const ObserveDepositBalance = observer(({ token }) => (
  <span>
    {token.depositBalance > 0 ? token.depositBalance : 0} {token.symbol}
  </span>
));

async function handleDeposit(user, token) {
  let tokenDrawers = _.cloneDeep(user.tokenDrawers);
  tokenDrawers[token.symbol].depositDrawer = true;
  await user.setTokenDrawers(tokenDrawers);
}

async function handleWithdraw(user, token) {
  let tokenDrawers = _.cloneDeep(user.tokenDrawers);
  tokenDrawers[token.symbol].withdrawDrawer = true;
  await user.setTokenDrawers(tokenDrawers);
}

const TokenCard = ({ user, token }) => {
  return (
    <div className="card margin-bottom">
      <div className="stats-row-container">
        <div className="stats-container stats-left">
          <div className="stats-row-container margin-bottom">
            <div className="stats-container two-column">
              <span className="subheader">Token</span>
              <ObserveTokenName token={token} />
            </div>
            <div className="stats-container two-column">
              <span className="subheader">Symbol</span>
              <ObserveTokenSymbol token={token} />
            </div>
          </div>
          <div className="stats-row-container margin-bottom">
            <div className="stats-container two-column">
              <span className="subheader">Total deposits</span>
              <ObserveTokenTL token={token} />
            </div>
            <div className="stats-container two-column">
              <span className="subheader">Your deposits</span>
              <ObserveDepositBalance token={token} />
            </div>
          </div>
          <div className="stats-row-container">
            <div className="stats-container two-column">
              <Button
                variant="contained"
                sx={{ width: "90%" }}
                theme={primary}
                onClick={() => {
                  handleDeposit(user, token);
                }}
              >
                Deposit
              </Button>
            </div>
            <div className="stats-container two-column">
              <Button
                variant="contained"
                sx={{ width: "90%" }}
                theme={primary}
                color="secondary"
                onClick={() => {
                  handleWithdraw(user, token);
                }}
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>
        <div className="stats-container stats-right">
          <div className="chart-container">
            <TVLChart user={user} />
          </div>
        </div>
      </div>
      <DepositDrawer user={user} token={token} />
      <WithdrawDrawer user={user} token={token} />
    </div>
  );
};

export default TokenCard;
