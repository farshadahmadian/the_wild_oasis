import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./hooks/useSettings";
import useUpdateSettings from "./hooks/useUpdateSettings";
import { FocusEvent } from "react";
// import { useEffect } from "react";

function UpdateSettingsForm() {
  const { settings, isPending } = useSettings();
  const { mutateUpdatingSettings, isUpdating } = useUpdateSettings();
  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestPerBooking,
    minBookingLength,
  } = settings || {};
  const {
    register,
    formState: { errors },
    // handleSubmit,
  } = useForm({
    mode: "all",
    // defaultValues: settings,
  });

  // useEffect(() => {
  //   console.log("called");
  //   reset(settings);
  // }, [settings, reset]);

  // function onSubmit(data: FieldValues) {
  //   mutateUpdatingSettings(data);
  //   reset({
  //     maxBookingLength: 1,
  //     maxGuestPerBooking: 1,
  //     minBookingLength: 1,
  //     breakfastPrice: 1,
  //   });
  // }

  // function onValidationError(error: FieldErrors) {
  //   void error;
  // }

  function handleUpdateField(
    event: FocusEvent<HTMLInputElement>,
    field: string
  ) {
    /* 
      defaultValue: input value before change
      value: input value after change 
    */
    if (
      (!errors || !Object.keys(errors).length) &&
      event.target.defaultValue !== event.target.value
    )
      mutateUpdatingSettings({ [field]: event.target.value });
  }

  if (isPending) return <Spinner />;

  return (
    // <Form onSubmit={handleSubmit(onSubmit, onValidationError)}>
    <Form>
      <FormRow errors={errors} label="Min nights">
        <Input
          disabled={isUpdating}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          {...register("minBookingLength", {
            min: {
              value: 1,
              message: "Min value is 1",
            },
            onBlur(event) {
              handleUpdateField(event, "minBookingLength");
            },
          })}
        />
      </FormRow>
      <FormRow errors={errors} label="max nights">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          {...register("maxBookingLength", {
            min: {
              value: 1,
              message: "Min value is 1",
            },
            onBlur(event) {
              handleUpdateField(event, "maxBookingLength");
            },
          })}
          /* using {...register("maxBookingLength")} and "defaultValues in useForm()" set the input
            default value only on component mount (render). At that moment "settings" is not fetched
            so the default values will not be the settings properties. to solve the issue:
            (1)useEffect() and call "reset(settings)" whenever settings is updated. or
            (2)use the "defaultValue" attribute of the form
          */
        />
      </FormRow>
      <FormRow errors={errors} label="Max guests">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          {...register("maxGuestPerBooking", {
            min: {
              value: 1,
              message: "Min value is 1",
            },
            onBlur(event) {
              handleUpdateField(event, "maxGuestPerBooking");
            },
          })}
        />
      </FormRow>
      <FormRow errors={errors} label="Breakfast Price">
        <Input
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          {...register("breakfastPrice", {
            min: {
              value: 1,
              message: "Min value is 1",
            },
            onBlur(event) {
              handleUpdateField(event, "breakfastPrice");
            },
          })}
        />
      </FormRow>
      {/* <Button disabled={isUpdating}>Update</Button> */}
    </Form>
  );
}

export default UpdateSettingsForm;
