import { MainLayout } from '../../layouts/MainLayout'

import { Datagrid } from '../../components/Datagrid'
import { Button } from '../../components/Button'

import { Box } from '@mui/material'

import { handleExport } from '../../utils/exportDatagrid'

export function Orders() {
  const table = 'Pedidos'

  const fields = [
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
  ]

  return (
    <MainLayout
      selectedPage={table}
      children={
        <>
          <Datagrid tableName={'Pedidos'} fieldsArray={fields} />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4rem',
              marginTop: '4rem',
            }}
          >
            <Button
              Icon="FilePdf"
              Text="Exportar PDF"
              Size={232}
              onClick={() => handleExport(table, fields, 'pdf')}
            />
            <Button
              Icon="MicrosoftExcelLogo"
              Text="Exportar Excel"
              Size={232}
              onClick={() => handleExport(table, fields, 'excel')}
            />
          </Box>
        </>
      }
    />
  )
}
