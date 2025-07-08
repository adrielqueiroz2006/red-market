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

import { CustomerForm } from './components/CustomerForm'

export function Customers() {
  const page = 'Clientes'

  const [customers, setCustomers] = useState([])
  const customersCollectionRef = collection(db, page)

  const fields = [
    {
      id: 'name',
      name: 'Nome',
    },
    {
      id: 'register',
      name: 'CPF/CNPJ',
    },
    {
      id: 'address',
      name: 'Endereço',
    },
    {
      id: 'phone',
      name: 'Telefone',
    },
  ]

  async function getCustomers() {
    const q = query(customersCollectionRef, orderBy('createdAt', 'asc'))
    const data = await getDocs(q)

    setCustomers(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    )
  }

  async function handleAddCustomer(name, register, address, phone) {
    try {
      const customer = await addDoc(customersCollectionRef, {
        name,
        register,
        address,
        phone,
        createdAt: serverTimestamp(),
      })

      await getCustomers()
    } catch {
      alert('Não foi possível adicionar o cliente')
    }
  }

  async function handleEditCustomer(name, register, address, phone, id) {
    try {
      const customerDoc = doc(db, page, id)
      await updateDoc(customerDoc, {
        name,
        register,
        address,
        phone,
      })

      await getCustomers()
    } catch {
      alert('Não foi possível editar o cliente')
    }
  }

  useEffect(() => {
    getCustomers()
  }, [])

  return (
    <MainLayout
      selectedPage={page}
      children={
        <>
          <Datagrid
            tableName={page}
            fieldsArray={fields}
            data={customers}
            addNewData={(handleCloseAdd) => (
              <CustomerForm
                option="save"
                onClose={handleCloseAdd}
                onAction={handleAddCustomer}
              />
            )}
            editData={(handleCloseEdit, selectedItem) => (
              <CustomerForm
                option="edit"
                onClose={handleCloseEdit}
                onAction={handleEditCustomer}
                item={selectedItem}
              />
            )}
            onRefresh={getCustomers}
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
              onClick={() => handleExport(page, fields, 'pdf')}
            />
            <Button
              Icon="MicrosoftExcelLogo"
              Text="Exportar Excel"
              Size={232}
              onClick={() => handleExport(page, fields, 'excel')}
            />
          </Box>
        </>
      }
    />
  )
}
