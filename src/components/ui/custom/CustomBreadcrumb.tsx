import {
  Breadcrumb as BaseBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { Link } from "react-router";

const Breadcrumb = ({
  className,
  items,
}: {
  className?: any;
  items: {
    label?: string;
    href?: string;
    url?: string;
    text?: string;
    onClick?: () => void;
  }[];
}) => {
  return (
    <BaseBreadcrumb className={cn(className)}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const { label, href, url, text, onClick } = item;
          const displayLabel = label || text || "";
          const linkHref = href || url;

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {onClick ? (
                  <BreadcrumbPage className="cursor-pointer" onClick={onClick}>
                    {displayLabel}
                  </BreadcrumbPage>
                ) : linkHref ? (
                  <BreadcrumbLink asChild>
                    <Link to={linkHref}>{displayLabel}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{displayLabel}</BreadcrumbPage>
                )}
              </BreadcrumbItem>

              {index < items.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BaseBreadcrumb>
  );
};

export default Breadcrumb;
