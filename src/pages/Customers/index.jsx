import { MainLayout } from '../../layouts/MainLayout'

import { Datagrid } from '../../components/Datagrid'
import { Button } from '../../components/Button'

import { Box } from '@mui/material'

import { handleExport } from '../../utils/exportDatagrid'

export function Customers() {
  const table = 'Clientes'

  const fields = [
    {
      name: 'Nome',
      icon: 'User',
      text: 'Digite nome do cliente',
    },
    {
      name: 'CPFCNPJ',
      icon: 'IdentificationCard',
      text: 'Digite o CPF ou CNPJ do cliente',
    },
    {
      name: 'Endereço',
      icon: 'House',
      text: 'Digite endereço do cliente',
    },
    {
      name: 'Telefone',
      icon: 'Phone',
      text: 'Digite telefone do cliente',
    },
  ]

  return (
    <MainLayout
      selectedPage={table}
      children={
        <>
          <Datagrid tableName={table} fieldsArray={fields} />

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
