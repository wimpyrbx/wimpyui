import { redirect } from "@remix-run/node";
import { themeSessionResolver } from "~/sessions.server";
import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const { getTheme, setTheme } = await themeSessionResolver(request);
  const currentTheme = getTheme();
  const newTheme = currentTheme === "light" ? "dark" : "light";
  await setTheme(newTheme);
  return redirect(request.headers.get("Referer") ?? "/", {
    headers: { "Set-Cookie": await themeSessionResolver(request).commit() },
  });
} 