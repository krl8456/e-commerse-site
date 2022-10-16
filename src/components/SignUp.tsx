import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";


function SignUp() {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "4em",
        paddingTop: mediaBreakpoint ? "4em" : "8em",
      }}
    >
      
      <Box
        component="form"
        sx={{
          width: "250px",
          p: "3em",
          boxSizing: "border-box",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
        }}
      >
        <Typography variant="h4" component="h2" sx={{mb: "1em"}}>Sign up</Typography>
        <Typography variant="body1" component="p">
          Username:
        </Typography>
        <TextField
          id="standard-basic"
          variant="standard"
          color="secondary"
          autoComplete="off"
          autoFocus
        />
        <Typography variant="body1" component="p" sx={{ mt: "2.5em" }}>
          Password:
        </Typography>
        <TextField
          id="standard-basic"
          type="password"
          variant="standard"
          color="secondary"
  
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: "3em", ml: "auto", px: "2em" }}
        >
          Login
        </Button>
      </Box>
    </Box>
  )
}

export default SignUp