import { BlogListSkeleton } from "@/components/skeletons";
import { PageContainer } from "@/components/ui";

export default function Loading() {
  return (
    <PageContainer width="prose">
      <BlogListSkeleton />
    </PageContainer>
  );
}
