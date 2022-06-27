// external
import { observer } from "mobx-react-lite";
// internal
import TVLChart from "./TVLChart";

const ObserveTokenName = observer(({ user }) => <span>{user.erc20Name}</span>);

const ObserveTokenSymbol = observer(({ user }) => (
  <span>{user.erc20Symbol}</span>
));

const TokenCard = ({ user }) => {
  return (
    <div className="card">
      <div className="stats-row-container">
        <div className="stats-container stats-left">
          <div className="stats-row-container two-row">
            <div className="stats-container two-column">
              <span className="subheader">Token</span>
              <ObserveTokenName user={user} />
            </div>
            <div className="stats-container two-column">
              <span className="subheader">Symbol</span>
              <ObserveTokenSymbol user={user} />
            </div>
          </div>
          <div className="stats-row-container two-row">
            <div className="stats-container two-column">
              <span className="subheader">Total TVL ($USD)</span>
              <span>$0</span>
            </div>
          </div>
        </div>
        <div className="stats-container stats-right">
          <div className="chart-container">
            <TVLChart user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
