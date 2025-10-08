import type { Config } from "./config";
import config from "./config";

export type ConfigServer = Config & {
  mail: {
    host: string;
    auth: {
      user: string;
      pass: string;
    };
    from: {
      name: string;
      mail: string;
    },
  }
}

const serverConfig: ConfigServer = {
  ...config,
  mail: {
    host: "mail55.mydevil.net",
    auth: {
      user: process?.env.MAIL_USER as string,
      pass: process?.env.MAIL_PASS as string,
    },
    from: {
      name: "EQApp",
      mail: "no-reply@eqapp.pl"
    }
  }
}

export default serverConfig;
