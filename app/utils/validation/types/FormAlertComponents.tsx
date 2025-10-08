type FormAlertComponents = {
  success: React.FC,
  errors: React.FC<{ errors: Record<string, string> }>,
  error: React.FC<{ error: string }>
}

export default FormAlertComponents;
