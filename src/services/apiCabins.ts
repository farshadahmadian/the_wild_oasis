import { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";
import { CabinType } from "../features/cabins/types";

export async function getCabins() {
  const {
    data: cabins,
    error,
  }: { data: CabinType[] | null; error: PostgrestError | null } = await supabase
    .from("cabins")
    .select("*");

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return cabins;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
