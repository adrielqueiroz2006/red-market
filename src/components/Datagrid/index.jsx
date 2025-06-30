import { Box } from '@mui/material'

import { Button } from '../Button'

import { Container, DataTable, Title } from './styles'
import { ActionButton } from './components/ActionButton'

export function Datagrid() {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginLeft: 2,
        }}
      >
        <Title>Clientes</Title>

        <Button />
      </Box>

      <DataTable>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>Endereço</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      display: 'flex',
                      gap: '10px',
                    }}
                  >
                    <ActionButton Icon={'Trash'} />
                    <ActionButton Icon={'PencilSimple'} />
                  </div>
                  <div>Adriel Queiroz</div>
                </div>
              </td>
              <td>123.456.789-10</td>
              <td>R. Xxxxxx Xxxxxx, 123</td>
              <td>(12) 34567-8910</td>
            </tr>
          </tbody>
        </table>
      </DataTable>
    </Container>
  )
}
