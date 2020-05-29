import React from "react";
import { Field } from "formik";

interface Props {
  name: string;
}

function RadioField({ name }: Props) {
  return (
    <Field
      name={name}
      component={({ field }: any) => (
        <>
          <div>
            <input
              {...field}
              id="female"
              value="FEMALE"
              checked={field.value === "FEMALE"}
              name="gender"
              type="radio"
            />
            <label htmlFor="female">Female</label>
          </div>
          <div>
            <input
              {...field}
              id="male"
              value="MALE"
              checked={field.value === "MALE"}
              name="gender"
              type="radio"
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              {...field}
              id="other"
              value="OTHER"
              checked={field.value === "OTHER"}
              name="gender"
              type="radio"
            />
            <label htmlFor="other">Other</label>
          </div>
        </>
      )}
    />
  );
}

export default RadioField;
