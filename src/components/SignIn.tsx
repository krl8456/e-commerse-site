import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { User } from "../interfaces";

interface SignInProps {
  username: string;
  password: string;
  setUsername(u: string): void;
  setPassword(p: string): void;
  setAuth(b: boolean): void;
}

function SignIn({
  username,
  password,
  setUsername,
  setPassword,
  setAuth,
}: SignInProps) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<Array<User>>(
    JSON.parse(localStorage.getItem("users") || "[]") || []
  );
  const userRef = useRef<HTMLInputElement>(null);
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");

  console.log(success);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setSubmitButtonClicked(true);
    searchUser()
    ? setMessage("")
    : setMessage("You entered wrong password or username");
    userRef?.current?.focus();
    success ? setAuth(true) : setAuth(false);
  };
  const searchUser = () => {
    for (let el of users) {
      if (username === el.username && password === el.password) {
        setSuccess(true);
        return true;
      }
    }
    return false;
  };

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
        onSubmit={handleSubmit}
      >
        <Typography variant="body1" component="p">
          Username:
        </Typography>
        <TextField
          id="standard-basic"
          variant="standard"
          color="secondary"
          inputRef={userRef}
          autoComplete="off"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <Typography variant="body1" component="p" sx={{ mt: "2.5em" }}>
          Password:
        </Typography>
        <TextField
          id="standard-basic"
          type="password"
          variant="standard"
          color="secondary"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: "3em", ml: "auto", px: "2em" }}
        >
          Login
        </Button>

        {submitButtonClicked && (
          <Typography
            variant="body2"
            component="p"
            sx={{ color: "red", mt: "1em" }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default SignIn;
