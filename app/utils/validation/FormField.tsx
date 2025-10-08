import FormFieldComponents from "./types/FormFieldsComponents";
import FormSchemaItem from "./types/FormSchemaItem";

// We can use schema field structures as possible props,
// but we also add info about name, defaultValue (if it exists)
// and data loaded from DB (if it exists)
type Props = {
  component: FormFieldComponents[keyof FormFieldComponents],
  name: string,
  defaultValue?: any,
  dbData?: Record<string, []>
} & FormSchemaItem;

export default function FormField({ component: Component, ...otherProps }: Props) {

  if (Component)
    return <Component {...otherProps} />

  return null;
}
