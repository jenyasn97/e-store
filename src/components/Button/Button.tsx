import { Link } from "react-router-dom";
import "./Button.scss";

type ButtonVariant = "white-stroke" | "black-stroke" | "fill-small";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "default" | "small";
  className?: string;
  to?: string;
}

export default function Button({
  children,
  variant = "black-stroke",
  size = "default",
  className = "",
  to,
}: ButtonProps) {
  const classes = `button button--${variant} button--${size} ${className}`.trim();
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
