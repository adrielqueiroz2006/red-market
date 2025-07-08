import { useEffect, useState } from 'react'

import { MainLayout } from '../../layouts/MainLayout'

import { Datagrid } from '../../components/Datagrid'
import { Button } from '../../components/Button'

import { Box } from '@mui/material'

import { handleExport } from '../../utils/exportDatagrid'

import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../services/firebaseConfig'

import { OrderForm } from './components/OrderForm'

export function Orders() {
  const page = 'Pedidos'

  const [orders, setOrders] = useState([])
  const ordersCollectionRef = collection(db, page)

  const fields = [
    {
      id: 'product',
      name: 'Produto',
    },
    {
      id: 'customer',
      name: 'Cliente',
    },
    {
      id: 'amount',
      name: 'Quantidade',
    },
    {
      id: 'value',
      name: 'Valor',
    },
  ]

  async function getOrders() {
    const q = query(ordersCollectionRef, orderBy('createdAt', 'asc'))
    const data = await getDocs(q)

    setOrders(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    )
  }

  async function handleAddOrder(
    product,
    productId,
    customer,
    customerId,
    amount,
    value
  ) {
    try {
      const order = await addDoc(ordersCollectionRef, {
        product,
        productId,
        customer,
        customerId,
        amount,
        value,
        createdAt: serverTimestamp(),
      })

      await getOrders()
    } catch {
      alert('Não foi possível adicionar o pedido')
    }
  }

  async function handleEditOrder(
    product,
    productId,
    customer,
    customerId,
    amount,
    value,
    id
  ) {
    try {
      const orderDoc = doc(db, page, id)
      await updateDoc(orderDoc, {
        product,
        productId,
        customer,
        customerId,
        amount,
        value,
        id,
      })

      await getOrders()
    } catch {
      alert('Não foi possível editar o pedido')
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <MainLayout
      selectedPage={page}
      children={
        <>
          <Datagrid
            tableName={page}
            fieldsArray={fields}
            data={orders}
            addNewData={(handleCloseAdd) => (
              <OrderForm
                option="save"
                onClose={handleCloseAdd}
                onAction={handleAddOrder}
              />
            )}
            editData={(handleCloseEdit, selectedItem) => (
              <OrderForm
                option="edit"
                onClose={handleCloseEdit}
                onAction={handleEditOrder}
                item={selectedItem}
              />
            )}
            onRefresh={getOrders}
          />

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
              onClick={() => handleExport(page, fields, 'pdf', orders)}
            />
            <Button
              Icon="MicrosoftExcelLogo"
              Text="Exportar Excel"
              Size={232}
              onClick={() => handleExport(page, fields, 'excel', orders)}
            />
          </Box>
        </>
      }
    />
  )
}
