import { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";
import { CabinType } from "../features/cabins/types";
import { FieldValues } from "react-hook-form";
import {
  getImageProps,
  isNewImage,
  uploadCabinImage,
} from "../features/cabins/helpers";
// import { FieldValue } from "react-hook-form";

export async function getCabins() {
  const {
    data: cabins,
    error,
  }: { data: CabinType[] | null; error: PostgrestError | null } = await supabase
    .from("cabins")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return error;
}

export type CabinFormType = {
  description: string;
  discount: string;
  image: FileList;
  maxCapacity: string;
  name: string;
  regularPrice: string;
};

// export async function CreateCabin(newCabin: FieldValue<CabinType>) {
export async function CreateCabin(newCabin: FieldValues) {
  const isImageEdited = isNewImage(newCabin);

  const { imageFile, imageFileName, imagePath } =
    getImageProps(newCabin, isImageEdited) || {};
  const cabinToAdd = {
    ...newCabin,
    // image: { ...newCabin.image["0"], name: imageFileName }, // does not work because newCabin.image["0"] is a File instance which has some properties that are not enumerable
    image: isImageEdited ? imagePath : newCabin.image,
  };

  const { data, error } = await supabase
    .from("cabins")
    .insert([cabinToAdd])
    .select(); // without select() the value of "data" will be null even in case of success and using "await"

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  /* 
    must "await", otherwise, before the image is uploaded, the data is returned.
    first, image upload might encounters some errors. Second, even if it does not
    fail, first onSuccess() in useMutation() will be called which will call invalidateQueries()
    which leads to re-render and after that the image will be successfully uploaded, so 
    after re-render and repainting the page, image is not painted until the next render
    (or manul page reload)
  */
  if (isImageEdited) await uploadCabinImage(imageFileName!, imageFile, data);
  return data;
}

// data: data submitted in the edit cabin form
export async function editCabin(obj: {
  data: FieldValues;
  id: number;
  cabinToEdit: CabinType;
}) {
  const isImageEdited = isNewImage(obj.data);
  const imageProps = getImageProps(obj.data, isImageEdited);
  const { imageFile, imageFileName, imagePath } = imageProps || {};

  const { data: editedCabin, error } = await supabase
    .from("cabins")
    .update({
      ...obj.data,
      /* 
        "obj.data.image" does not work because if the "choose file" button
        in edit cabin form is clicked, but no file is selected, after submitting 
        the form, obj.data.image will be an {} or A FileList with length 0
        therefore, the image path of the remote state must be used
      */
      // image: isImageEdited ? imagePath : obj.data.image,
      image: isImageEdited ? imagePath : obj.cabinToEdit.image,
    })
    .eq("id", obj.id)
    .select();
  // .single(); // to return the editedCabin object instead of the array [editedCabin]

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be edited");
  }

  if (isImageEdited)
    await uploadCabinImage(imageFileName!, imageFile, editedCabin);

  return editedCabin;
}
