import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, Box, Fab, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import AddIcon from '@mui/icons-material/Add';

const TablePage = () => {
    const [tables, setTables] = useState([
        { id: 1, x: 2, y: 2, number: 1, capacity: 4, occupied: false, comensal: null },
        { id: 2, x: 3, y: 3, number: 2, capacity: 2, occupied: false, comensal: null },
        { id: 3, x: 4, y: 4, number: 3, capacity: 6, occupied: false, comensal: null },
    ]);
    
    const [openDialog, setOpenDialog] = useState(false);
    const [newCapacity, setNewCapacity] = useState(4);
    const [comensales, setComensales] = useState(['Juan', 'Pedro', 'Ana']); // Ejemplo de comensales
    const [selectedComensal, setSelectedComensal] = useState('');
    const [openComboBox, setOpenComboBox] = useState(null); // Esto ahora almacena el índice o id de la mesa

    const handleAddTableClick = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDialogConfirm = () => {
        setTables([
            ...tables,
            {
                id: tables.length + 1,
                x: 0,
                y: 0,
                number: tables.length + 1,
                capacity: newCapacity,
                occupied: false,
                comensal: null,
            },
        ]);
        setOpenDialog(false);
    };

    const handleTableClick = (tableId) => {
        // Al hacer clic en la mesa, configuramos el ComboBox para esa mesa
        setOpenComboBox(tableId);
    };

    const handleComensalSelect = (tableId) => {
        // Aquí actualizamos la mesa con el comensal seleccionado
        setTables((prevTables) =>
            prevTables.map((table) =>
                table.id === tableId
                    ? { ...table, occupied: true, comensal: selectedComensal }
                    : table
            )
        );
        setOpenComboBox(null); // Cerrar el comboBox después de seleccionar
    };

    const moveTable = (id, newX, newY) => {
        setTables((prevTables) =>
            prevTables.map((table) =>
                table.id === id ? { ...table, x: newX, y: newY } : table
            )
        );
    };

    const Table = ({ table }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: 'TABLE',
            item: { id: table.id, x: table.x, y: table.y },
            end: (item, monitor) => {
                const delta = monitor.getDifferenceFromInitialOffset();
                if (item && delta) {
                    const newX = Math.max(0, item.x + delta.x / 80); 
                    const newY = Math.max(0, item.y + delta.y / 80); 
                    moveTable(item.id, newX, newY);
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }));

        return (
            <Paper
                ref={drag}
                style={{
                    backgroundColor: table.occupied ? '#FF6347' : '#32CD32',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'move',
                    opacity: isDragging ? 0.5 : 1,
                    borderRadius: '8px',
                    position: 'absolute',
                    top: `${table.y * 80}px`,
                    left: `${table.x * 80}px`,
                    transition: 'all 0.3s ease-in-out',
                    backgroundImage: 'url(/path_to_table_icon.png)', // Usa un ícono o imagen para la mesa
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                onClick={() => handleTableClick(table.id)}
            >
                <Box style={{ textAlign: 'center', color: 'white' }}>
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        {table.number}
                    </Typography>
                    <Typography variant="body2">
                        Cap: {table.capacity}
                    </Typography>
                    <Typography variant="body2">
                        {table.occupied ? `Ocupada por: ${table.comensal}` : 'Disponible'}
                    </Typography>
                </Box>
            </Paper>
        );
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TABLE',
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            if (item && delta) {
                const newX = Math.max(0, item.x + delta.x / 80);
                const newY = Math.max(0, item.y + delta.y / 80);
                moveTable(item.id, newX, newY);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div className="relative w-full h-screen bg-primary pt-16">
            <Typography variant="h4" component="h1" align="center" className="text-white mb-4">
                Mesas
            </Typography>

            <Fab
                variant="extended"
                color="primary"
                aria-label="Agregar mesa"
                sx={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '30px',
                    zIndex: 1000,
                    color: 'white',
                }}
                onClick={handleAddTableClick}
            >
                <AddIcon sx={{ mr: 1 }} />
                Agregar mesa
            </Fab>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Agregar Mesa</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="capacity"
                        label="Capacidad"
                        type="number"
                        fullWidth
                        value={newCapacity}
                        onChange={(e) => setNewCapacity(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDialogConfirm} color="primary">
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Combobox para seleccionar comensal */}
            {openComboBox !== null && (
                <div style={{ position: 'absolute', top: `${tables.find(table => table.id === openComboBox)?.y * 80}px`, left: `${tables.find(table => table.id === openComboBox)?.x * 80}px`, zIndex: 100 }}>
                    <FormControl fullWidth>
                        <InputLabel>Comensal</InputLabel>
                        <Select
                            value={selectedComensal}
                            onChange={(e) => setSelectedComensal(e.target.value)}
                            label="Comensal"
                        >
                            {comensales.map((comensal, index) => (
                                <MenuItem key={index} value={comensal}>
                                    {comensal}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button onClick={() => handleComensalSelect(openComboBox)} color="primary" variant="contained">
                        Asignar
                    </Button>
                </div>
            )}

            <div className="relative w-full h-full" ref={drop}>
                {tables.map((table) => (
                    <Table key={table.id} table={table} />
                ))}
            </div>
        </div>
    );
};

export default TablePage;
