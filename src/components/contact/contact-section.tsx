"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/common/theme-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { getAllSocialLinks } from "@/data";
import { HomeIcon, PenLine } from "lucide-react";

interface ContactSectionProps {
  delay?: number;
}

const BLUR_FADE_DELAY = 0.04;

export function ContactSection({
  delay = BLUR_FADE_DELAY * 16,
}: ContactSectionProps) {
  const allSocialLinks = getAllSocialLinks();
  const twitterUrl = allSocialLinks.find((link) => link.name === "X")?.url;

  return (
    <section id="contact">
      <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
        <div className="space-y-3">
          <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
            Contact
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Want to chat? Just shoot me a dm{" "}
            <Link
              href={twitterUrl || "#"}
              className="text-blue-500 hover:underline"
              target="_blank"
            >
              with a direct question on twitter
            </Link>{" "}
            and I&apos;ll respond whenever I can. I will ignore all soliciting.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ContactDock() {
  const allSocialLinks = getAllSocialLinks();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
        <TooltipProvider>
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  aria-label="Home"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full"
                  )}
                >
                  <HomeIcon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/blog"
                  aria-label="Blog"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full"
                  )}
                >
                  <PenLine className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Blog</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <Separator orientation="vertical" className="h-full" />
          {allSocialLinks.map((social) => (
            <DockIcon key={social.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    aria-label={social.name}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                    target="_blank"
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full py-2" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </TooltipProvider>
      </Dock>
    </div>
  );
}

export default ContactSection;
