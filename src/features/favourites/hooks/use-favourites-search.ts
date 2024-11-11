import { useState, useMemo } from "react";
import { Job } from "@/types";

export const useFavouritesSearch = ({
  initialFavouriteJobs,
  favouriteJobIds,
}: {
  initialFavouriteJobs: Job[];
  favouriteJobIds: number[];
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(
    initialFavouriteJobs[0] ?? null
  );
  const [favouriteJobs, setFavouriteJobs] = useState(initialFavouriteJobs);

  const filteredJobs = useMemo(() => {
    // First filter by favourite status
    const favouritedJobs = favouriteJobs.filter((job) =>
      favouriteJobIds.includes(job.id)
    );

    // If no search term, return all favourited jobs
    if (!searchValue.trim()) return favouritedJobs;

    // Then filter by search term
    const searchTerm = searchValue.toLowerCase();
    return favouritedJobs.filter(
      (job) =>
        job.job_title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm)
    );
  }, [searchValue, favouriteJobs, favouriteJobIds]);

  return {
    searchValue,
    setSearchValue,
    filteredJobs,
    selectedJob,
    setSelectedJob,
  };
};
