import {
  ActionLink,
  Panel,
  PanelBody,
  PanelFooter,
  RHYTHM,
  Section,
  StatusBadge,
  TimelineItem,
} from "@/components/ui";
import { activities } from "@/data";

export default function ActivitiesSection() {
  return (
    <Section
      id="activities"
      eyebrow="Community"
      index={6}
      title="Activities & leadership"
      count={activities.length}
    >
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
            <Panel key={activity.id} className={RHYTHM.block}>
              <TimelineItem
                align="start"
                logoUrl={activity.logoUrl}
                title={activity.title}
                subtitle={`${activity.organization} · ${activity.role}`}
                date={period}
                badges={isOngoing && <StatusBadge label="Ongoing" />}
              />

              {(activity.description || activity.href) && (
                <PanelBody>
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
    </Section>
  );
}
