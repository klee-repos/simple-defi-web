// external
import { observer } from "mobx-react-lite";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
// internal
import "../css/settingsDialog.scss";
import { primary } from "../css/muiThemes";
import { logout } from "../utils/Auth";

const ObserverSettingsDialog = observer(({ user, cookies }) => (
  <Dialog
    onClose={() => {
      user.setSettingsDialog(false);
    }}
    open={user.settingsDialog}
  >
    <DialogTitle>
      <div className="settings-dialog-title-container">
        <span className="dialog-header">⚙️ Settings</span>
      </div>
    </DialogTitle>
    <DialogContent>
      <div className="settings-dialog-content-container">
        <Button
          theme={primary}
          color="secondary"
          onClick={() => {
            logout(user, cookies);
          }}
        >
          <LogoutIcon />
          <span className="settings-button-text">Logout</span>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
));

const SettingsDialog = ({ user, cookies }) => {
  return <ObserverSettingsDialog user={user} cookies={cookies} />;
};

export default SettingsDialog;
