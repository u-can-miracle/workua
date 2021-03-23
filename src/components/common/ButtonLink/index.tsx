import { Link } from "react-router-dom"

import Button, { IProps as IButtonProps } from 'components/common/Button'

interface IProps extends IButtonProps {
  to: string
}

const ButtonLink = (props: IProps) => (
  <Link
    to={props.to}
  >
    <Button
      {...props}
    />
  </Link>
)

export default ButtonLink
