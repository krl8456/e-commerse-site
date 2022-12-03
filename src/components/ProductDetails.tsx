import { Product } from "../interfaces";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import useMediaQuery from "@mui/material/useMediaQuery";
import RelatedProduct from "./RelatedProduct";
import {
  doc,
  setDoc,
  arrayUnion,
  updateDoc,
  arrayRemove
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface ProductDetailsProps {
  product: Product;
  products: Array<Product>;
  usersProducts: any;
  setProductAddedOrRemoved: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProductDetails = ({
  product,
  products,
  usersProducts,
  setProductAddedOrRemoved,
}: ProductDetailsProps) => {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const relatedProducts = products
    .filter((el) => el.category === product.category && el.id !== product.id)
    .map((el) => <RelatedProduct product={el} key={uuidv4()} />);

  const handleAdd = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    
    const fieldToReplace = usersProducts.products ? usersProducts.products.find((el: any) => el.id === product.id) : false;
    if (JSON.stringify(usersProducts) === JSON.stringify({})) {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        await setDoc(userRef, {
          products: [
            {
              id: product.id,
              name: product.title,
              img: product.image,
              // timestamp: serverTimestamp(),
              quantity: 1,
            },
          ],
        });
        // console.log(usersProducts);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else if (fieldToReplace) {
      const quantityOfElement = fieldToReplace.quantity;
      try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
          products: arrayRemove({
            id: product.id,
            name: product.title,
            img: product.image,
            // timestamp: serverTimestamp(),
            quantity: quantityOfElement,
          }),
        });
      } catch (e) {
        console.error("Error updating document: ", e);
      }

      try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
          products: arrayUnion({
            id: product.id,
            name: product.title,
            img: product.image,
            // timestamp: serverTimestamp(),
            quantity: quantityOfElement + 1,
          }),
        });
        
      } catch (e) {
        console.error("Error updating document: ", e);
      }
      // setProductAdded((prev) => !prev);
      
    } else {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
          products: arrayUnion({
            id: product.id,
            name: product.title,
            img: product.image,
            // timestamp: serverTimestamp(),
            quantity: 1,
          }),
        });
        // setProductAdded((prev) => !prev);
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    }
    setProductAddedOrRemoved((prev) => !prev);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: mediaBreakpoint ? "row" : "column",
          alignItems: "center",
          p: mediaBreakpoint ? 4 : 0,
        }}
      >
        <img
          src={product.image}
          alt="Product"
          style={{
            width: mediaBreakpoint ? "20em" : "60%",
            height: "auto",
            marginLeft: mediaBreakpoint ? "5em" : 0,
            marginTop: mediaBreakpoint ? "2em" : "10em",
          }}
        />
        <Stack sx={{ p: 12 }} spacing={4}>
          <Typography variant="h4" component="h2">
            {product.title}
          </Typography>
          <Typography variant="body1" component="div">
            {product.description}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6" component="div">
              {product.price} $
            </Typography>
            <Box sx={{ display: "flex", ml: "4em" }}>
              <Rating name="no-value" value={product.rating.rate} />
              <Typography variant="h6" component="div">
                ({product.rating.count})
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAdd}
            sx={{ width: "30%" }}
            type="submit"
          >
            Add to cart
          </Button>
        </Stack>
      </Box>
      <Typography variant="h4" component="div" sx={{ p: 6 }}>
        Related products:{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "4em",
        }}
      >
        {relatedProducts}
      </Box>
    </>
  );
};

export default ProductDetails;
