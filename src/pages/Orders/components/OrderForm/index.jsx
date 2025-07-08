import { useEffect, useState } from 'react'

import { Box, Grid } from '@mui/material'

import { InputTitle, Title } from './styles'

import { InputSelect } from '../../../../components/InputSelect'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'

import { db } from '../../../../services/firebaseConfig'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export function OrderForm({ option, onClose, onAction, item }) {
  const [productId, setProductId] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [amount, setAmount] = useState('')

  const [products, setProducts] = useState([])
  const productsCollectionRef = collection(db, 'Produtos')

  const [customers, setCustomers] = useState([])
  const customersCollectionRef = collection(db, 'Clientes')

  async function getProducts() {
    const q = query(productsCollectionRef, orderBy('createdAt', 'desc'))
    const data = await getDocs(q)

    setProducts(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    )
  }

  async function getCustomers() {
    const q = query(customersCollectionRef, orderBy('createdAt', 'desc'))
    const data = await getDocs(q)

    setCustomers(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    )
  }

  function onSubmit() {
    if (productId === '' || customerId === '' || amount === '') {
      alert('Não deixe nenhum campo vazio!')
      return
    }

    if (amount <= 0) {
      alert('Informe uma quantidade válida!')
      return
    }

    const selectedProduct = products.find((product) => product.id === productId)
    const selectedCustomer = customers.find(
      (customer) => customer.id === customerId
    )

    if (amount > selectedProduct.inventory) {
      alert('Não há estoque suficiente para esse produto!')
      return
    }

    const productName = selectedProduct.name
    const customerName = selectedCustomer.name
    const value = (Number(amount) * Number(selectedProduct.price)).toFixed(2)

    onAction(
      productName,
      productId,
      customerName,
      customerId,
      Number(amount),
      value,
      item?.id
    )
    onClose()
  }

  useEffect(() => {
    getCustomers()
    getProducts()
  }, [])

  useEffect(() => {
    const selectedProductExists = products.some(
      (product) => product.id === item.productId
    )
    const selectedCustomerExists = customers.some(
      (customer) => customer.id === item.customerId
    )

    if (option === 'edit' && item) {
      setProductId(selectedProductExists ? item.productId : '')
      setCustomerId(selectedCustomerExists ? item.customerId : '')
      setAmount(item.amount || '')
    }
  }, [option, item, products, customers])

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
        {option === 'edit' ? 'Editar pedido' : 'Adicionar novo pedido'}
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
            <InputTitle>Produto</InputTitle>
            <InputSelect
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            >
              <option value="">Selecione</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </InputSelect>
          </Grid>

          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>Cliente</InputTitle>
            <InputSelect
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            >
              <option value="">Selecione</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </InputSelect>
          </Grid>

          <Grid
            size={{ sm: 6, xs: 12 }}
            sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <InputTitle>Quantidade</InputTitle>
            <Input
              Icon="Hash"
              Text="Digite a quantidade"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={1}
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
