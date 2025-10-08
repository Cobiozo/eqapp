import DistributiveOmit from "~/utils/DistributiveOmit";
import FormSchemaItem from "./FormSchemaItem";

type UnparsedFormSchema = {
  [key: string]: DistributiveOmit<FormSchemaItem, "validate">
}

export default UnparsedFormSchema;
