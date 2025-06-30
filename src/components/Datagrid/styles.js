import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  max-height: 756px;
  width: calc(100% - 1.25rem);

  border-radius: 8px;

  padding-top: 2.25rem;

  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);

  overflow: auto;
`

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme['gray-600']};
`

export const DataTable = styled.div`
  overflow: auto;
  margin-top: 1.25rem;

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;

    th {
      background-color: ${(props) => props.theme['gray-200']};
      padding: 0.68rem 0;
      text-align: left;
      color: ${(props) => props.theme['gray-800']};
      font-size: 1.25rem;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      padding: 1.25rem 0;
      text-align: left;
      color: ${(props) => props.theme['gray-600']};
      font-size: 1.125rem;

      &:first-child {
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`
