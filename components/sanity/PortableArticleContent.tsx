import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from "@portabletext/react";
import type { Image as SanityImage } from "sanity";
import { urlForImage } from "@/sanity/lib/image";
import type { ArticleContent, PortableTextBlock } from "@/data/newsData";

type SanityImageValue = {
  _type?: "image";
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
  caption?: string;
};

function isPortableText(value: ArticleContent): value is PortableTextBlock[] {
  return Array.isArray(value);
}

function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function renderLegacyText(content: string) {
  if (looksLikeHtml(content)) {
    return (
      <div
        className="article-prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const paragraphs = content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="article-prose">
      {paragraphs.map((paragraph, index) => (
        <p key={`${paragraph.slice(0, 24)}-${index}`}>
          {paragraph.split(/\n/).map((line, lineIndex) => (
            <span key={`${line.slice(0, 24)}-${lineIndex}`}>
              {lineIndex > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({
      children,
      value,
    }: PortableTextMarkComponentProps<{ _type: "link"; href?: string }>) => {
      const href = value?.href ?? "#";
      const isExternal = /^https?:\/\//i.test(href);

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImageValue }) => {
      if (!value?.asset) return null;

      const imageUrl = urlForImage(value as SanityImage)
        .width(1200)
        .quality(90)
        .url();
      const alt = value.alt || value.caption || "";

      return (
        <figure>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
            <Image
              src={imageUrl}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              className="object-cover"
            />
          </div>
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      );
    },
  },
};

export default function PortableArticleContent({
  content,
}: {
  content: ArticleContent;
}) {
  if (isPortableText(content)) {
    return (
      <div className="article-prose">
        <PortableText value={content} components={portableTextComponents} />
      </div>
    );
  }

  return renderLegacyText(content);
}
