import { useState } from "react";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Paper from "@mui/material/Paper";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { ListItem, Typography } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import DeleteIcon from "./DeleteIcon";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

interface CartProps {
  quantityOfProducts: number;
  usersProducts: DocumentData;
  setProductAddedOrRemoved: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart = ({
  quantityOfProducts,
  usersProducts,
  setProductAddedOrRemoved,
}: CartProps) => {
  const [open, setOpen] = useState(false);

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ mr: 10 }} onClick={handleClick}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={quantityOfProducts} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        {open && (
          <Paper
            sx={{
              width: "18em",
              height: "18em",
              position: "absolute",
              mt: "1em",
              overflowY: "scroll",
              zIndex: "3",
              right: "8%",
            }}
          >
            {quantityOfProducts ? (
              usersProducts.products.map((product: DocumentData) => (
                <List>
                  <ListItem
                    sx={{
                      "&:hover": {
                        backgroundColor: "hsla(177, 5%, 82%, .4)",
                      },
                      p: "1em",
                      overflowWrap: "break-word",
                      display: "flex",
                      
                    }}
                    key={uuidv4()}
                  >
                    <Link
                      to={`/products/${product.id}`}
                      style={{
                        color: "black",
                      }}
                    >
                      <img
                        src={product.img}
                        alt="Product image"
                        style={{ width: "3em", height: "3em" }}
                      />
                    </Link>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        ml: "auto",
                        alignItems: "flex-end",
                      }}
                    >
                      <Link
                        to={`/products/${product.id}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          width: "100%",
                        }}
                      >
                        <Typography
                          variant="body1"
                          component="p"
                          sx={{ ml: "auto" }}
                        >
                          {product.name.split(" ").splice(0, 3).join(" ")}...
                        </Typography>
                      </Link>

                      <Box sx={{ display: "flex", gap: "1em" }}>
                        <Typography
                          variant="body2"
                          component="p"
                          sx={{ ml: "auto" }}
                        >
                          x {product.quantity}
                        </Typography>
                        <DeleteIcon
                          usersProducts={usersProducts}
                          id={product.id}
                          setProductAddedOrRemoved={setProductAddedOrRemoved}
                        />
                      </Box>
                    </Box>
                  </ListItem>
                </List>
              ))
            ) : (
              <Typography
                variant="body1"
                component="p"
                sx={{
                  color: "gray",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  whiteSpace: "nowrap",
                }}
              >
                No items added to basket
              </Typography>
            )}

            {quantityOfProducts !== 0 && <Link
              to="/purchases"
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "1.2em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "pink",
                height: "2em",
                position: "sticky",
                bottom: 0
              }}
            >
              Go to summary <ArrowForwardIcon />
            </Link>}
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default Cart;
