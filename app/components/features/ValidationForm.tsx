import ValidationFormBase from "~/utils/validation/ValidateForm";
import ValidationFormProps from "~/utils/validation/types/ValidationFormProps";
import FormFieldComponents from "~/utils/validation/types/FormFieldsComponents";
import InputField from "~/components/ui/InputField";
import FormAlertComponents from "~/utils/validation/types/FormAlertComponents";
import Alert from "~/components/ui/Alert";
import UnexpectedErrorAlert from "~/components/ui/UnexpectedErrorAlert";
import Button from "~/components/ui/Button";
import { GlobalContext } from "~/root";
import { useContext, useEffect } from "react";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import ImageField from "../ui/ImageField";
import extractError from "~/utils/validation/extractError";
import Animated from "../ui/Animated";
import Checkbox from "../ui/Checkbox";
import SelectField from "../ui/SelectField";
import DBSelectField from "../ui/DBSelectField";
import WysiwygField from "../ui/Wysiwyg";
import FilesField from "../ui/FilesField";
import TextMultiLangField from "../ui/TextMultiLangField";
import WysiwygMultiLangField from "../ui/WysiwygMultiLangField";
import DateField from "../ui/DateField";
import FileField from "../ui/FileField";
import IconField from "../ui/IconField";
import DBMultiSelectField from "../ui/DBMulltiSelectField";

const SuccessAlert = (
  { collection, variant }: { collection: string, variant: "create" | "edit" }
) => {
  const { t } = useContext(GlobalContext);

  return (
    <Alert
      className="mx-auto"
      variant="success"
      title={t(`${collection}.success.${variant}`)}
    >
      {t(`${collection}.success.${variant}Desc`)}
    </Alert>
  );
}

const ErrorsAlert = (
  {
    errors,
    collection
  }: {
    errors: Record<string, string>,
    collection: string
  }
) => {
  const { t } = useContext(GlobalContext);
  console.log(errors);

  return (
    <Animated
      animation="fadeInUp"
    >
      <Alert
        className="mx-auto"
        variant="danger"
        title={t('common.validation.errorsExist')}
      >
        {Object.keys(errors).map(field => (
          <p>
            <strong>{t(`${collection}.fields.${field}`)}</strong>: {t(...extractError(errors[field]))}
          </p>
        ))}
      </Alert>
    </Animated>
  );
}

const TextFieldComponent = (props: any) => <InputField {...props} type="text" />
const TelFieldComponent = (props: any) => <InputField {...props} type="tel" />
const NumberFieldComponent = (props: any) => <InputField {...props} type="number" />
const PasswordFieldComponent = (props: any) => <InputField {...props} type="password" />
const EmailFieldComponent = (props: any) => <InputField {...props} type="email" />
const ImageFieldComponent = (props: any) => <ImageField {...props} />
const BooleanFieldComponent = (props: any) => <Checkbox {...props} />
const SelectFieldComponent = (props: any) => <SelectField {...props} />
const DBSelectFieldComponent = (props: any) => <DBSelectField {...props} />
const WysiwygFieldComponent = (props: any) => <WysiwygField {...props} />
const FilesFieldComponent = (props: any) => <FilesField {...props} />
const TextMultiLangFieldComponent = (props: any) => <TextMultiLangField {...props} />
const WysiwygMultiLangFieldComponent = (props: any) => <WysiwygMultiLangField {...props} />
const DateFieldComponent = (props: any) => <DateField {...props} />
const FileFieldComponent = (props: any) => <FileField {...props} />
const IconFieldComponent = (props: any) => <IconField {...props} />
const DBMultiSelectFieldComponent = (props: any) => <DBMultiSelectField {...props} />

export default function ValidationForm({ collection, variant, ...otherProps }: ValidationFormProps & { collection: string, variant: "create" | "edit" }) {
  const { t } = useContext(GlobalContext);

  // on success or error, make sure page scrolls to the top
  useEffect(() => {
    if (otherProps.success || otherProps.error || otherProps.errors) {
      window.scrollTo({ top: 30, left: 0, behavior: "smooth" });
    }
  }, [otherProps.success, otherProps.errors, otherProps.error]);


  const fieldComponents: FormFieldComponents = {
    text: TextFieldComponent,
    tel: TelFieldComponent,
    number: NumberFieldComponent,
    password: PasswordFieldComponent,
    email: EmailFieldComponent,
    image: ImageFieldComponent,
    boolean: BooleanFieldComponent,
    select: SelectFieldComponent,
    DBSelect: DBSelectFieldComponent,
    wysiwyg: WysiwygFieldComponent,
    files: FilesFieldComponent,
    textMultiLang: TextMultiLangFieldComponent,
    wysiwygMultiLang: WysiwygMultiLangFieldComponent,
    date: DateFieldComponent,
    file: FileFieldComponent,
    icon: IconFieldComponent,
    DBMultiSelect: DBMultiSelectFieldComponent
  }

  const alertComponents: FormAlertComponents = {
    success: () => {
      return (
      <>
        <SuccessAlert collection={collection} variant={variant} />
      </>
    )},
    errors: ({ errors }) => <ErrorsAlert errors={errors} collection={collection} />,
    error: ({ error }) => <UnexpectedErrorAlert error={error} />
  }

  const buttonComponent = () => (
    <Button className="mx-auto" type="submit" icon={variant === "create" ? FaPlus : FaPencilAlt }>
      {t(`${collection}.${variant}Action`)}
    </Button>
  );

  return (
    <ValidationFormBase
      {...otherProps}
      fieldComponents={fieldComponents}
      alertComponents={alertComponents}
      buttonComponent={buttonComponent}
    />
  )
}
