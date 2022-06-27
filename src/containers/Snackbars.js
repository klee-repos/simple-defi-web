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
    message="👍 token successfully added"
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
    message="😵 an error has occurred"
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  />
));
