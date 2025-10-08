import type { ActionFunction } from "@remix-run/node";
import themeService from "~/utils/services/theme.server";

export const action: ActionFunction = async ({ request }) => {
  return await themeService.toggleTheme(request)
};
