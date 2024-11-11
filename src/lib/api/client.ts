"use client";

/**
 * This file contains API functions that should only be used in client-side code.
 * These functions make requests to the Next.js API routes, which in turn communicate with the backend API.
 */

import { JobsResponse, Job } from "@/types";

export async function getJobs(page: number = 0): Promise<JobsResponse> {
  const response = await fetch(`/api/jobs?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
}

export async function searchJobs(jobTitle: string): Promise<Job[]> {
  const response = await fetch(`/api/jobs/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobTitle }),
  });
  if (!response.ok) {
    throw new Error("Failed to search jobs");
  }
  return response.json();
}

export async function addToFavourites(jobId: number): Promise<number[]> {
  const response = await fetch(`/api/favourites`, {
    method: "POST",
    body: JSON.stringify({ jobId }),
  });
  if (!response.ok) {
    throw new Error("Failed to add to favourites");
  }
  return response.json();
}

export async function removeFromFavourites(jobId: number): Promise<number[]> {
  const response = await fetch(`/api/favourites`, {
    method: "DELETE",
    body: JSON.stringify({ jobId }),
  });
  if (!response.ok) {
    throw new Error("Failed to remove from favourites");
  }
  return response.json();
}
