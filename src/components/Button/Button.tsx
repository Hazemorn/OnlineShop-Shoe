import s from "./Button.module.scss";

interface ButtonProps {
  title: string;
  max_width?: string;
  bgColor?: string;
  color?: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

const Button = ({
  title,
  bgColor = "var(--white)",
  max_width = "280px",
  color = "var(--black)",
  onClick,
  isDisabled = false,
}: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={s.button__template}
      style={{
        backgroundColor: bgColor,
        maxWidth: max_width,
        borderColor: color,
        color: color,
      }}
    >
      {title}
    </button>
  );
};

export default Button;
