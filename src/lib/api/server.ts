"use server";

import { JobsResponse, Job, SearchJobsResponse, User } from "@/types";

/**
 * This file contains API functions that should only be used in server-side code.
 * These functions make requests to the backend API directly.
 */

const JOBS_API_BASE_URL = process.env.JOBS_API_BASE_URL;
const DB_SERVER_URL = process.env.DB_SERVER_URL;

export async function getJobs(page: number): Promise<JobsResponse> {
  const response = await fetch(`${JOBS_API_BASE_URL}/jobs?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
}

export async function getJobDetails(jobId: number): Promise<Job> {
  const response = await fetch(`${JOBS_API_BASE_URL}/jobs/${jobId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch job details");
  }
  return response.json();
}

export async function getJobsById(jobIds: number[]): Promise<Job[]> {
  const jobDetails = await Promise.all(
    jobIds.map((id) => getJobDetails(id))
  ).catch((error) => {
    console.error("Error fetching job details:", error);
    return [];
  });
  return jobDetails;
}

export async function getJobRecommendations(body: {
  jobTitle: string;
}): Promise<SearchJobsResponse> {
  const response = await fetch(`${JOBS_API_BASE_URL}/jobs/recommendations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch job recommendations");
  }
  return response.json();
}

export async function getFavouriteJobIds(userId: number): Promise<number[]> {
  const response = await fetch(`${DB_SERVER_URL}/favourites/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch favourite jobs");
  }
  return response.json();
}

export async function addToFavourites(
  jobId: number,
  userId: number
): Promise<Job[]> {
  const response = await fetch(`${JOBS_API_BASE_URL}/jobs/favourites`, {
    method: "POST",
    body: JSON.stringify({ jobId, userId }),
  });
  if (!response.ok) {
    throw new Error("Failed to add to favourites");
  }
  return response.json();
}

export async function removeFromFavourites(
  jobId: number,
  userId: number
): Promise<Job[]> {
  const response = await fetch(`${JOBS_API_BASE_URL}/jobs/favourites`, {
    method: "DELETE",
    body: JSON.stringify({ jobId, userId }),
  });
  if (!response.ok) {
    throw new Error("Failed to remove from favourites");
  }
  return response.json();
}
