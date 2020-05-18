import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

interface Props {
  name: string;
}

function DateField({ ...props }: Props) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(value) => setFieldValue(field.name, value)}
    />
  );
}

export default DateField;
