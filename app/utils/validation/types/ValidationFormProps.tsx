import { PrimeIcon } from "~/components/ui/Icon";
import { FormSchema } from "./FormSchema";

type ValidationFormProps = {
  schema: FormSchema;
  method?: "post" | "delete" | "put" | "patch";
  errors?: Record<string, string> | undefined; // Expected standard errors
  error?: string | undefined; // Unexpected error returned by boundary
  success?: true | undefined;
  defaultData?: Record<string, any> | undefined;
  dbData?: Record<string, []>; // DBList fields can expect object with arrays of items (then can need products, users etc.)
  btnText?: string;
  btnIcon?: PrimeIcon;
  hideOnSuccess?: boolean;
};

export default ValidationFormProps;
