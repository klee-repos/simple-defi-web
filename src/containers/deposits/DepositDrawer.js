// external
import { observer } from "mobx-react-lite";
import { ethers } from "ethers";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import _ from "lodash";
// internal
import { primary } from "../../css/muiThemes";
import "../../css/depositDialog.scss";
import { getApprovedTokens } from "../../utils/InitHelper";
import { erc20ABI } from "../../abis/ERC20ABI";

const { REACT_APP_LENDING_ADDRESS } = process.env;

async function handleDeposit(user, token) {
  try {
    let signer = user.provider.getSigner();
    let erc20 = new ethers.Contract(token.address, erc20ABI, signer);
    let allowTransferTx = await await erc20.approve(
      REACT_APP_LENDING_ADDRESS,
      ethers.utils.parseUnits(
        user.depositAmountInput.toString(),
        token.decimals
      )
    );
    let allowTransferTxReceipt = await allowTransferTx.wait();
    console.log(allowTransferTxReceipt);
    let tx = await user.lendingContract.deposit(
      token.address,
      ethers.utils.parseUnits(
        user.depositAmountInput.toString(),
        token.decimals
      )
    );
    let txReceipt = await tx.wait();
    console.log(txReceipt);
    await handleCloseDepositDrawer(user, token);
    await user.setDepositSuccessSnackbar(true);
    await getApprovedTokens(user);
  } catch (e) {
    console.log(e);
    user.setErrorSnackbar(true);
  }
}

async function handleCloseDepositDrawer(user, token) {
  try {
    let tokenDrawers = _.cloneDeep(user.tokenDrawers);
    tokenDrawers[token.symbol].depositDrawer = false;
    await user.setTokenDrawers(tokenDrawers);
  } catch (e) {
    console.log(e);
    user.setErrorSnackbar(true);
  }
}

const ObserverDepositDrawer = observer(({ user, token }) => (
  <Drawer
    anchor="bottom"
    onClose={() => {
      handleCloseDepositDrawer(user, token);
    }}
    open={
      user.tokenDrawers[token.symbol]
        ? user.tokenDrawers[token.symbol].depositDrawer
        : false
    }
  >
    <div className="drawer-container">
      <div className="drawer-card-container">
        <div className="deposit-dialog-title-container margin-bottom">
          <span className="dialog-header">Deposit {token.symbol}</span>
        </div>
        <div className="deposit-content-row margin-bottom">
          <div className="wallet-balance-container bg-grey">
            <div className="deposit-content">
              <span className="dialog-subheader">Wallet balance</span>
              <span>
                {token.walletBalance} {token.symbol}
              </span>
            </div>
          </div>
        </div>
        <div className="deposit-dialog-content-container">
          <div className="deposit-content-row margin-bottom">
            <div className="deposit-content-container">
              <TextField
                label="Deposit amount"
                type="number"
                variant="outlined"
                onChange={(e) => {
                  user.setDepositAmountInput(e.target.value);
                }}
                value={user.depositAmountInput}
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
              <Button
                variant="outlined"
                theme={primary}
                color="secondary"
                onClick={() => {
                  handleCloseDepositDrawer(user, token);
                }}
              >
                Cancel
              </Button>
            </div>
            <div className="deposit-button-container button-margin-left">
              <Button
                variant="contained"
                theme={primary}
                color="secondary"
                onClick={() => {
                  handleDeposit(user, token);
                }}
              >
                Deposit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Drawer>
));

const DepositDrawer = ({ user, token }) => {
  return <ObserverDepositDrawer user={user} token={token} />;
};

export default DepositDrawer;
