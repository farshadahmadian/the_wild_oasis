import { FieldValues } from "react-hook-form";
import supabase, { supabaseUrl } from "../../services/supabase";
import { deleteCabin } from "../../services/apiCabins";

export function isNewImage(cabin: FieldValues) {
  return (
    typeof cabin.image !== "string" &&
    cabin?.image?.length > 0 &&
    Object.keys(cabin?.image).length > 0
  );
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type ImagePropsType = {
  imageFile: any;
  imagePath: string;
  imageFileName: string;
};

export function getImageProps(cabin: FieldValues, isImageEdited: boolean) {
  if (!isImageEdited) return null;
  const imageFile = cabin.image["0"];
  const imageFileName = (
    Math.random().toString(16).slice(2) +
    Date.now().toString(16) +
    imageFile.name
  ).replace("/", "");

  const cabinImagesBucket = "storage/v1/object/public/cabin-images";
  const imagePath = `${supabaseUrl}/${cabinImagesBucket}/${imageFileName}`;
  const imageProps: ImagePropsType = { imageFile, imagePath, imageFileName };
  return imageProps;
}

export async function uploadCabinImage(
  imageFileName: string,
  imageFile: any,
  cabin: any[] | null
) {
  if (!cabin) return;

  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageFileName, imageFile);

  if (imageError) {
    console.error("Cabin image could not be uploaded");
    const deleteError = await deleteCabin(cabin["id" as keyof typeof cabin]);
    if (!deleteError) console.error("Cabin is deleted");
    throw new Error(imageError.message);
  }
}
