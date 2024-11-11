export interface Job {
  id: number;
  job_title: string;
  description: string;
  company: string;
}

export interface JobsResponse {
  pagination: {
    currentPage: number;
    firstPage: number;
    lastPage: number;
  };
  data: Job[];
}

export interface SearchJobsResponse {
  jobIds: number[];
  searchQuery: {
    jobTitle: string;
  };
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  salt: string;
}

export interface Favorite {
  id: number;
  userId: number;
  jobId: number;
  createdAt: string;
}
