import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

type Props = {
  items: BreadcrumbItem[];
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pursethetic.com";

function absoluteUrl(href: string) {
  return new URL(href, siteUrl).toString();
}

export default function BreadcrumbsNav({ items }: Props) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.href}-${item.label}`} className="flex items-center gap-2" itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              {index > 0 && <span aria-hidden="true" className="text-border/80">/</span>}
              {isLast ? (
                <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1 font-medium text-foreground shadow-sm" itemProp="name">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition hover:text-foreground" itemProp="item">
                  <span className="rounded-full border border-transparent px-3 py-1" itemProp="name">
                    {item.label}
                  </span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
