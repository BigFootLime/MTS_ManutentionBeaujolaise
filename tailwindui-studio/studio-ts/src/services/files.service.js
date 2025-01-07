import axios from "axios";
import { BASE_URL } from "../utils/CallApi";

// GET by ID
export async function GetPicture(id) {
  try {
    return await axios.get(`${BASE_URL}/files/${id}`, {
      responseType: "blob",
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    return null;
  }
}

// POST
export async function uploadFile(file) {
  console.log("file", file);
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${BASE_URL}/files`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Image uploadée :", res.data);
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image :", error);
  }
}
