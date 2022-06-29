// external
import { observer } from "mobx-react-lite";
import Snackbar from "@mui/material/Snackbar";

export const ObserveAddTokenSuccessSnackbar = observer(({ user }) => (
  <Snackbar
    open={user.addTokenSuccessSnackbar}
    autoHideDuration={4000}
    onClose={() => {
      user.setAddTokenSuccessSnackbar(false);
    }}
    message="👍 Token successfully added"
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  />
));

export const ObserveErrorSnackbar = observer(({ user }) => (
  <Snackbar
    open={user.errorSnackbar}
    autoHideDuration={4000}
    onClose={() => {
      user.setErrorSnackbar(false);
    }}
    message="😵 An error has occurred"
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  />
));

export const ObserveDepositSuccessSnackbar = observer(({ user }) => (
  <Snackbar
    open={user.depositSuccessSnackbar}
    autoHideDuration={4000}
    onClose={() => {
      user.setDepositSuccessSnackbar(false);
    }}
    message="🎉 Deposit complete!"
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  />
));

export const ObserveWithdrawSuccessSnackbar = observer(({ user }) => (
  <Snackbar
    open={user.withdrawSuccessSnackbar}
    autoHideDuration={4000}
    onClose={() => {
      user.setWithdrawSuccessSnackbar(false);
    }}
    message="🎉 Withdraw complete!"
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  />
));
