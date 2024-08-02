"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { firestore } from "../firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

const PANTRY_COLLECTION = "pantry";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  createdAt: Date;
}

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [pantry, setPantry] = useState<PantryItem[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItemName("");
    setQuantity(1);
    setEditItemId(null);
  };

  const fetchPantryItems = async () => {
    const snapshot = await getDocs(collection(firestore, PANTRY_COLLECTION));
    const pantryList: PantryItem[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      pantryList.push({
        id: doc.id,
        name: data.name,
        quantity: data.quantity,
        createdAt: data.createdAt.toDate(),
      });
    });
    console.log(pantryList);
    setPantry(pantryList);
  };

  const addItem = async () => {
    try {
      const itemNameLower = itemName.toLowerCase();
      const docRef = doc(firestore, PANTRY_COLLECTION, itemNameLower);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          quantity: docSnap.data().quantity + quantity,
        });
      } else {
        await setDoc(docRef, {
          name: itemNameLower,
          createdAt: new Date(),
          quantity,
        });
      }
      fetchPantryItems();
      handleClose();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const editItem = async () => {
    try {
      if (!editItemId) return;

      const newName = itemName.toLowerCase();
      const docRef = doc(firestore, PANTRY_COLLECTION, editItemId);
      await updateDoc(docRef, {
        name: newName,
        quantity,
      });
      fetchPantryItems();
      handleClose();
    } catch (e) {
      console.error("Error editing document: ", e);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const docRef = doc(firestore, PANTRY_COLLECTION, itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const newCount = docSnap.data().quantity - 1;
        if (newCount > 0) {
          await updateDoc(docRef, { quantity: newCount });
        } else {
          await deleteDoc(docRef);
        }
        fetchPantryItems();
      }
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const handleEdit = (
    itemId: string,
    itemName: string,
    itemQuantity: number
  ) => {
    setEditItemId(itemId);
    setItemName(itemName);
    setQuantity(itemQuantity);
    handleOpen();
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change)); // Ensure quantity is at least 1
  };

  useEffect(() => {
    fetchPantryItems();
  }, []);

  const filteredPantry = pantry.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editItemId ? "Edit Item" : "Add Item"}
          </Typography>
          <Stack direction={"column"} spacing={2}>
            <TextField
              id="item-name"
              className="textField"
              fullWidth
              label="Item Name"
              variant="outlined"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={2}
            >
              <Button
                variant="contained"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </Button>
              <Typography variant="h6" component="span">
                Quantity: {quantity}
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </Button>
            </Stack>
            <Button
              variant="contained"
              onClick={() => (editItemId ? editItem() : addItem())}
            >
              {editItemId ? "Update" : "Add"}
            </Button>
          </Stack>
        </Box>
      </Modal>
      <TextField
        id="search"
        label="Search Items"
        sx={{ width: { xs: "90%", sm: "85%", md: "700px" } }}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
        className="textField"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>
      <Box
        border={"1px solid #333"}
        width={{ xs: "95%", sm: "90%", md: "800px" }}
      >
        <Box height="100px" bgcolor="#ADD8E6">
          <Typography variant={"h2"} textAlign={"center"} color={"#333"}>
            Pantry Items
          </Typography>
        </Box>
        <Stack height="300px" spacing={2} overflow={"auto"}>
          {filteredPantry.map((item) => (
            <Box
              key={item.id}
              width="100%"
              minHeight="150px"
              display={"flex"}
              flexDirection={isMobile ? "column" : "row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
              paddingX={isMobile ? 2 : 5}
            >
              <Typography variant={"h3"} textAlign={"center"} color={"#333"}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Typography>
              <Typography variant={"h4"} textAlign={"center"} color={"#333"}>
                Quantity: {item.quantity}
              </Typography>
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(item.id, item.name, item.quantity)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => removeItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
