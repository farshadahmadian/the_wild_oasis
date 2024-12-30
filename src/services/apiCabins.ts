import { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";
import { CabinType } from "../features/cabins/types";
import { FieldValue } from "react-hook-form";

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
}

export async function CreateCabin(newCabin: FieldValue<CabinType>) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  return data;
}
