import { MainLayout } from '../../layouts/MainLayout'

import { Datagrid } from '../../components/Datagrid'
import { Button } from '../../components/Button'

import { Box } from '@mui/material'

export function Orders() {
  return (
    <MainLayout
      selectedPage="Pedidos"
      children={
        <>
          <Datagrid
            tableName={'Pedidos'}
            fieldsArray={[
              {
                name: 'Produtos',
                collectionName: 'Produtos',
              },
              {
                name: 'Clientes',
                collectionName: 'Clientes',
              },
              {
                name: 'Quantidade',
                icon: 'Hash',
                text: 'Digite a quantidade',
              },
              {
                name: 'Valor',
                icon: 'MoneyWavy',
                text: 'Digite telefone do cliente',
              },
            ]}
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4rem',
              marginTop: '4rem',
            }}
          >
            <Button Icon="FilePdf" Text="Exportar PDF" Size={232} />
            <Button
              Icon="MicrosoftExcelLogo"
              Text="Exportar Excel"
              Size={232}
            />
          </Box>
        </>
      }
    />
  )
}
