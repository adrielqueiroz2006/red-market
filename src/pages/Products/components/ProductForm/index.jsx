import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'

import { InputTitle, Title } from './styles'

import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'

import { capitalizeWords } from '../../../../utils/capitalizeWords'

export function ProductForm({ option, onClose, onAction, item }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [inventory, setInventory] = useState('')

  function onSubmit() {
    if (name === '' || price === '' || category === '' || inventory === '') {
      alert('Não deixe nenhum campo vazio!')
      return
    }

    const formattedPrice = Number(price).toFixed(2)
    const formattedName = capitalizeWords(name)
    const formattedCategory = capitalizeWords(category)

    onAction(
      formattedName,
      formattedPrice,
      formattedCategory,
      Number(inventory),
      item?.id
    )
    onClose()
  }

  useEffect(() => {
    if (option === 'edit' && item) {
      setName(item.name || '')
      setPrice(item.price || '')
      setCategory(item.category || '')
      setInventory(item.inventory)
    }
  }, [option, item])

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
      <Title>
        {option === 'edit' ? 'Editar produto' : 'Adicionar novo produto'}
      </Title>

      <Box>
        <Grid
          container
          rowSpacing={{ md: 8.5, sm: 2.5, xs: 2.5 }}
          columnSpacing={{ md: 8.5, sm: 2.5, xs: 2.5 }}
        >
          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>Nome</InputTitle>
            <Input
              Icon="NotePencil"
              Text="Digite o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>Preço</InputTitle>
            <Input
              Icon="MoneyWavy"
              Text="Digite o preço do produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min={0}
              type="number"
            />
          </Grid>

          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>Cateogria</InputTitle>
            <Input
              Icon="List"
              Text={'Digite a categoria do produto'}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>

          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>Estoque</InputTitle>
            <Input
              Icon="Package"
              Text="Digite o estoque do produto"
              value={inventory}
              onChange={(e) => setInventory(e.target.value)}
              min={0}
              type="number"
            />
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
          Icon="PencilSimple"
          Text={option === 'edit' ? 'Salvar alterações' : 'Adicionar novo'}
          onClick={() => onSubmit()}
        />
      </Box>
    </Box>
  )
}
