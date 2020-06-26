import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

interface Props {
  name: string;
  type: string;
  label?: string;
  autoFocus?: boolean;
  required?: boolean;
  rows?: number;
  multiline?: boolean;
  InputProps?: any;
  variant?: any;
  placeholder?: string;
  autoComplete?: string;
  margin?: any;
}

function MyTextField({ name, type, variant, ...rest }: Props) {
  const [field, { error, touched }] = useField({
    name,
    type,
  });

  const isError = (error && touched) as boolean;

  return (
    <TextField
      fullWidth
      margin="normal"
      variant="outlined"
      id={name}
      autoComplete={type}
      type={type}
      error={isError}
      helperText={isError ? error : ""}
      {...field}
      {...rest}
    />
  );
}

export default MyTextField;
