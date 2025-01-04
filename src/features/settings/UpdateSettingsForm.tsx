// import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./hooks/useSettings";
// import { useEffect } from "react";

function UpdateSettingsForm() {
  const { settings, isPending } = useSettings();
  const {
    breakfastPrice,
    maxBookingLength,
    maxGuestPerBooking,
    minBookingLength,
  } = settings || {};
  // const { reset, register } = useForm({
  //   defaultValues: settings,
  // });

  // useEffect(() => {
  //   console.log("called");
  //   reset(settings);
  // }, [settings, reset]);

  if (isPending) return <Spinner />;

  return (
    <Form>
      <FormRow errors={null} label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          // {...register("minBookingLength")}
        />
      </FormRow>
      <FormRow errors={null} label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          // {...register("maxBookingLength")}
          /* using {...register("maxBookingLength")} and "defaultValues in useForm()" set the input
            default value only on component mount (render). At that moment "settings" is not fetched
            so the default values will not be the settings properties. to solve the issue:
            (1)useEffect() and call "reset(settings)" whenever settings is updated. or
            (2)use the "defaultValue" attribute of the form
          */
        />
      </FormRow>
      <FormRow errors={null} label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          // {...register("maxGuestPerBooking")}
        />
      </FormRow>
      <FormRow errors={null} label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          // {...register("breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
