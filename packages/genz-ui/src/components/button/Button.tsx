import classNames from "classnames";
import style from "./button.module.css";

interface Props extends React.ComponentProps<"button"> {
  primary?: boolean;
  children?: React.ReactNode;
}

const Button = (props: Props) => {
  return (
    <button className={classNames(style.btn, { [style.primary]: props.primary })} {...props}>
      {props.children}
    </button>
  );
};
export default Button;
