import { FieldValues, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { CreateCabin, editCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import FormRow, { StyledFormRow } from "../../ui/FormRow";
import { CabinType } from "./types";

// type CabinFormType =
//   | { [key in keyof Omit<CabinType, "id" | "createdAt">]: string }
//   | null;

// type CreateCabinFormPropsType = {
//   cabinToEdit: CabinFormType;
// };

// type CreateCabinFormPropsType = {
//   cabinToEdit: Omit<CabinType, "id" | "createdAt"> | null;
// };

type CreateCabinFormPropsType = {
  cabinToEdit: CabinType | null;
};

function CreateCabinForm({ cabinToEdit }: CreateCabinFormPropsType) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: cabinToEdit ? cabinToEdit : {} });

  // useQuery() for getting the cached state (without fetching the data again)
  // const { data: cabins } = useQuery({
  //   queryKey: [QUERY_KEYS.CABINS],
  // });
  const queryClient = useQueryClient();
  const { mutate: mutateCreating, isPending: isCreating } = useMutation({
    mutationFn: CreateCabin,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CABINS],
      });
      toast.success("Cabin successfully created");
      reset();
    },

    onError: () => {
      toast.error("Cabin could not be created");
    },
  });

  /* 
    2 useMutation() for one form submission:
    1 for creating a new cabin
    1 for editing a cabin
  */
  const { mutate: mutateEditing, isPending: isEditing } = useMutation({
    // the function value assigned to "mutationFn" receives only 1 parameter
    mutationFn: (obj: {
      data: FieldValues;
      id: number;
      cabinToEdit: CabinType;
    }) => editCabin(obj),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CABINS],
      });
      toast.success("Cabin successfully edited");
      // reset(); // resets to "default" values
      reset({
        name: "",
        maxCapacity: 0,
        description: "",
        discount: 0,
        regularPrice: 0,
      });
    },

    onError: () => {
      toast.error("Cabin could not be edited");
    },
  });

  const isCreatingOrEditing = isCreating || isEditing;

  function onSubmit(data: FieldValues) {
    if (cabinToEdit) mutateEditing({ data, id: cabinToEdit.id, cabinToEdit });
    else mutateCreating(data);
  }

  // console.log(errors);

  function onValidationErrors(errors: object) {
    // console.log(errors);
    void errors;
  }

  function validateDiscountField(discount: string | number) {
    const discountNum = Number(discount);
    const regularPriceNum = Number(getValues().regularPrice);

    if (regularPriceNum < 0 && discountNum >= 0) return true;

    return (
      (discountNum >= 0 && discountNum <= regularPriceNum) ||
      (discountNum < 0
        ? `Discount cannot be negative`
        : `Discount cannot be more than the regular price (${formatCurrency(
            regularPriceNum
          )})`)
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onValidationErrors)}>
      <FormRow label="Cabin name" errors={errors}>
        <Input
          type="text"
          id="name"
          // defaultValue={cabinToEdit?.name}
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isCreatingOrEditing}
        />
      </FormRow>

      <FormRow label="Max. capacity" errors={errors}>
        <Input
          disabled={isCreatingOrEditing}
          type="number"
          id="maxCapacity"
          // defaultValue={cabinToEdit?.maxCapacity}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value is 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" errors={errors}>
        <Input
          disabled={isCreatingOrEditing}
          type="number"
          id="regularPrice"
          // defaultValue={cabinToEdit?.regularPrice}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value is 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" errors={errors}>
        <Input
          disabled={isCreatingOrEditing}
          type="number"
          id="discount"
          // defaultValue={cabinToEdit?.discount || 0}
          defaultValue={"0"}
          {...register("discount", {
            required: "This field is required",
            min: {
              value: "0",
              message: "Minimum value is 0",
            },
            // max: {
            //   value: getValues().regularPrice,
            //   message: `Discount cannot be more than the regular price (${formatCurrency(
            //     getValues().regularPrice
            //   )})`,
            // },
            validate: validateDiscountField,
          })}
        />
      </FormRow>
      <FormRow label="Description" errors={errors}>
        <Textarea
          disabled={isCreatingOrEditing}
          id="description"
          // defaultValue={cabinToEdit?.description}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" errors={errors}>
        <FileInput
          id="image"
          accept="image/*"
          defaultValue=""
          {...register("image", {
            required: cabinToEdit ? false : "This field is required",
          })}
        />
      </FormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreatingOrEditing}>
          {cabinToEdit ? "Edit Cabin" : "Add Cabin"}
        </Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
