import type FormSchema from "./types/FormSchema";
import { useMemo } from "react";
import { Form } from "@remix-run/react";
import type FormFieldComponents from "./types/FormFieldsComponents";
import type FormAlertComponents from "./types/FormAlertComponents";
import clsx from "clsx";
import FormField from "./FormField";
import { FaPlus } from "react-icons/fa";

type Props = {
  schema: FormSchema;
  fieldComponents: FormFieldComponents,
  alertComponents: FormAlertComponents,
  buttonComponent: React.FC<{ children: React.ReactNode, icon: React.FC }>;
  method?: "post" | "delete" | "put" | "patch";
  errors?: Record<string, string> | undefined; // Expected standard errors
  error?: string | undefined; // Unexpected error returned by boundary
  success?: true | undefined;
  defaultData?: Record<string, any> | undefined;
  dbData?: Record<string, []>; // DBList fields can expect object with arrays of items (then can need products, users etc.)
  btnText?: string;
  btnIcon?: React.FC
  hideOnSuccess?: boolean;
}

/** ValidateForm component
 * @param schema Form schema that describes what fields we want to render and what are their requirements
 * @param fieldComponents Components that will be used to render specific fields (text, number, date, etc.)
 * @param alertComponents Components that will be used to render alerts (success, errors, error)
 * @param buttonComponent Component that will be used to render submit button
 * @param method - HTTP method (default: "post")
 * @param errors Expected standard errors (invalid login, password etc.)
 * @param error Unexpected error returned by boundary (something went really wrong on the server)
 * @param success If set to true, component shows success alert.
 * @param defaultData Default data that should be used in the form fields at startup.
 * @param dbData Object with part of db data `({ products: [...], ... })`. It's only needed it schema contains fields that needs data from db.
 * @param btnText Text that should be displayed on the submit button.
 * @param btnIcon Icon that should be displayed on the submit button.
*/
export default function ValidationForm({
  schema,
  fieldComponents,
  alertComponents,
  buttonComponent,
  method = "post",
  errors,
  success,
  error,
  defaultData,
  dbData,
  btnText,
  btnIcon,
  hideOnSuccess = true
}: Props) {

  // we define enctype based on schema. If there is file field in schema, we set enctype to "multipart/form-data"
  const encType = useMemo(() => {
    const isAtLeastOneFileOrImage = Object.values(schema)
      .some(i => ["image", "file", "wysiwyg", "wysiwygMultiLang", "files"].includes(i.type));

    if (isAtLeastOneFileOrImage)
      return "multipart/form-data";
    else
      return "application/x-www-form-urlencoded";
  }, [schema]);

  // let's save components from props to local variables
  const { success: SuccessAlert, errors: ErrorsAlert, error: UnexpectedErrorAlert } = alertComponents;
  const Button = buttonComponent;

  return (
    <Form method="post" encType={encType}>
      { method !== "post" && <input type="hidden" name="_method" value={method} /> }
      { success && <SuccessAlert /> }
      { errors && <ErrorsAlert errors={errors} /> }
      { error && <UnexpectedErrorAlert error={error} /> }
      <div className={clsx(
        "flex flex-col items-center",
        success && hideOnSuccess && "select-none pointer-events-none hidden"
      )}>
        {Object.keys(schema).map(key => {
          const { additionalProps, ...standardProps } = schema[key];
          return (
            <FormField
              key={key}
              name={key}
              component={fieldComponents[schema[key].type]}
              defaultValue={defaultData?.[key]}
              dbData={dbData}
              {...standardProps}
              {...additionalProps}
            />
          )
        })}
        <div className="flex flex-wrap gap-3">
          <Button icon={btnIcon ? btnIcon : FaPlus}>
            {btnText}
          </Button>
        </div>
      </div>
    </Form>
  );
}
