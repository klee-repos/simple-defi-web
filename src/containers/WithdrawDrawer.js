// external
import { observer } from "mobx-react-lite";
import { ethers } from "ethers";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import _ from "lodash";
// internal
import { primary } from "../css/muiThemes";
import { useEffect } from "react";
import "../css/depositDialog.scss";
import { getApprovedTokens } from "../utils/InitHelper";

async function handleWithdraw(user, token) {
  let tx = await user.lendingContract.withdraw(
    token.address,
    ethers.utils.parseUnits(user.withdrawAmountInput.toString(), token.decimals)
  );
  let txReceipt = await tx.wait();
  console.log(txReceipt);
  await handleCloseWithdrawDrawer(user, token);
  await user.setWithdrawSuccessSnackbar(true);
  await getApprovedTokens(user);
}

async function handleCloseWithdrawDrawer(user, token) {
  try {
    let tokenDrawers = _.cloneDeep(user.tokenDrawers);
    tokenDrawers[token.symbol].withdrawDrawer = false;
    await user.setTokenDrawers(tokenDrawers);
  } catch (e) {
    console.log(e);
    user.setErrorSnackbar(true);
  }
}

const ObserverWithdrawDrawer = observer(({ user, token }) => (
  <Drawer
    anchor="bottom"
    onClose={() => {
      handleCloseWithdrawDrawer(user, token);
    }}
    open={
      user.tokenDrawers[token.symbol]
        ? user.tokenDrawers[token.symbol].withdrawDrawer
        : false
    }
  >
    <div className="drawer-container ">
      <div className="drawer-card-container">
        <div className="deposit-dialog-title-container margin-bottom">
          <span className="dialog-header">Withdraw {token.symbol}</span>
        </div>
        <div className="deposit-content-row margin-bottom">
          <div className="wallet-balance-container bg-grey">
            <div className="deposit-content">
              <span className="dialog-subheader">Deposit balance</span>
              <span>
                {token.depositBalance} {token.symbol}
              </span>
            </div>
          </div>
        </div>
        <div className="deposit-dialog-content-container">
          <div className="deposit-content-row margin-bottom">
            <div className="deposit-content-container">
              <TextField
                label="Withdraw amount"
                type="number"
                variant="outlined"
                onChange={(e) => {
                  user.setWithdrawAmountInput(e.target.value);
                }}
                value={user.withdrawAmountInput}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {token.symbol}
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </div>
          </div>

          <div className="deposit-content-button-row">
            <div className="deposit-button-container button-margin-right">
              <Button variant="outlined" theme={primary} color="secondary">
                Cancel
              </Button>
            </div>
            <div className="deposit-button-container button-margin-left">
              <Button
                variant="contained"
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
      </div>
    </div>
  </Drawer>
));

const WithdrawDrawer = ({ user, token }) => {
  return <ObserverWithdrawDrawer user={user} token={token} />;
};

export default WithdrawDrawer;
