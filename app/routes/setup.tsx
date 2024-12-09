import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { createUser } from "~/utils/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("Setup route accessed");
  try {
    console.log("Attempting to create user...");
    const user = await createUser("ltg", "ltg");
    console.log("User created successfully:", user);
    return json({ 
      success: true, 
      message: "User created successfully!", 
      user: { 
        id: user.id, 
        username: user.username 
      } 
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return json({ 
      success: false, 
      message: "Error creating user: " + (error.message || "Unknown error"),
      error: error.code || error.name || "Unknown error type",
      stack: error.stack
    }, { status: 400 });
  }
} 