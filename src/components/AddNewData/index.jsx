import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'

import { InputTitle, Title } from './styles'

import { Button } from '../Button'
import { Input } from '../Input'

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore'
import { db } from '../../services/firebaseConfig'

import { InputSelect } from '../InputSelect'

export function AddNewData({ onClose, fields = [], table }) {
  const [selectOptions, setSelectOptions] = useState({})

  useEffect(() => {
    async function fetchAllSelects() {
      const opts = {}
      const withCollection = fields.filter((f) => f.collectionName)

      await Promise.all(
        withCollection.map(async (field) => {
          const snap = await getDocs(collection(db, field.collectionName))
          opts[field.name] = snap.docs
            .map((doc) => doc.data().Nome)
            .filter((nome) => typeof nome === 'string')
        })
      )

      setSelectOptions(opts)
    }

    fetchAllSelects()
  }, [fields])

  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  )

  function handleChange(e, fieldName) {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }))
  }

  const tableCollectionRef = collection(db, table)

  async function handleSave() {
    try {
      let finalData = { ...formData }

      if (table === 'Pedidos') {
        const produtosRef = collection(db, 'Produtos')

        const snapshot = await getDocs(produtosRef)
        const produtos = snapshot.docs.map((doc) => doc.data())

        const produtoSelecionado = produtos.find(
          (p) => p.Nome === formData.Produtos
        )

        const preco = Number(produtoSelecionado?.Preço || 0)
        const quantidade = Number(formData.Quantidade || 0)
        const valorCalculado = preco * quantidade

        finalData.Valor = valorCalculado.toFixed(2).toString()
      }

      await addDoc(tableCollectionRef, {
        ...finalData,
        createdAt: serverTimestamp(),
      })

      onClose()
    } catch (error) {
      console.error(error)
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
      <Title>
        Adicionar novo {table.toLowerCase().slice(0, table.length - 1)}
      </Title>

      <Box>
        <Grid
          container
          rowSpacing={{ md: 8.5, sm: 2.5, xs: 2.5 }}
          columnSpacing={{ md: 8.5, sm: 2.5, xs: 2.5 }}
        >
          {fields.map((field) => (
            <Grid
              key={field.name}
              size={{ sm: 6, xs: 12 }}
              sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {field.collectionName ? (
                <>
                  <InputTitle>
                    {field.name === 'Produtos'
                      ? 'Produto'
                      : field.name === 'Clientes'
                      ? 'Cliente'
                      : field.name}
                  </InputTitle>
                  <InputSelect
                    value={formData[field.name]}
                    onChange={(e) => handleChange(e, field.name)}
                  >
                    <option value="">Selecione</option>
                    {(selectOptions[field.name] || []).map((nome, idx) => (
                      <option key={idx} value={nome}>
                        {nome}
                      </option>
                    ))}
                  </InputSelect>
                </>
              ) : (
                <>
                  {table === 'Pedidos' && field.name === 'Valor' ? null : (
                    <>
                      <InputTitle>
                        {field.name === 'CPFCNPJ' ? 'CPF/CNPJ' : field.name}
                      </InputTitle>
                      <Input
                        Icon={field.icon}
                        Text={field.text}
                        value={formData[field.name]}
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    </>
                  )}
                </>
              )}
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
        <Button Icon="PencilSimple" onClick={handleSave} />
      </Box>
    </Box>
  )
}
