import { Button, List, ListItem, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

interface PurchasesProps {
  usersProducts: DocumentData;
  setProductAddedOrRemoved: React.Dispatch<React.SetStateAction<boolean>>;
}

const Purchases = ({
  usersProducts,
  setProductAddedOrRemoved,
}: PurchasesProps) => {
  const { currentUser } = useAuth();
  const [sum, setSum] = useState(0);
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    setSum(
      usersProducts.products.reduce((total: number, product: DocumentData) => {
        return total + product.price * product.quantity;
      }, 0)
    );
  }, [usersProducts.products]);

  const handleDeleteElement = async (id: string) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        products: usersProducts.products.filter(
          (el: DocumentData) => el.id !== id
        ),
      });
      setProductAddedOrRemoved((prev) => !prev);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  return (
    <Container
      sx={{ display: "Grid", placeItems: "center", minHeight: "80vh" }}
    >
      <Paper
        elevation={6}
        sx={{
          p: mediaBreakpoint ? "3em" : "1em",
          minWidth: "50%",
          minHeight: "50%",
          mt: mediaBreakpoint ? "4em" : "9em",
        }}
      >
        <Typography variant="h5" component="p" sx={{ mb: "1em" }}>
          Your products:
        </Typography>
        {usersProducts.products.length ? (
          <List sx={{ maxHeight: "28em", overflowY: "scroll" }}>
            {usersProducts.products.map((product: DocumentData) => (
              <ListItem key={uuidv4()}>
                <Paper
                  sx={{
                    p: "1em",
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gridTemplateRows: "repeat(18, 6px)",
                    height: "auto",
                  }}
                  key={uuidv4()}
                  elevation={3}
                >
                  <Link
                    to={`/products/${product.id}`}
                    style={{
                      color: "black",
                      gridColumn: mediaBreakpoint ? "1/2" : "1/4",
                      gridRow: "1/-1",  
                    }}
                  >
                    <Box sx={{width: "100%", height: "100%"}}>
                      <img
                        src={product.img}
                        alt="Product"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                  </Link>

                  <Link
                    to={`/products/${product.id}`}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      gridColumn: mediaBreakpoint ? "3/11" : "5/-1",
                      gridRow: "1/2",
                    }}
                  >
                    <Typography variant="body1" component="span" sx={{fontSize: "clamp(.7em, 2.5vw, 1em)"}}>
                      {mediaBreakpoint ? product.name : product.name.split(" ").splice(0, 5).join(" ")+"..."}
                    </Typography>
                  </Link>
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      gridColumn: mediaBreakpoint ? "3/6" : "5/8",
                      gridRow: mediaBreakpoint ? "10/11" : "10/11",
                      fontSize: "clamp(.7em, 2.5vw, 1em)"
                    }}
                  >
                    quantity: {product.quantity}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{
                      gridColumn: mediaBreakpoint ? "5/9" : "7/-1",
                      gridRow: "10/11",
                      fontSize: "clamp(.7em, 2.5vw, 1em)"
                    }}
                  >
                    {product.price}$ x {product.quantity}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteElement(product.id)}
                    sx={{
                      gridColumn: mediaBreakpoint ? "10/11" : "5/6",
                      gridRow: mediaBreakpoint ? "11/15" : "15/-1",
                    }}
                  >
                    Remove
                  </Button>
                </Paper>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" component="p" sx={{ color: "gray" }}>
            No products
          </Typography>
        )}
        {usersProducts.products.length !== 0 && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "2em" }}>
            <Typography variant="h5" component="span">
              Summary: {sum.toFixed(2)} $
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Purchases;
