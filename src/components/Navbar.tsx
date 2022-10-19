import React, { useState, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Product } from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

interface NavbarProps {
  categories: Array<string>;
  products: Array<Product>;
  searchByCategory(category: string): void;
  auth: boolean;
  username: string;
}

export default function Navbar({
  categories,
  products,
  searchByCategory,
  auth,
  username,
}: NavbarProps) {
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const [anchorProfile, setAnchorProfile] = useState<null | HTMLElement>(null);
  const [textFieldData, setTextFieldData] = useState("");
  const [isProductListOpen, setIsProductListOpen] = useState(true);
  // const [query, setQuery] = useState("");
  const openMenu = Boolean(anchorMenu);
  const titleMatches = useMediaQuery("(min-width:420px)");
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };
  const handleCloseProfile = () => {
    setAnchorProfile(null);
  };
  const handleProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorProfile(event.currentTarget);
  };
  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextFieldData(event.target.value);
  };
  const handleTextFieldOnClick = () => {
    setIsProductListOpen(true);
  };
  const handleTextFieldAwayClick = () => {
    setIsProductListOpen(false);
  };
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(textFieldData.toLowerCase())
    );
  }, [products, textFieldData]);
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        position="static"
        color="inherit"
        sx={{
          py: 1,
          borderRadius: 8,
          width: "99vw",
          position: "relative",
          left: -25,
        }}
      >
        <Toolbar>
          {!mediaBreakpoint && (
            <>
              <IconButton
                id="basic-button"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClickMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorMenu}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{ mt: 5 }}
              >
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  <Box onClick={() => searchByCategory("")}>
                    <MenuItem key={uuidv4()} onClick={handleCloseMenu}>
                      <Typography variant="h5" component="p">
                        All
                      </Typography>
                    </MenuItem>
                  </Box>
                </Link>
                {categories.map((el) => (
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Box onClick={() => searchByCategory(el)}>
                      <MenuItem key={uuidv4()} onClick={handleCloseMenu}>
                        <Typography variant="h5" component="p">
                          {el.charAt(0).toUpperCase() + el.slice(1)}
                        </Typography>
                      </MenuItem>
                    </Box>
                  </Link>
                ))}
              </Menu>{" "}
            </>
          )}
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "3%",
              marginRight: "auto",
            }}
          >
            <Typography
              variant={titleMatches ? "h2" : "h5"}
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: "Qwitcher Grypen",
                fontWeight: 700,
              }}
            >
              MyShop
            </Typography>
          </Link>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              mr: 12,
              position: mediaBreakpoint ? "relative" : "absolute",
              top: mediaBreakpoint ? 0 : 90,
              right: -20,
              width: "40%",
            }}
          >
            <ClickAwayListener onClickAway={handleTextFieldAwayClick}>
              <TextField
                id="input-with-sx"
                label="Search for product..."
                variant="standard"
                color="secondary"
                onChange={handleTextFieldChange}
                onClick={handleTextFieldOnClick}
                sx={{ width: "100%" }}
                autoComplete="off"
              />
            </ClickAwayListener>
            {textFieldData !== "" && isProductListOpen && (
              <Paper
                sx={{
                  width: "100%",
                  height: "200px",
                  position: "absolute",
                  zIndex: 2,
                  top: 70,
                  overflowY: "scroll",
                }}
              >
                {filteredProducts.map((el) => (
                  <Link
                    to={`/products/${el.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Box
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "hsla(177, 5%, 82%, .4)",
                        },
                        py: 2,
                      }}
                    >
                      <img
                        src={el.image}
                        alt="product"
                        style={{
                          width: "30px",
                          height: "auto",
                          marginInline: "10px",
                        }}
                      />
                      {el.title}
                    </Box>
                  </Link>
                ))}
              </Paper>
            )}
          </Box>

          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfile}
                color="inherit"
              >
                <AccountCircle />
                <Typography variant="body1" component="span">
                  {username}
                </Typography>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorProfile}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorProfile)}
                onClose={handleCloseProfile}
                sx={{ mt: 7 }}
              >
                <MenuItem onClick={handleCloseProfile}>Profile</MenuItem>
                <MenuItem onClick={handleCloseProfile}>My account</MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Link to={"/signin"} style={{ textDecoration: "none" }}>
                <Button sx={{ color: "#000", mr: 2 }}>Sign in</Button>
              </Link>
              <Link to={"/signup"} style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary">
                  Sign up
                </Button>{" "}
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
