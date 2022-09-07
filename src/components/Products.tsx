import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductsProps {
  products: Array<Product>;
}

export default function Products({ products }: ProductsProps) {
  const mediaBreakpoint = useMediaQuery('(min-width:900px)');
  const listedProducts = products.map((el) => (
    <Grid key={el.id} item xs={12} md={4}>
      <Card>
        <CardActionArea disableTouchRipple>
          <CardMedia
            component="img"
            height="160"
            image={el.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {el.title}
            </Typography>
            <Typography variant="body1" sx={{mb:2}}>{el.category}</Typography>
            <Box sx={{display: "flex"}}>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 3, my: "auto" }}>
                {el.price} $
              </Typography>
              <Button variant="outlined" color="secondary" endIcon={<ArrowForwardIosIcon />} sx={{ml: "auto"}}>See details</Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )).slice(0,6);
  return (
    <Grid container spacing={4} my={4} sx={{width: mediaBreakpoint ? "70%" : "100%", ml: "auto", mt: mediaBreakpoint ? 0 : 15}}>
      {listedProducts}
    </Grid>
  );
}
