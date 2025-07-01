import { useEffect, useState } from 'react'

import { Box, Grid, Modal } from '@mui/material'

import { Button } from '../Button'

import { Container, DataTable, OrderSelection, Title } from './styles'

import { useTheme } from 'styled-components'

import { ActionButton } from './components/ActionButton'

import { AddNewData } from '../AddNewData'
import { DeleteData } from '../DeleteData'
import { EditData } from '../EditData'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConfig'

export function Datagrid({ fieldsArray, tableName }) {
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [data, setData] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('asc')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleOpenDelete = (item) => {
    setSelectedItem(item)
    setOpenDelete(true)
  }
  const handleCloseDelete = () => {
    setSelectedItem(null)
    setOpenDelete(false)
  }

  const handleOpenEdit = (item) => {
    setSelectedItem(item)
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setSelectedItem(null)
    setOpenEdit(false)
  }

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, tableName)

      let q = query(colRef, orderBy(sortField, sortDirection))

      const snapshot = await getDocs(q)
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setData(items)
    }

    fetchData()
  }, [tableName, open, openDelete, openEdit, sortField, sortDirection])

  const theme = useTheme()

  return (
    <>
      <Container>
        <Grid container rowSpacing={1} sx={{ marginInline: 2 }}>
          <Grid size={12}>
            <Title>Clientes</Title>
          </Grid>

          <Grid
            size={12}
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}
          >
            <Box>
              <Button onClick={handleOpen} />
            </Box>

            <Box>
              <OrderSelection
                value={`${sortField}-${sortDirection}`}
                onChange={(e) => {
                  const [field, direction] = e.target.value.split('-')
                  setSortField(field)
                  setSortDirection(direction)
                }}
              >
                <option value="createdAt-asc">
                  Data de adição (crescente)
                </option>
                <option value="createdAt-desc">
                  Data de adição (decrescente)
                </option>

                {fieldsArray.map((field) => (
                  <>
                    <option
                      key={`${field.name}-asc`}
                      value={`${field.name}-asc`}
                    >
                      {field.name === 'CPFCNPJ' ? 'CPF/CNPJ' : field.name}
                      (crescente)
                    </option>
                    <option
                      key={`${field.name}-desc`}
                      value={`${field.name}-desc`}
                    >
                      {field.name === 'CPFCNPJ' ? 'CPF/CNPJ' : field.name}
                      (decrescente)
                    </option>
                  </>
                ))}
              </OrderSelection>
            </Box>
          </Grid>
        </Grid>

        <DataTable>
          <table>
            <thead>
              <tr>
                <th></th>
                {fieldsArray.map((field) => (
                  <th key={field.name}>
                    {field.name === 'CPFCNPJ' ? 'CPF/CNPJ' : field.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <ActionButton
                        Icon={'Trash'}
                        onClick={() => handleOpenDelete(item)}
                      />
                      <ActionButton
                        Icon={'PencilSimple'}
                        onClick={() => handleOpenEdit(item)}
                      />
                    </div>
                  </td>

                  {fieldsArray.map((field) => (
                    <td key={field.name}>{item[field.name]}</td>
                  ))}
                </tr>
              ))}
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
          <AddNewData
            onClose={handleClose}
            fields={fieldsArray}
            table={tableName}
          />
        </Box>
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
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
          <EditData
            onClose={handleCloseEdit}
            item={selectedItem}
            fields={fieldsArray}
            table={tableName}
          />
        </Box>
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
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
            maxWidth: '708px',
            width: '100%',
            transform: 'translate(-50%, -50%)',
            bgcolor: theme.white,
          }}
        >
          <DeleteData
            onClose={handleCloseDelete}
            item={selectedItem}
            firstField={fieldsArray[0]?.name}
            table={tableName}
          />
        </Box>
      </Modal>
    </>
  )
}
