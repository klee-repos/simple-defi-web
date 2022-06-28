// external
import { observer } from "mobx-react-lite";
// internal
import TVLChart from "./TVLChart";

const ObserveTokenName = observer(({ token }) => <span>{token.name}</span>);

const ObserveTokenSymbol = observer(({ token }) => <span>{token.symbol}</span>);

const TokenCard = ({ user, token }) => {
  return (
    <div className="card margin-bottom">
      <div className="stats-row-container">
        <div className="stats-container stats-left">
          <div className="stats-row-container two-row">
            <div className="stats-container two-column">
              <span className="subheader">Token</span>
              <ObserveTokenName token={token} />
            </div>
            <div className="stats-container two-column">
              <span className="subheader">Symbol</span>
              <ObserveTokenSymbol token={token} />
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
