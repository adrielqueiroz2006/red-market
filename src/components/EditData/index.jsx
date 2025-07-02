import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'

import { InputTitle, Title } from './styles'

import { Button } from '../Button'
import { Input } from '../Input'

import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConfig'

export function EditData({ onClose, item, fields = [], table }) {
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (item) {
      setFormData(() =>
        fields.reduce((acc, field) => {
          acc[field.name] = item[field.name] || ''
          return acc
        }, {})
      )
    }
  }, [item, fields])

  function handleChange(e, fieldName) {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }))
  }

  async function handleSave() {
    if (!item?.id) return

    const itemDocRef = doc(db, table, item.id)

    try {
      await updateDoc(itemDocRef, formData)
      onClose()
    } catch (error) {
      console.error('Erro ao atualizar dados:', error)
    }
  }

  return (
    <Box
      height={'100%'}
      width={'100%'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
      }}
    >
      <Title>Editar {table.toLowerCase().slice(0, table.length - 1)}</Title>

      <Box>
        <Grid
          container
          rowSpacing={{ md: 8.5, sm: 2.5, xs: 2.5 }}
          columnSpacing={{ md: 8.5, sm: 2.5, xs: 2.5 }}
        >
          {fields.map((field) => (
            <Grid
              key={field.name}
              item
              size={{ sm: 6, xs: 12 }}
              sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <InputTitle>{field.name}</InputTitle>
              <Input
                Icon={field.icon}
                Text={field.text}
                value={formData[field.name]}
                onChange={(e) => handleChange(e, field.name)}
              />
            </Grid>
          ))}
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
        <Button Text="Salvar alterações" onClick={handleSave} />
      </Box>
    </Box>
  )
}
