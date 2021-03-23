import classnames from 'classnames'

import styles from './styles.module.scss'

export enum Headings {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
};

interface IProps {
  className?: string
  title?: string
  headingLevel: Headings
  text: string
  symbol?: string
  symbolStyle?: 'danger'
}

const Heading = (props: IProps) => {
  const {
    headingLevel,
    text,
    className,
    title,
    symbol,
    symbolStyle,
  } = props
  const HeadingTag = Headings[headingLevel]

  return (
    <HeadingTag
      className={classnames(className, styles[HeadingTag])}
      title={title}
    >
      {text}{symbol && (
        <span className={symbolStyle && styles[symbolStyle]}>{symbol}</span>
      )}
    </HeadingTag>
  )
}

export default Heading
