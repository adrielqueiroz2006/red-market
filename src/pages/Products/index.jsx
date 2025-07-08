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

import { ProductForm } from './components/ProductForm'

export function Products() {
  const page = 'Produtos'

  const [products, setProducts] = useState([])
  const productsCollectionRef = collection(db, page)

  const fields = [
    {
      id: 'name',
      name: 'Nome',
    },
    {
      id: 'price',
      name: 'Preço',
    },
    {
      id: 'category',
      name: 'Categoria',
    },
    {
      id: 'inventory',
      name: 'Estoque',
    },
  ]

  async function getProducts() {
    const q = query(productsCollectionRef, orderBy('createdAt', 'asc'))
    const data = await getDocs(q)

    setProducts(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    )
  }

  async function handleAddProduct(name, price, category, inventory) {
    try {
      const product = await addDoc(productsCollectionRef, {
        name,
        price,
        category,
        inventory,
        createdAt: serverTimestamp(),
      })

      await getProducts()
    } catch {
      alert('Não foi possível adicionar o produto')
    }
  }

  async function handleEditProduct(name, price, category, inventory, id) {
    try {
      const productDoc = doc(db, page, id)
      await updateDoc(productDoc, {
        name,
        price,
        category,
        inventory,
      })

      await getProducts()
    } catch {
      alert('Não foi possível editar o produto')
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <MainLayout
      selectedPage={page}
      children={
        <>
          <Datagrid
            tableName={page}
            fieldsArray={fields}
            data={products}
            addNewData={(handleCloseAdd) => (
              <ProductForm
                option="save"
                onClose={handleCloseAdd}
                onAction={handleAddProduct}
              />
            )}
            editData={(handleCloseEdit, selectedItem) => (
              <ProductForm
                option="edit"
                onClose={handleCloseEdit}
                onAction={handleEditProduct}
                item={selectedItem}
              />
            )}
            onRefresh={getProducts}
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
              onClick={() => handleExport(page, fields, 'pdf', products)}
            />
            <Button
              Icon="MicrosoftExcelLogo"
              Text="Exportar Excel"
              Size={232}
              onClick={() => handleExport(page, fields, 'excel', products)}
            />
          </Box>
        </>
      }
    />
  )
}
