import React from "react";
import { Product } from "../interfaces";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
interface relatedProductProps {
  product: Product;
}

export default function RelatedProduct({ product }: relatedProductProps) {
  return (
    <Link
      to={`/products/${product.id}`}
      style={{ width: "10em", color: "black", textDecoration: "none" }}
    >
      <Paper sx={{p: 2}}>
        <img
          src={product.image}
          alt="product"
          style={{ width: "100%", height: "auto" }}
        />

        <Typography variant="body1" component="div">
          {product.title}
        </Typography>
        <Typography variant="h6" component="div">
          {product.price} $
        </Typography>
      </Paper>
    </Link>
  );
}
