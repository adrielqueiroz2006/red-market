import { Box, Grid } from '@mui/material'

import { Subtitle, Title } from './styles'
import { Button } from '../Button'

import { WarningCircleIcon } from '@phosphor-icons/react'

import { useTheme } from 'styled-components'

import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../services/firebaseConfig'

export function DeleteData({ item, table, onClose, firstField }) {
  const theme = useTheme()

  async function handleDelete() {
    if (!item?.id || !table) return
    await deleteDoc(doc(db, table, item.id))
    onClose()
  }

  return (
    <Box
      height={'100%'}
      width={'100%'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
      }}
    >
      <Title>Confirmar Exclusão</Title>

      <Box>
        <Grid container rowSpacing={2}>
          <Grid
            size={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <WarningCircleIcon size={156} color={theme['red-500']} />
          </Grid>
          <Grid size={12}>
            <Subtitle>
              Tem certeza que deseja excluir o{' '}
              {table.toLowerCase().slice(0, table.length - 1)}
              <br />
              <strong>{item?.[firstField] || 'Este item'}?</strong>
            </Subtitle>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          gap: '32px',
        }}
      >
        <Button
          Icon="XCircle"
          Text="Cancelar"
          Size={212}
          Color="Black"
          onClick={() => onClose()}
        />
        <Button
          Icon="Trash"
          Text={`Sim, excluir ${table
            .toLowerCase()
            .slice(0, table.length - 1)}!`}
          onClick={handleDelete}
        />
      </Box>
    </Box>
  )
}
