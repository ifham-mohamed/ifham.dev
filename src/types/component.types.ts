import { ReactNode } from "react";

// ============================================
// Common Component Props
// ============================================
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface IconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
}

// ============================================
// Section Component Props
// ============================================
export interface SectionProps extends BaseComponentProps {
  id?: string;
  title?: string;
  subtitle?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

// ============================================
// Card Component Props
// ============================================
export interface CardProps extends BaseComponentProps {
  href?: string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
}

// ============================================
// List Component Props
// ============================================
export interface ListProps<T> extends BaseComponentProps {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  emptyMessage?: string;
}

// ============================================
// Timeline Component Props
// ============================================
export interface TimelineItemProps {
  title: string;
  subtitle?: string;
  date: string;
  description?: string;
  icon?: ReactNode;
  logoUrl?: string;
}

// ============================================
// Badge/Tag Component Props
// ============================================
export interface BadgeProps extends BaseComponentProps {
  variant?: "default" | "secondary" | "outline" | "destructive";
}

// ============================================
// Animation Props
// ============================================
export interface AnimationProps {
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
}

// ============================================
// Form Component Props
// ============================================
export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
