"use client"

import React from "react"

// Type definitions for Strapi blocks content
export type BlocksContent = Array<
  | {
      type: "paragraph"
      children: Array<TextBlock | ModifierBlock>
    }
  | {
      type: "heading"
      level: 1 | 2 | 3 | 4 | 5 | 6
      children: Array<TextBlock | ModifierBlock>
    }
  | {
      type: "list"
      format: "ordered" | "unordered"
      children: Array<ListItemBlock>
    }
  | {
      type: "quote"
      children: Array<TextBlock | ModifierBlock>
    }
  | {
      type: "code"
      children: Array<TextBlock>
      plainText?: string
    }
  | {
      type: "image"
      image: {
        url: string
        alternativeText?: string
        width?: number
        height?: number
      }
    }
  | {
      type: "link"
      url: string
      children: Array<TextBlock | ModifierBlock>
    }
>

export interface TextBlock {
  type: "text"
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

export interface ModifierBlock {
  type: "bold" | "italic" | "underline" | "strikethrough" | "code"
  children: Array<TextBlock | ModifierBlock>
}

export interface ListItemBlock {
  type: "list-item"
  children: Array<TextBlock | ModifierBlock>
}

interface BlocksRendererProps {
  content: BlocksContent
}

function renderText(
  item: TextBlock | ModifierBlock | { type: string; children?: any[] }
): React.ReactNode {
  if (item.type === "text") {
    return item.text
  }

  const { children } = item as any
  const content = Array.isArray(children)
    ? children.map((child, idx) => (
        <React.Fragment key={idx}>{renderText(child)}</React.Fragment>
      ))
    : null

  switch (item.type) {
    case "bold":
      return <strong className="font-semibold">{content}</strong>
    case "italic":
      return <span className="italic">{content}</span>
    case "underline":
      return <span className="underline">{content}</span>
    case "strikethrough":
      return <span className="line-through">{content}</span>
    case "code":
      return (
        <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground/80">
          {content}
        </code>
      )
    default:
      return content
  }
}

function renderBlock(block: any, index: number): React.ReactNode {
  const children = Array.isArray(block.children)
    ? block.children.map((child: any, idx: number) => (
        <React.Fragment key={idx}>{renderText(child)}</React.Fragment>
      ))
    : null

  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={index}
          className="text-lg font-light text-foreground/70 leading-relaxed mb-6"
        >
          {children}
        </p>
      )

    case "heading":
      const headingClasses = {
        1: "text-4xl font-light tracking-tight mb-6 mt-8",
        2: "text-3xl font-light tracking-tight mb-5 mt-7",
        3: "text-2xl font-light tracking-tight mb-4 mt-6",
        4: "text-xl font-light tracking-tight mb-4 mt-5",
        5: "text-lg font-light tracking-tight mb-3 mt-4",
        6: "text-base font-light tracking-widest mb-3 mt-4",
      }
      const HeadingTag = `h${block.level}` as const
      return (
        <HeadingTag
          key={index}
          className={
            headingClasses[block.level as keyof typeof headingClasses] ||
            headingClasses[2]
          }
        >
          {children}
        </HeadingTag>
      )

    case "list":
      if (block.format === "ordered") {
        return (
          <ol key={index} className="list-decimal list-inside space-y-2 mb-6 ml-4">
            {block.children?.map((item: any, idx: number) => (
              <li key={idx} className="text-lg font-light text-foreground/70">
                {item.children?.map((child: any, childIdx: number) => (
                  <div key={childIdx}>{renderText(child)}</div>
                ))}
              </li>
            ))}
          </ol>
        )
      }
      return (
        <ul key={index} className="list-disc list-inside space-y-2 mb-6 ml-4">
          {block.children?.map((item: any, idx: number) => (
            <li key={idx} className="text-lg font-light text-foreground/70">
              {item.children?.map((child: any, childIdx: number) => (
                <div key={childIdx}>{renderText(child)}</div>
              ))}
            </li>
          ))}
        </ul>
      )

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-muted-foreground pl-6 py-2 mb-6 italic text-foreground/60"
        >
          {children}
        </blockquote>
      )

    case "code":
      return (
        <pre
          key={index}
          className="bg-muted p-4 rounded-lg overflow-x-auto mb-6 text-sm font-mono"
        >
          <code className="text-foreground/80">{children}</code>
        </pre>
      )

    case "image":
      return (
        <div key={index} className="my-8 rounded-lg overflow-hidden">
          <img
            src={block.image.url}
            alt={block.image.alternativeText || "Image"}
            className="w-full h-auto object-cover"
          />
        </div>
      )

    case "link":
      return (
        <a
          key={index}
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:opacity-60 transition underline"
        >
          {children}
        </a>
      )

    default:
      return null
  }
}

export default function StrapiBlocksRenderer({
  content,
}: BlocksRendererProps) {
  if (!content || !Array.isArray(content)) {
    return null
  }

  return <>{content.map((block, idx) => renderBlock(block, idx))}</>
}
