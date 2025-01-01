import { PostgrestError } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";
import { CabinType } from "../features/cabins/types";
import { FieldValues } from "react-hook-form";
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
  const imageFile = newCabin.image["0"];
  const imageFileName = (
    Math.random().toString(16).slice(2) +
    Date.now().toString(16) +
    imageFile.name
  ).replace("/", "");

  const cabinImagesBucket = "storage/v1/object/public/cabin-images";
  const imagePath = `${supabaseUrl}/${cabinImagesBucket}/${imageFileName}`;

  const cabinToAdd = {
    ...newCabin,
    // image: { ...newCabin.image["0"], name: imageFileName }, // does not work because newCabin.image["0"] is a File instance which has some properties that are not enumerable
    image: imagePath,
  };

  const { data, error } = await supabase
    .from("cabins")
    .insert([cabinToAdd])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageFileName, imageFile);

  if (imageError) {
    console.error("Cabin image could not be uploaded");
    const deleteError = await deleteCabin(data["id" as keyof typeof data]);
    if (!deleteError) console.error("Cabin could not be created");
    throw new Error(imageError.message);
  }
  return data;
}
