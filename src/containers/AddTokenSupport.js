// external
import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
// internal
import { primary } from "../css/muiThemes";

async function handleAddTokenSupport(user) {
  try {
    let testTx = await user.lendingContract.owner();
    console.log(testTx);

    let tx = await user.lendingContract.setAllowedToken(
      user.erc20Address,
      user.priceFeedAddress
    );
    let txReceipt = await tx.wait();
    console.log(txReceipt);
    user.addTokenSuccessSnackbar(true);
  } catch (e) {
    console.log(e);
    user.setErrorSnackbar(true);
  }
}

const ObserveTokenAddressInput = observer(({ user }) => (
  <ThemeProvider theme={primary}>
    <TextField
      id="erc20-address-input"
      label="ERC20 address"
      variant="filled"
      size="small"
      sx={{ width: "95%" }}
      onChange={(e) => {
        user.setERC20Address(e.target.value);
      }}
      value={user.erc20Address}
    >
      Token address
    </TextField>
  </ThemeProvider>
));

const ObserverPriceFeedInput = observer(({ user }) => (
  <ThemeProvider theme={primary}>
    <TextField
      id="price-feed-input"
      label="Price feed address"
      variant="filled"
      size="small"
      sx={{ width: "95%" }}
      onChange={(e) => {
        user.setPriceFeedAddress(e.target.value);
      }}
      value={user.priceFeedAddress}
    >
      Price feed address
    </TextField>
  </ThemeProvider>
));

const AddTokenSupport = ({ user }) => {
  return (
    <div className="card bg-admin margin-bottom">
      <div className="stats-row-container">
        <h1>Add token support</h1>
      </div>
      <div className="stats-row-container">
        <div className="input-container column-3-more">
          <ObserveTokenAddressInput user={user} />
        </div>
        <div className="input-container column-3-more">
          <ObserverPriceFeedInput user={user} />
        </div>
        <div className="column-3-less">
          <Button
            variant="contained"
            theme={primary}
            fullWidth
            color="secondary"
            onClick={() => {
              handleAddTokenSupport(user);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTokenSupport;
