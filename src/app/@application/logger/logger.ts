import { AppLogger } from "./app.logger";

export const getNewLogger = (context?: string) => {
  const scopeArr = context.split("/");
  const scope = scopeArr[scopeArr.length - 1] || "";
  return new AppLogger(scope);
};
