// external
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
// internal
import TVLChart from "./TVLChart";
import { primary } from "../css/muiThemes";
import DepositDialog from "./DepositDialog";

const ObserveTokenName = observer(({ token }) => <span>{token.name}</span>);

const ObserveTokenSymbol = observer(({ token }) => <span>{token.symbol}</span>);

const ObserveTokenTVL = observer(({ token }) => (
  <span>
    {token.depositTotal > 0 ? token.depositTotal : 0} {token.symbol}
  </span>
));

async function handleDeposit(user) {
  await user.setDepositDialog(true);
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
              <ObserveTokenTVL token={token} />
            </div>
          </div>
          <div className="stats-row-container">
            <div className="stats-container two-column">
              <Button
                variant="contained"
                sx={{ width: "90%" }}
                theme={primary}
                onClick={() => {
                  handleDeposit(user);
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
      <DepositDialog user={user} token={token} />
    </div>
  );
};

export default TokenCard;
