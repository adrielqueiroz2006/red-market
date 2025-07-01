import { MainLayout } from '../../layouts/MainLayout'

import { Datagrid } from '../../components/Datagrid'
import { Button } from '../../components/Button'

import { Box } from '@mui/material'

export function Customers() {
  return (
    <MainLayout
      selectedPage="Clientes"
      children={
        <>
          <Datagrid
            tableName={'Clientes'}
            fieldsArray={[
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
