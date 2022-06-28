// external
import { observer } from "mobx-react-lite";
import { ethers } from "ethers";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
// internal
import { primary } from "../css/muiThemes";
import { useEffect } from "react";
import "../css/depositDialog.scss";
import { getApprovedTokens } from "../utils/InitHelper";
import { erc20ABI } from "../abis/ERC20ABI";

const { REACT_APP_LENDING_ADDRESS } = process.env;

async function handleDeposit(user, token) {
  let signer = user.provider.getSigner();
  let erc20 = new ethers.Contract(token.address, erc20ABI, signer);
  let allowTransferTx = await await erc20.approve(
    REACT_APP_LENDING_ADDRESS,
    ethers.utils.parseUnits(user.depositAmountInput.toString(), token.decimals)
  );
  let allowTransferTxReceipt = await allowTransferTx.wait();
  console.log(allowTransferTxReceipt);
  let tx = await user.lendingContract.deposit(
    token.address,
    ethers.utils.parseUnits(user.depositAmountInput.toString(), token.decimals)
  );
  let txReceipt = await tx.wait();
  console.log(txReceipt);
  await user.setDepositDialog(false);
  await user.setDepositSuccessSnackbar(true);
  await getApprovedTokens(user);
}

const ObserverDepositDialog = observer(({ user, token }) => (
  <Dialog
    onClose={() => {
      user.setDepositDialog(false);
    }}
    open={user.depositDialog}
  >
    <DialogTitle>
      <div className="deposit-dialog-title-container">
        <span className="dialog-header">Deposit {token.symbol}</span>
      </div>
    </DialogTitle>
    <DialogContent>
      <div className="deposit-dialog-content-container">
        <div className="deposit-content-row margin-bottom">
          <div className="deposit-content-container margin-right two-column">
            <TextField
              label="Deposit"
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
            />
          </div>
          <div className="deposit-content-container two-column">
            <div className="deposit-content">
              <span className="dialog-subheader">Wallet Balance</span>
              <span>
                {token.walletBalance} {token.symbol}
              </span>
            </div>
          </div>
        </div>
        <div className="deposit-content-row">
          <div className="deposit-content-container margin-right">
            <Button variant="outlined" theme={primary} color="secondary">
              Cancel
            </Button>
          </div>
          <div className="deposit-content-container">
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
    </DialogContent>
  </Dialog>
));

const DepositDialog = ({ user, token }) => {
  useEffect(() => {}, []);

  return <ObserverDepositDialog user={user} token={token} />;
};

export default DepositDialog;
