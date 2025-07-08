import * as XLSX from 'xlsx'

import { saveAs } from 'file-saver'

import jsPDF from 'jspdf'
import 'jspdf-autotable'

export async function handleExport(tableName, fieldsArray, format, rawData) {
  const columns = fieldsArray.map((field) => ({
    header: field.name,
    dataKey: field.name,
  }))

  const data = rawData.map((item) => {
    const filteredItem = {}
    fieldsArray.forEach((field) => {
      filteredItem[field.name] = item[field.id] ?? ''
    })
    return filteredItem
  })

  if (format === 'excel') {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, tableName)
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([wbout], { type: 'application/octet-stream' })
    saveAs(blob, `${tableName}.xlsx`)
  }

  if (format === 'pdf') {
    const doc = new jsPDF()
    doc.autoTable({
      columns,
      body: data,
      startY: 20,
    })
    doc.save(`${tableName}.pdf`)
  }
}
