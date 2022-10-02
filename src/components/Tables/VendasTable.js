import { Box, Card, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

export default function VendasTable({ tableData }) {

    if (tableData) {
        console.log(tableData)
    }


    const statusObj = {
        applied: { color: 'info' },
        rejected: { color: 'error' },
        current: { color: 'primary' },
        resigned: { color: 'warning' },
        professional: { color: 'success' }
    }

    return (
        <Card>
            <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Profit</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map(row => (
                            <TableRow hover key={row.productId} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.data.name}</Typography>
                                        <Typography variant='caption'>{row.data.code}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{row.data.category}</TableCell>
                                <TableCell>{row.data.date.toDate().toDateString()}</TableCell>
                                <TableCell>{row.data.sellPrice}</TableCell>
                                <TableCell>{row.data.buyPrice - row.data.sellPrice}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.soldCount}
                                        color={'info'}
                                        sx={{
                                            height: 24,
                                            fontSize: '0.75rem',
                                            textTransform: 'capitalize',
                                            '& .MuiChip-label': { fontWeight: 500 }
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}
