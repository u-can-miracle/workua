import classnames from 'classnames'

import { IChildren } from 'interfaces'

import styles from './styles.module.scss'

interface IProps extends IChildren {
  className?: string
}

const ContentWrapper = (props: IProps) => (
  <div className={classnames(styles.content, props.className)}>
    {props.children}
  </div>
)

export default ContentWrapper
