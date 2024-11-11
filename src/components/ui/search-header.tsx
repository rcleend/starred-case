import { Search } from '@/components/ui/search';
import { JobTabs } from '@/components/ui/job-tabs';

interface SearchHeaderProps {
  searchValue: string;
  onSearch: (value: string) => void;
  onClearSearch: () => void;
}

export function SearchHeader({
  searchValue,
  onSearch,
  onClearSearch,
}: SearchHeaderProps) {
  return (
    <header className="space-y-8 text-center max-w-3xl mx-auto">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
          Find Your Next Role
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Browse through opportunities that match your experience and interests
        </p>
        <div className="w-full max-w-2xl mx-auto">
          <Search 
            placeholder="Search jobs..." 
            onChange={onSearch}
            onClear={onClearSearch}
            value={searchValue}
          />
        </div>
      </div>
      <JobTabs />
    </header>
  );
} 