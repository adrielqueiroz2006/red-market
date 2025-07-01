import { MainLayout } from '../../layouts/MainLayout'

import { Datagrid } from '../../components/Datagrid'
import { Button } from '../../components/Button'

import { Box } from '@mui/material'

import { handleExport } from '../../utils/exportDatagrid'

export function Products() {
  const table = 'Produtos'

  const fields = [
    {
      name: 'Nome',
      icon: 'NotePencil',
      text: 'Digite nome do produto',
    },
    {
      name: 'Preço',
      icon: 'MoneyWavy',
      text: 'Digite o preço do produto',
    },
    {
      name: 'Categoria',
      icon: 'List',
      text: 'Digite a categoria do produto',
    },
    {
      name: 'Estoque',
      icon: 'Package',
      text: 'Digite o estoque do produto',
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
