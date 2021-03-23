import { useState } from 'react'
import { AutoComplete } from 'antd';
import { useDebounce } from 'react-use'

import { ICity, ISelectParams } from 'interfaces'

const { Option } = AutoComplete;

interface IProps {
  className?: string
  onFetch: (value: string) => Promise<any>
  onSelect: (params: ISelectParams) => void
  handleBlur: () => void
  delay?: number
}

const Autocomplete = (props: IProps) => {
  const {
    className,
    delay = 1500,
    onFetch,
    onSelect,
    handleBlur,
  } = props

  const [value, setValue] = useState('');
  const [items, setItems] = useState([])
  const [, cancel] = useDebounce(
    () => {
      onFetch(value)
        .then(response => {
          setItems(response)
        })
    },
    delay,
    [value]
  )

  function handleSelect(value: string, option: any) {
    setValue(value)
    onSelect({
      id: option.key,
      name: value,
    })
    setTimeout(cancel, 500)
  }

  return (
    <AutoComplete
      className={className}
      allowClear
      style={{ width: 200 }}
      value={value}
      onSearch={(search: string) => setValue(search)}
      onSelect={handleSelect}
      onBlur={handleBlur}
    >
      {items.map((city: ICity) => (
        <Option key={city.id} value={city.name}>
          {city.name}
        </Option>
      ))}
    </AutoComplete>
  )
}

export default Autocomplete
