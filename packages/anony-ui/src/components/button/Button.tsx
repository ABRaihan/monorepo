import { StyledButton } from "./Button.styles";

interface Props extends React.ComponentProps<"button"> {
  children?: React.ReactNode;
}

const Button = ({ children, ...rest }: Props) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};
export default Button;
