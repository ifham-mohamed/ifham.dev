import { ActionLink,
  PageContainer,
} from "@/components/ui";

export default function NotFound() {
  return (
    <PageContainer width="prose">
      <main className="flex min-h-[50vh] flex-col justify-center gap-5">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-2xs uppercase tracking-[0.14em] text-muted-foreground">
            404
          </span>
          <h1 className="text-2xl font-semibold text-foreground">
            This page doesn&apos;t exist
          </h1>
          <p className="max-w-[52ch] text-sm text-muted-foreground">
            The link may be out of date, or the page has moved.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <ActionLink href="/" variant="primary" external={false}>
            Home
          </ActionLink>
          <ActionLink href="/projects" external={false}>
            Projects
          </ActionLink>
          <ActionLink href="/blog" external={false}>
            Blog
          </ActionLink>
        </div>
      </main>
    </PageContainer>
  );
}
