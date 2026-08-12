import {
  ActionLink,
  LogoTile,
  Panel,
  PanelBody,
  PanelFooter,
  PanelRow,
  SectionHeading,
  StatusDot,
} from "@/components/ui";
import { activities } from "@/data";

export default function ActivitiesSection() {
  return (
    <div className="flex w-full flex-col gap-6">
      <SectionHeading
        eyebrow="Community"
        title="Activities & leadership"
        anchor="activities"
        count={activities.length}
      />

      <div className="flex w-full flex-col gap-2">
        {activities.map((activity) => {
          const period =
            activity.start === activity.end
              ? activity.start
              : `${activity.start} — ${activity.end}`;
          const isOngoing =
            activity.end === "Present" ||
            activity.end === String(new Date().getFullYear());

          return (
            <Panel key={activity.id} className="flex flex-col gap-4">
              <PanelRow className="items-start">
                <LogoTile src={activity.logoUrl} alt={activity.title} />

                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-medium text-foreground">
                      {activity.title}
                    </span>
                    {isOngoing && <StatusDot label="Ongoing" />}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.organization}
                    <span aria-hidden className="mx-1.5 text-border">
                      /
                    </span>
                    {activity.role}
                  </span>
                </div>

                <span className="hidden flex-none text-2xs tabular-nums text-muted-foreground sm:inline">
                  {period}
                </span>
              </PanelRow>

              {(activity.description || activity.href) && (
                <PanelBody>
                  <span className="text-2xs tabular-nums text-muted-foreground sm:hidden">
                    {period}
                  </span>

                  {activity.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {activity.description}
                    </p>
                  )}

                  {activity.href && (
                    <PanelFooter>
                      <ActionLink href={activity.href}>Website</ActionLink>
                    </PanelFooter>
                  )}
                </PanelBody>
              )}
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
