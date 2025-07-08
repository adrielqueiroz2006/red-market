import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'

import { InputTitle, Title } from './styles'

import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'

import { capitalizeWords } from '../../../../utils/capitalizeWords'

export function CustomerForm({ option, onClose, onAction, item }) {
  const [name, setName] = useState('')
  const [register, setRegister] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  function formatCNPJ(cnpj) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }

  function formatPhone(phone) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  function onSubmit() {
    if (name === '' || register === '' || address === '' || phone === '') {
      alert('Não deixe nenhum campo vazio!')
      return
    }

    if (register.length !== 11 && register.length !== 14) {
      alert('Informe um CPF ou CNPJ correto!')
      return
    }

    if (phone.length !== 11) {
      alert('Informe um telefone (com DDD) correto!')
      return
    }

    const formattedRegister =
      register.length === 11 ? formatCPF(register) : formatCNPJ(register)
    const formattedPhone = formatPhone(phone.replace(/\D/g, ''))
    const formattedName = capitalizeWords(name)
    const formattedAddress = capitalizeWords(address)

    onAction(
      formattedName,
      formattedRegister,
      formattedAddress,
      formattedPhone,
      item?.id
    )
    onClose()
  }

  useEffect(() => {
    if (option === 'edit' && item) {
      setName(item.name || '')
      setRegister(item.register?.replace(/\D/g, '') || '')
      setAddress(item.address || '')
      setPhone(item.phone?.replace(/\D/g, '') || '')
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
        {option === 'edit' ? 'Editar cliente' : 'Adicionar novo cliente'}
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
              Icon="User"
              Text="Digite o nome do cliente"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>CPF/CNPJ</InputTitle>
            <Input
              Icon="IdentificationCard"
              Text="Digite o CPF ou CNPJ do cliente"
              value={register}
              onChange={(e) => setRegister(e.target.value)}
              minLength={11}
              maxLength={14}
              type="number"
            />
          </Grid>

          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>Endereço</InputTitle>
            <Input
              Icon="House"
              Text={'Digite o endereço do cliente'}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>

          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>Telefone</InputTitle>
            <Input
              Icon="Phone"
              Text="Digite o telefone do cliente"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={11}
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
