import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box } from "@mui/material";
import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";


interface DeleteIconProps {
  usersProducts: DocumentData;
  id: string;
  setProductAddedOrRemoved: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteIcon = ({usersProducts, id, setProductAddedOrRemoved}: DeleteIconProps) => {
  const { currentUser } = useAuth();

  const handleDeleteElement = async (id: string) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        products: usersProducts.products.filter((el: DocumentData) => el.id !== id),
      });
      setProductAddedOrRemoved((prev) => !prev);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  return (
    <Box onClick={() => handleDeleteElement(id)}>
      <DeleteForeverIcon
        sx={{
          ml: "auto",
          "&:hover": { color: "red", cursor: "pointer" },
        }}
      ></DeleteForeverIcon>
    </Box>
  );
};

export default DeleteIcon;
