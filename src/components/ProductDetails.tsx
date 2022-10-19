
import { Product } from "../interfaces";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import useMediaQuery from "@mui/material/useMediaQuery";
import RelatedProduct from "./RelatedProduct"


interface ProductDetailsProps {
  product: Product;
  products: Array<Product>
}

export default function ProductDetails({ product, products }: ProductDetailsProps) {
  const mediaBreakpoint = useMediaQuery("(min-width:900px)");

  const relatedProducts = products.filter(el => el.category === product.category && el.id !== product.id).map(el => <RelatedProduct product={el} />)


  return (
    <>
    <Box sx={{ display: "flex", flexDirection: mediaBreakpoint ? "row" : "column", alignItems: "center", p: mediaBreakpoint ? 4 : 0 }}>
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
            <Rating
              name="no-value"
              value={product.rating.rate}
            />
            <Typography variant="h6" component="div">({product.rating.count})</Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
    <Typography variant="h4" component="div" sx={{p: 6}}>Related products: </Typography>
    <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4em"}}>
      {relatedProducts}
    </Box>
    </>
  );
}
