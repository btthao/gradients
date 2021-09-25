import { ErrorMessage, Field, useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <div className=" grid text-gray-800 place-items-center">
      <label
        htmlFor={field.name}
        className="text-center font-medium text-green-500"
      >
        {label}
      </label>
      <Field
        {...props}
        {...field}
        id={field.name}
        className=" mt-3 mb-1 bg-gray-100 border-2 border-purple-200 py-1 rounded-lg w-2/3 "
      ></Field>
      {error && (
        <ErrorMessage
          name={field.name}
          component="div"
          className="text-red-400 text-sm px-8  "
        />
      )}
    </div>
  );
};

export default Input;
