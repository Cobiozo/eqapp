import clsx from "clsx";
import { useMemo } from "react";
import { Form, Link } from "@remix-run/react";
import { IconType } from "react-icons/lib";

export type Props = {
  children?: React.ReactNode;
  variant?: "primary" | "info" | "white";
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

  const variantClasses = useMemo(() => {
    switch(variant) {
      case "primary":
        return "bg-black text-light border-black rounded-[40px]";
      case "white": 
        return "bg-white text-black border-black rounded-[40px]";
      case "info":
        return "bg-blue-500 text-light border-blue-500 border-black rounded-[40px]";
      default:
        return "bg-light text-black border-black rounded-[40px]";
    }
  }, [variant]);

  const IconComponent = icon ? icon : () => null;

  return (
    <button
      className={clsx(
        "block relative border transition-colors",
        size === "xs" && "px-1 py-1 my-4 text-xs",
        size === "sm" && "px-4 py-2 my-4 text-sm",
        size === "md" && "px-6 py-2 my-4",
        size === "lg" && "px-8 py-3",
        disabled && "opacity-50 cursor-not-allowed",
        hover && "hover:shadow-sm hover:before:rotate-180",
        variantClasses,
        className
      )}
      type={type}
      disabled={disabled}
      onClick={(onClick && !disabled) ? onClick : () => {}}
    >
      <div className={clsx(
        "relative z-1",
        "flex items-center justify-center"
      )}>
        {icon && (
          <IconComponent
            className={clsx(
              children && "mr-2",
            )}
            size={iconSize || "1.5em"}
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

  return (
    <Link to={to || ""}>
      <ButtonItem {...otherProps} />
    </Link>
  );

}
