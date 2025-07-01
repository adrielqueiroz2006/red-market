import { Select } from './styles'

export function InputSelect({ children, ...rest }) {
  return <Select {...rest}>{children}</Select>
}
