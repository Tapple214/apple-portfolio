import Image from "next/image";
import { withBasePath } from "../utils/basePath";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: OptimizedImageProps) {
  // Extract base name and extension
  const pathParts = src.split("/");
  const fileName = pathParts[pathParts.length - 1];
  const baseName = fileName.split(".")[0];
  const extension = fileName.split(".").pop();

  // Generate optimized image sources
  const generateSrcSet = (format: string) => {
    const sizes = ["-sm", "-md", "-lg", "-xl"];
    return sizes
      .map(
        (size) =>
          `${withBasePath(`/images/optimized/${baseName}${size}.${format}`)} ${
            size === "-sm"
              ? "400w"
              : size === "-md"
              ? "800w"
              : size === "-lg"
              ? "1200w"
              : "1920w"
          }`
      )
      .join(", ");
  };

  return (
    <picture>
      <source srcSet={generateSrcSet("avif")} type="image/avif" sizes={sizes} />
      <source srcSet={generateSrcSet("webp")} type="image/webp" sizes={sizes} />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
    </picture>
  );
}
