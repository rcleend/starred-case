import { NextResponse } from "next/server";
import { getJobsById, getJobRecommendations } from "@/lib/api/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await getJobRecommendations(body);
    const jobDetails = await getJobsById(data.jobIds);
    return NextResponse.json(jobDetails);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to search jobs" },
      { status: 500 }
    );
  }
}
