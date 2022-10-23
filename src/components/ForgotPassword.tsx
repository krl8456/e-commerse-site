import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const emailRef = useRef<HTMLInputElement>();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef?.current?.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };
  return (
    <Box
      sx={{
        paddingBottom: "4em",
        paddingTop: mediaBreakpoint ? "4em" : "8em",
        px: "1em",
      }}
    >
      <Box
        component="form"
        sx={{
          maxWidth: "600px",
          p: "3em",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
          mx: "auto",
        }}
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: "1em", textAlign: "center" }}
        >
          Password Reset
        </Typography>
        <Typography variant="body1" component="p">
          Email:
        </Typography>
        <TextField
          id="standard-basic"
          type="email"
          variant="standard"
          color="secondary"
          autoComplete="off"
          autoFocus
          inputRef={emailRef}
          sx={{ width: "85%" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: "3em", px: "4em", py: "1em", display: "block", mx: "auto" }}
          disabled={loading}
        >
          Reset Password
        </Button>
        {message && (
          <Alert severity="success" sx={{ mt: "1.5em" }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: "1.5em" }}>
            {error}
          </Alert>
        )}
        <Typography
          variant="body1"
          component="p"
          sx={{ mt: "2em", textAlign: "center" }}
        >
          <Link to={"/signin"}>Login</Link>
        </Typography>
      </Box>
      <Typography
        variant="body1"
        component="p"
        sx={{ mt: "2em", textAlign: "center" }}
      >
        Don't have an account? <Link to={"/signup"}>Sign up</Link>
      </Typography>
    </Box>
  );
};

export default ForgotPassword;
