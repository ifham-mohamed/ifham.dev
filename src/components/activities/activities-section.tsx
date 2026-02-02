"use client";

import { ActivityCard } from "@/components/activities/activity-card";
import { activities, hackathons } from "@/data";
import BlurFade from "../magicui/blur-fade";
import type { Activity } from "@/types";

interface ActivitiesSectionProps {
  delay?: number;
}

const BLUR_FADE_DELAY = 0.04;

const mapActivityToCard = (activity: Activity) => {
  const dates =
    activity.start === activity.end
      ? activity.start
      : `${activity.start} - ${activity.end}`;
  const location = `${activity.organization} | ${activity.role}`;
  const links = activity.href
    ? [{ title: "Website", href: activity.href }]
    : undefined;

  return {
    title: activity.title,
    description: activity.description ?? "",
    location,
    dates,
    image: activity.logoUrl,
    links,
  };
};

export function ActivitiesSection({
  delay = BLUR_FADE_DELAY * 13,
}: ActivitiesSectionProps) {
  return (
    <section id="activities">
      <div className="space-y-12 w-full py-12">
        <BlurFade delay={delay}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Activities
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Community & Events
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I actively participate in tech communities, hackathons, and
                events. Here are some of my contributions to the community.
              </p>
            </div>
          </div>
        </BlurFade>
        <div className="mx-auto max-w-[800px]">
          <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
            {activities.map((activity, id) => (
              <BlurFade key={activity.id} delay={delay + id * 0.05}>
                <ActivityCard {...mapActivityToCard(activity)} />
              </BlurFade>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function HackathonsSection({
  delay = BLUR_FADE_DELAY * 15,
}: ActivitiesSectionProps) {
  return (
    <section id="hackathons">
      <div className="space-y-12 w-full py-12">
        <BlurFade delay={delay}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Hackathons
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                I like building things
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                During my time at university, I attended {hackathons.length}+
                hackathons. People from around the country would come together
                and build incredible things in 2-3 days. It was eye-opening to
                see the endless possibilities brought to life by a group of
                motivated and passionate individuals.
              </p>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={delay + 0.1}>
          <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
            {hackathons.map((hackathon, id) => (
              <BlurFade key={hackathon.id} delay={delay + id * 0.05}>
                <ActivityCard {...mapActivityToCard(hackathon)} />
              </BlurFade>
            ))}
          </ul>
        </BlurFade>
      </div>
    </section>
  );
}

export default ActivitiesSection;
