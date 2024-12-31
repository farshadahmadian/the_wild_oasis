import { FieldValue, useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { CreateCabin } from "../../services/apiCabins";
import { CabinType } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "../../types";
import { formatCurrency } from "../../utils/helpers";
import FormRow, { StyledFormRow } from "../../ui/FormRow";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
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

  function onSubmit(data: FieldValue<CabinType>) {
    mutate(data);
  }

  // console.log(errors);

  function onValidationErrors(errors: object) {
    // console.log(errors);
    void errors;
  }

  function validateDiscountField(discount: string) {
    const discountNum = Number(discount);
    const regularPriceNum = Number(getValues().regularPrice);

    if (regularPriceNum < 0 && discountNum >= 0) return true;

    return (
      (discountNum >= 0 && discountNum <= regularPriceNum) ||
      (discountNum < 0
        ? `Discount cannot be negative`
        : `Discount cannot be more than the regular price (${formatCurrency(
            getValues().regularPrice
          )})`)
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onValidationErrors)}>
      <FormRow label="Cabin name" errors={errors}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Maximum capacity" errors={errors}>
        <Input
          disabled={isPending}
          type="number"
          id="maxCapacity"
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
          disabled={isPending}
          type="number"
          id="regularPrice"
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
          disabled={isPending}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            min: {
              value: 0,
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
      <FormRow label="Description for website" errors={errors}>
        <Textarea
          disabled={isPending}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" errors={errors}>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
