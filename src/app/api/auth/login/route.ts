import { NextResponse } from "next/server";
import { apiClient } from "@/app/api/client";

export async function POST(request: Request) {
  try {
    const { email_instansi, password } = await request.json();

    if (!email_instansi || !password) {
      return NextResponse.json(
        { error: "email_instansi and password are required" },
        { status: 400 }
      );
    }

    const response = await apiClient.post("/users/login", {
      email_instansi,
      password,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Login failed" },
      { status: 401 }
    );
  }
}
