import { getServerSession } from "@/lib/utils";
import { NextResponse } from "next/server";

const DB_SERVER_URL = process.env.DB_SERVER_URL;

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobId } = await request.json();
    if (!jobId) {
      return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
    }

    const response = await fetch(`${DB_SERVER_URL}/favourites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.id,
        jobId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add favourite");
    }

    const favouriteIds = await response.json();

    return NextResponse.json(favouriteIds);
  } catch (error) {
    console.error("Error adding favourite:", error);
    return NextResponse.json(
      { error: "Failed to add favourite" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobId } = await request.json();
    if (!jobId) {
      return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
    }

    const response = await fetch(`${DB_SERVER_URL}/favourites`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.id,
        jobId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to remove favourite");
    }

    const favouriteIds = await response.json();

    return NextResponse.json(favouriteIds);
  } catch (error) {
    console.error("Error removing favourite:", error);
    return NextResponse.json(
      { error: "Failed to remove favourite" },
      { status: 500 }
    );
  }
}
