"use client";

import { JobCard } from "@/components/ui/job-card";
import { SearchHeader } from "@/components/ui/search-header";
import { cn } from "@/lib/utils";
import { DetailedJobCard } from "@/components/ui/detailed-job-card";
import { Job } from "@/types";
import { Confetti } from "@/components/ui/confetti";
import { useConfetti } from "@/hooks/use-confetti";
import { toast } from "@/hooks/use-toast";
import { useFavourites } from "@/hooks/use-favourites";
import { useFavouritesSearch } from "./hooks/use-favourites-search";

const Favourites = ({
  initialFavouriteJobs,
  initialFavouriteJobIds,
}: {
  initialFavouriteJobs: Job[];
  initialFavouriteJobIds: number[];
}) => {
  const { favouriteJobIds, toggleFavourite } = useFavourites({
    initialFavouriteJobIds,
  });

  const {
    filteredJobs,
    selectedJob,
    setSelectedJob,
    setSearchValue,
    searchValue,
  } = useFavouritesSearch({
    initialFavouriteJobs,
    favouriteJobIds,
  });
  const { isVisible, trigger } = useConfetti({ duration: 7000 });

  return (
    <div className="relative container mx-auto px-4 pt-12 space-y-12 h-screen overflow-hidden">
      <SearchHeader
        searchValue={searchValue}
        onSearch={setSearchValue}
        onClearSearch={() => setSearchValue("")}
      />

      {
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-[calc(100vh-20rem)]">
          <div
            className={cn(
              "overflow-y-auto space-y-4 pr-4",
              "scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent"
            )}
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  title={job.job_title}
                  description={job.description}
                  company={job.company}
                  isFavorite={favouriteJobIds.some((id) => id === job.id)}
                  onFavorite={() => toggleFavourite(job.id)}
                  onClick={() => setSelectedJob(job)}
                  isSelected={selectedJob?.id === job.id}
                />
              ))
            ) : (
              <div className="text-center rounded-lg border border-muted p-8 bg-card">
                <p className="text-muted-foreground">No favourite jobs found</p>
              </div>
            )}
          </div>

          <div className="hidden lg:block relative">
            <div className="sticky top-8">
              {selectedJob ? (
                <DetailedJobCard
                  title={selectedJob.job_title}
                  description={selectedJob.description}
                  company={selectedJob.company}
                  isFavorite={favouriteJobIds.some(
                    (id) => id === selectedJob.id
                  )}
                  onFavorite={() => toggleFavourite(selectedJob.id)}
                  onApply={() => trigger()}
                />
              ) : (
                <div className="rounded-lg border border-muted p-8 bg-card text-center">
                  <p className="text-muted-foreground">
                    Select a job to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      }
      <Confetti isVisible={isVisible} />
    </div>
  );
};

export default Favourites;
