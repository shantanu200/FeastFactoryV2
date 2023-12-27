import * as yup from "yup";

const VName = yup
  .string()
  .required("Name is required")
  .min(5, "Name must contain 5 character");
const VUsername = yup
  .string()
  .min(5, "Useranme must contain 5 character")
  .required("Username is required");
const VPassword = yup.string().required("Password is required");

export { VName, VUsername, VPassword };

export const ValidationSchemaRegister = yup.object().shape({
  name: VName,
  username: VUsername,
  password: VPassword,
});

export const ValidationSchemaLogin = yup.object().shape({
  username: VUsername,
  password: VPassword,
});

export const ValidationSchemaRecipe = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Description must contain 20 character"),
});
