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

const UpdateProfile = () => {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordConfirmRef = useRef<HTMLInputElement>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordRef?.current?.value !== passwordConfirmRef?.current?.value) {
      return setError("Passwords don't match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef?.current?.value !== currentUser.email) {
      promises.push(updateEmail(emailRef?.current?.value));
    }
    if (passwordRef?.current?.value) {
      promises.push(updatePassword(passwordRef?.current?.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update an account");
      })
      .finally(() => {
        setLoading(false);
      });
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
          Update Profile
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
          defaultValue={currentUser.email}
        />
        <Typography variant="body1" component="p" sx={{ mt: "2.5em" }}>
          Password:
        </Typography>
        <TextField
          id="standard-basic"
          type="password"
          variant="standard"
          color="secondary"
          inputRef={passwordRef}
          sx={{ width: "85%" }}
          placeholder="If you do not want to change password, leave it blank"
        />
        <Typography variant="body1" component="p" sx={{ mt: "2.5em" }}>
          Password confirmation:
        </Typography>
        <TextField
          id="standard-basic"
          type="password"
          variant="standard"
          color="secondary"
          inputRef={passwordConfirmRef}
          sx={{ width: "85%" }}
          placeholder="If you do not want to change password, leave it blank"
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: "3em", px: "4em", py: "1em", display: "block", mx: "auto" }}
          disabled={loading}
        >
          Update
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: "1.5em" }}>
            {error}
          </Alert>
        )}

        <Link
          to={"/"}
          style={{ marginTop: "2em", display: "block", textAlign: "center" }}
        >
          Cancel
        </Link>
      </Box>
    </Box>
  );
};

export default UpdateProfile;
