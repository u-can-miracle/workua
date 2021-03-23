import classnames from 'classnames'

import styles from './styles.module.scss'

export interface IProps {
  className?: string
  isLink?: boolean
  btnTitle: string
  style: 'primary' | 'success' | 'error'
  type?: "button" | "submit" | "reset"
  onClick?: (e: any) => void
}

const Button = (props: IProps) => {
  const {
    className,
    isLink = false,
    btnTitle,
    style,
    type,
    onClick = () => {}
  } = props

  return (
    <button
      className={classnames(
        styles.button,
        styles[style],
        {
          [styles.link]: isLink,
        },
        className,
      )}
      type={type}
      onClick={onClick}
    >
      {btnTitle}
    </button>
  )
}

export default Button
