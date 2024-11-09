'use server';

import { JobsResponse, Job, SearchJobsResponse } from "@/types";

/**
 * This file contains API functions that should only be used in server-side code.
 * These functions make requests to the backend API directly.
 */

const API_BASE_URL = 'https://yon9jygrt9.execute-api.eu-west-1.amazonaws.com/prod';

export async function getJobs(page: number): Promise<JobsResponse> {
  const response = await fetch(`${API_BASE_URL}/jobs?page=${page}`);
  console.log('response', response);
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return response.json();
}

export async function getJobDetails(jobId: number): Promise<Job> {
  const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch job details');
  }
  return response.json();
}

export async function getJobDetailsForSearch(jobIds: number[]): Promise<Job[]> {
  const jobDetails = await Promise.all(
    jobIds.map(id => getJobDetails(id))
  );
  return jobDetails;
} 

export async function getJobRecommendations(body: { jobTitle: string }): Promise<SearchJobsResponse> {
  const response = await fetch(`${API_BASE_URL}/jobs/recommendations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return response.json();
}