/* eslint-disable @next/next/no-img-element */

interface MediaContainerProps {
  src: string;
  alt?: string;
  type?: "image" | "video";
  className?: string;
}

export function MediaContainer({
  src,
  alt = "",
  type = "image",
  className = "",
}: MediaContainerProps) {
  return (
    <div className={`border border-border bg-card shadow-sm ring-1 ring-border/40 w-full h-[180px] sm:h-60 md:h-[300px] rounded-xl overflow-hidden flex items-center justify-center ${className}`}>
      {type === "image" ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center max-w-full max-h-full"
        />
      ) : (
        <video
          src={src}
          className="w-full h-full object-cover object-center max-w-full max-h-full"
          controls
        />
      )}
    </div>
  );
}

