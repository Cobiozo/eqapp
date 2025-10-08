import Alert from "./Alert";
import { useContext } from "react";
import { GlobalContext } from "~/root";

export default function UnexpectedErrorAlert({ error }: { error: string }) {
  const { t } = useContext(GlobalContext);

  return (
    <Alert
      variant="danger"
      title={t('common.unexpectedError')}
    >
      {process.env.NODE_ENV === "production"
        ? error
        : t('common.unexpectedErrorDesc')
      }
    </Alert>
  );
}
