import styled from "styled-components";
import { FieldErrors, FieldValue, useForm } from "react-hook-form";

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

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const StyledError = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type ErrorPropsType = {
  // errors: { [key: string]: { message: string } };
  errors: FieldErrors;
  label: string;
};

function Error({ errors, label }: ErrorPropsType) {
  if (!errors || !Object.keys(errors).length || !errors?.[label]) {
    return null;
  }

  return errors?.[label]?.message &&
    typeof errors[label].message === "string" ? (
    <StyledError>{errors[label]?.message}</StyledError>
  ) : (
    <StyledError>Invalid input</StyledError>
  );
}

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
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
        <Error errors={errors} label="name" />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
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
        <Error errors={errors} label="maxCapacity" />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
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
        <Error errors={errors} label="regularPrice" />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
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
        <Error errors={errors} label="discount" />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
        <Error errors={errors} label="description" />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
