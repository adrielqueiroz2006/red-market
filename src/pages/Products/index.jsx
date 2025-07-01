import { MainLayout } from '../../layouts/MainLayout'

import { Datagrid } from '../../components/Datagrid'
import { Button } from '../../components/Button'

import { Box } from '@mui/material'

export function Products() {
  return (
    <MainLayout
      selectedPage="Produtos"
      children={
        <>
          <Datagrid
            tableName={'Produtos'}
            fieldsArray={[
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
