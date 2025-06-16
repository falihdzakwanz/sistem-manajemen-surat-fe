import { NextResponse } from "next/server";
import { apiClient } from "@/app/api/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await apiClient.post("/users", body);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Registration failed" },
      { status: 400 }
    );
  }
}
