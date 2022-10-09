import { useState, useRef, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import useMediaQuery from "@mui/material/useMediaQuery";

function SignIn() {
  const [buttonLoading, setButtonLoading] = useState(false)
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const userRef = useRef();

  // useEffect(() => {
  //   userRef?.current.focus();
  // }, [])
  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "4em",
        paddingTop: mediaBreakpoint ? "4em" : "8em"
      }}
    >
      <Card sx={{ width: "250px", p: "3em", boxSizing: "border-box" }}>
        <Typography variant="body1" component="p">
          Username:
        </Typography>
        <TextField id="standard-basic" variant="standard" color="secondary" />
        <Typography variant="body1" component="p" sx={{ mt: "2.5em" }}>
          Password:
        </Typography>
        <TextField id="standard-basic" variant="standard" color="secondary" />
        <LoadingButton loading={buttonLoading} loadingIndicator="Loading…" variant="contained" color="secondary" sx={{mt: "3em", ml: "auto", px: "2em"}} onClick={() => setButtonLoading(prev => !prev)}>
          Login
        </LoadingButton>
      </Card>
    </form>
  );
}

export default SignIn;
