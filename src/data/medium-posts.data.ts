/**
 * External writing — Medium posts.
 * Sorted descending by publish date.
 */

export interface MediumPost {
  title: string;
  /** ISO date string — used for sort + display via formatDate. */
  publishedAt: string;
  /** Fully qualified medium.com URL. */
  url: string;
  excerpt?: string;
  /** Optional "N min read" label. */
  readingTime?: string;
}

export const mediumPosts: readonly MediumPost[] = [
  {
    title: "Mastering APIs in Software Development",
    publishedAt: "2025-04-20",
    url: "https://ifham-mohamed.medium.com/mastering-apis-in-software-development-a8252ea34d45",
    excerpt:
      "Notes on consistent API design and the practices that compound over time.",
  },
  {
    title:
      "Master React: The Ultimate Guide for Beginners on How to Develop Your First React App",
    publishedAt: "2024-05-28",
    url: "https://ifham-mohamed.medium.com/master-react-the-ultimate-guide-for-beginners-on-how-to-develop-your-first-react-app-13b52d67f4fe",
    excerpt: "An end-to-end primer for shipping your first React app.",
  },
  {
    title: "Securing Your Web Projects with .env Files",
    publishedAt: "2024-05-16",
    url: "https://ifham-mohamed.medium.com/securing-your-web-projects-with-env-files-97a7c35a8858",
    excerpt:
      "Practical patterns for keeping secrets out of source control on web projects.",
  },
] as const;

export const getRecentMediumPosts = (count: number = 2): readonly MediumPost[] =>
  mediumPosts.slice(0, count);

export default mediumPosts;
