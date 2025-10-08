import { createCookie, json } from "@remix-run/node";

export type Theme = "light" | "dark";

const themeCookie = createCookie("theme", {
  maxAge: 60 * 60 * 24 * 365,
  secrets: [process.env.SECRET || "fsd4wrxr"],
});

class ThemeService {

  /** Returns current theme mode */
  /* @param request
  /* @returns theme mode (dark or light) */
  async getCurrentTheme(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await themeCookie.parse(cookieHeader)) || {};

    return cookie.theme || "dark";
  }

  /** Toggle theme mode (dark -> light or light -> dark) */
  /* @param request
  /* @returns json response with theme cookie */
  async toggleTheme(request: Request) {

    // try to retrieve the cookie
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await themeCookie.parse(cookieHeader)) || {};

    // get current theme
    // if there is no cookie set yet it means that the theme is light (default)
    const currentTheme = cookie.theme || "dark";

    // set the theme to opposite of current theme
    cookie.theme = currentTheme === "light" ? "dark" : "light";

    return json(
      { success: true },
      { headers: { "Set-Cookie": await themeCookie.serialize(cookie) } }
    );
  }
}

const themeService = new ThemeService();
export default themeService;
