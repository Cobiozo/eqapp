export const getMysqlConfigFromUrl = () => {
  const [username, password, host, database] = process.env.DATABASE_URL
    .replace("mysql://", "")
    .split(/:|@|\//g);

  return {
    username,
    password,
    host,
    database,
  }
}

export const findValueKeyInObj = (obj, value) => {
  for(const key in obj) {
    if (obj[key] === value) {
      return key;
    }
  }
}
