import { NextResponse } from "next/server";
import { apiClient } from "@/app/api/client";

export async function DELETE(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token missing" },
        { status: 401 }
      );
    }

    const response = await apiClient.delete("/users/current", token);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Logout failed" },
      { status: 500 }
    );
  }
}
