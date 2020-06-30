import React from "react";
import { useField } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@material-ui/core";

interface Props {
  name: string;
}

function DateField({ ...props }: Props) {
  const [field, { error, touched }] = useField(props);

  const isError = (error && touched) as boolean;

  return (
    <TextField
      fullWidth
      margin="normal"
      variant="outlined"
      id={props.name}
      autoComplete={"date"}
      type={"date"}
      error={isError}
      helperText={isError ? error : ""}
      {...props}
      {...field}
    />
  );
}

export default DateField;
