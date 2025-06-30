import { useState } from 'react'

import { Box, Modal } from '@mui/material'

import { Button } from '../Button'

import { Container, DataTable, Title } from './styles'

import { ActionButton } from './components/ActionButton'
import { useTheme } from 'styled-components'
import { AddNewData } from '../AddNewData'

export function Datagrid() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const theme = useTheme()

  return (
    <>
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

          <Button onClick={handleOpen} />
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
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          backdropFilter: 'blur(2px)',
          backgroundColor: 'rgb(0, 0, 0, 0.65)',
        }}
      >
        <Box
          sx={{
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '8px',
            padding: '28px 28px 16px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            maxWidth: '838px',
            transform: 'translate(-50%, -50%)',
            bgcolor: theme.white,
          }}
        >
          <AddNewData onClose={handleClose} />
        </Box>
      </Modal>
    </>
  )
}
