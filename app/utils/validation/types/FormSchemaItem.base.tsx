type FormSchemaBaseItem = {
  type: string;
  validate: (value: any, isServer?: boolean) => Promise<string | true>;
  label?: string;
  required?: boolean
  additionalProps?: {
    className?: string;
  },
  customValidate?: (value: any) => string | true;
}

export default FormSchemaBaseItem;
