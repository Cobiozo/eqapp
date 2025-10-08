import clsx from "clsx";
import { useContext, useMemo } from "react";
import { Form, Link } from "@remix-run/react";
import type { IconType } from "react-icons/lib";
import { GlobalContext } from "~/root";

export type Props = {
  children?: React.ReactNode;
  variant?: "default" | "secondary" | "success" | "danger" | "primary" | "info" | "gold";
  className?: string;
  icon?: IconType;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  to?: string;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  method?: "post" | "delete" | "patch" | "put";
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  resourceId?: string;
  hover?: boolean;
  iconSize?: string;
  download?: boolean;
}

const ButtonItem = ({
  children = "",
  variant,
  className,
  icon,
  type,
  onClick,
  disabled,
  size = 'md',
  hover,
  iconSize,
}: Omit<Props, "to" | "method" | "onSubmit" | "resourceId">) => {
  const { isLogged } = useContext(GlobalContext);

  const variantClasses = useMemo(() => {
    switch(variant) {
      case "primary":
        return "bg-primary-lighter text-light border-primary-lighter";
      case "success":
        return "border-green-500 text-green-500";
      case "danger":
        return "bg-red-500 text-light border-red-500 dark:border-medium-darker";
      case "info":
        return "text-blue-500 border-blue-500";
      case "gold":
        return "border-gold text-gold";
      case "secondary":
        return "border-primary-lighter text-primary-lighter";
      default:
        return "bg-primary-lighter text-light border-primary-lighter";
    }
  }, [variant]);

  const IconComponent = icon ? icon : () => null;

  return (
    <button
      className={clsx(
        isLogged ? "rounded" : "rounded-3xl",
        "block relative border font-semibold transition-colors",
        size === "xs" && "px-1 py-1 my-4 text-xs",
        size === "sm" && "px-4 py-2 my-4 text-sm",
        size === "md" && "px-4 py-2 my-4",
        size === "lg" && "px-6 py-4 text-lg",
        disabled && "opacity-50 cursor-not-allowed",
        hover && "hover:shadow-sm hover:before:rotate-180",
        variantClasses,
        className
      )}
      disabled={disabled}
      type={type}
      onClick={(onClick && !disabled) ? onClick : () => {}}
    >
      <div className={clsx(
        "relative z-1",
        size === "lg" ? "block" : "flex items-center justify-center"
      )}>
        {icon && (
          <IconComponent
            className={clsx(
              children && "mr-2",
              size === "lg" && "mr-auto ml-auto text-3xl mb-4",
            )}
            size={iconSize || "1.3em"}
          />
        )}
        { children }
      </div>
    </button>
  )
}

export default function Button({
  to,
  method,
  onSubmit,
  resourceId,
  download,
  ...otherProps
}: Props) {

  if ((!to && !method) || otherProps.disabled)
    return <ButtonItem {...otherProps} />;
  if (method)
    return (
      <Form onSubmit={onSubmit} method="post">
        { resourceId && <input name="id" type="hidden" value={resourceId} /> }
        <input name="_method" type="hidden" value={method} />
        <ButtonItem {...otherProps} type="submit" />
      </Form>
    );
  
  if (to && download)
    return (
      <a
        href={to}
        download
        target="_blank"
        rel="noreferrer"
      >
        <ButtonItem {...otherProps} />
      </a>
    )

  return (
    <Link to={to || ""}>
      <ButtonItem {...otherProps} />
    </Link>
  );

}
