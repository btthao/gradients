import { useApolloClient } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import convert from "color-convert";
import { Form, Formik } from "formik";
import { useMemo } from "react";
import { useCreateGradientMutation } from "../generated/graphql";
import { getColorName } from "../utils/color";
import { useAppContext } from "../utils/context";
import Input from "./Input";

interface AddGradientProps {
  onClick: () => void;
}

const AddGradient: React.FC<AddGradientProps> = ({ onClick }) => {
  const { state, dispatch } = useAppContext();
  const [createGradient] = useCreateGradientMutation();
  const { color_1, color_2, stop_1, stop_2, direction } = state.colorPicker;
  const tag_1 = useMemo(() => {
    return getColorName(convert.hex.hsl(color_1));
  }, [color_1]);
  const tag_2 = useMemo(() => {
    return getColorName(convert.hex.hsl(color_2));
  }, [color_2]);

  const apolloClient = useApolloClient();

  return (
    <div className="fixed w-full h-full top-0 left-0 z-50 ">
      <div
        className="absolute w-full h-full top-0 left-0 opacity-70 bg-gray-800  "
        onClick={onClick}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-8 bg-gray-100 border shadow overflow-scroll max-h-3/4 rounded-md w-4/5 max-w-sm">
        <Formik
          initialValues={{
            name: "",
          }}
          validate={(values) => {
            if (values.name.trim().length == 0) {
              return { name: "This field can't be empty." };
            }
            if (values.name.length > 18) {
              return { name: "Hmm, keep name length under 18 characters." };
            }
          }}
          onSubmit={async (values, { setErrors }) => {
            const input = {
              name: values.name.trim().toLowerCase(),
              colors: [color_1, color_2],
              stops: [stop_1, stop_2],
              direction,
              tags: [tag_1, tag_2],
            };

            let response: any;

            try {
              response = await createGradient({
                variables: { createGradientInput: input },
              });
            } catch (err) {
              setErrors({
                name: "Oops! Can't connect to database. Please try again later.",
              });
            }

            if (response?.data?.createGradient.completed) {
              dispatch({
                type: "RESET_CURSORS",
                payload: {
                  page: 0,
                  tags: [],
                },
              });
              await apolloClient.resetStore();
              onClick();
            } else if (response.data?.createGradient.error) {
              setErrors({ name: response.data.createGradient.error });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="text-center">
              <Input label="Give this gradient a name first!" name="name" />
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="mt-4 bg-green-300 py-1 px-2 rounded-md text-sm font-medium text-gray-600 mr-5  "
              >
                Submit
              </Button>
              <Button
                type="button"
                onClick={onClick}
                className="mt-4 bg-green-300 py-1 px-2 rounded-md text-sm font-medium text-gray-600  "
              >
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddGradient;
