import { ProjectsGridSkeleton } from "@/components/skeletons";
import { PageContainer } from "@/components/ui";

export default function Loading() {
  return (
    <PageContainer width="wide">
      <ProjectsGridSkeleton />
    </PageContainer>
  );
}
