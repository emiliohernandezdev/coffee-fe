import React, { useState } from 'react';
import { Paper, Typography, Button, Box, Fab, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useDrag } from 'react-dnd';
import AddIcon from '@mui/icons-material/Add';

const TablePage = () => {
    const [tables, setTables] = useState([
        { id: 1, x: 2, y: 2, number: 1, capacity: 4, occupied: false, comensal: null },
        { id: 2, x: 3, y: 3, number: 2, capacity: 2, occupied: false, comensal: null },
        { id: 3, x: 4, y: 4, number: 3, capacity: 6, occupied: false, comensal: null },
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [newCapacity, setNewCapacity] = useState(4);
    const [comensales, setComensales] = useState(['Juan', 'Pedro', 'Ana']);
    const [selectedComensal, setSelectedComensal] = useState('');

    const appBarHeight = 64;

    const getNextFreePosition = () => {
        let occupiedPositions = tables.map(table => `${table.x}-${table.y}`);
        for (let x = 0; x <= 4; x++) {
            for (let y = 0; y <= 4; y++) {
                if (!occupiedPositions.includes(`${x}-${y}`)) {
                    return { x, y };
                }
            }
        }
        return { x: 0, y: 0 };
    };

    const checkCollision = (x, y) => {
        return tables.some(table => table.x === x && table.y === y);
    };

    const moveTable = (id, newX, newY) => {
        const maxX = Math.floor(window.innerWidth / 120) - 1;
        const maxY = Math.floor((window.innerHeight - appBarHeight) / 120) - 1;

        const clampedX = Math.min(Math.max(0, newX), maxX);
        const clampedY = Math.min(Math.max(0, newY), maxY);

        if (!checkCollision(clampedX, clampedY)) {
            setTables(prevTables => prevTables.map(table =>
                table.id === id ? { ...table, x: clampedX, y: clampedY } : table
            ));
        }
    };

    const handleAddTableClick = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    const handleDialogConfirm = () => {
        const { x, y } = getNextFreePosition();
        setTables([
            ...tables,
            {
                id: tables.length + 1,
                x,
                y,
                number: tables.length + 1,
                capacity: newCapacity,
                occupied: false,
                comensal: null,
            }
        ]);
        setOpenDialog(false);
    };

    const handleComensalSelect = (tableId) => {
        setTables(prevTables => prevTables.map(table =>
            table.id === tableId ? { ...table, occupied: true, comensal: selectedComensal } : table
        ));
        setOpenComboBox(null);
    };

    const Table = ({ table }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: 'TABLE',
            item: { id: table.id, x: table.x, y: table.y },
            end: (item, monitor) => {
                const delta = monitor.getDifferenceFromInitialOffset();
                if (item && delta) {
                    const newX = Math.max(0, item.x + delta.x / 120);
                    const newY = Math.max(0, item.y + delta.y / 120);
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
                    backgroundColor: table.occupied ? '#e63946' : '#2a9d8f',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'grab',
                    opacity: isDragging ? 0.5 : 1,
                    borderRadius: '8px',
                    position: 'absolute',
                    top: `${table.y * 120}px`,
                    left: `${table.x * 120}px`,
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
                }}
            >
                <Box style={{ textAlign: 'center', color: 'white' }}>
                    <Typography variant="h6"># {table.number}</Typography>
                    <Typography variant="body2">Capacidad: {table.capacity}</Typography>
                    <Typography variant="body2">
                        {table.occupied ? `Ocupada por: ${table.comensal}` : 'Disponible'}
                    </Typography>
                </Box>
            </Paper>
        );
    };

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Mesas
            </Typography>

            <Fab variant="extended" color="primary" sx={{ position: 'fixed', bottom: '80px', right: '30px' }} onClick={handleAddTableClick}>
                <AddIcon sx={{ mr: 1 }} /> Agregar mesa
            </Fab>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Agregar Mesa</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Capacidad" type="number" fullWidth value={newCapacity} onChange={(e) => setNewCapacity(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">Cancelar</Button>
                    <Button onClick={handleDialogConfirm} color="primary">Agregar</Button>
                </DialogActions>
            </Dialog>

            {tables.map(table => <Table key={table.id} table={table} />)}
        </div>
    );
};

export default TablePage;
