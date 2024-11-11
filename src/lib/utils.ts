import { User } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const DB_SERVER_URL = process.env.DB_SERVER_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getServerSession(): Promise<User | null> {
  // Temp function that returns the first user in the database
  try {
    const response = await fetch(`${DB_SERVER_URL}/users/first`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}
