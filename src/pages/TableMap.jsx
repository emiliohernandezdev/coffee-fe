import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, Box, Fab, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useDrag } from 'react-dnd';
import AddIcon from '@mui/icons-material/Add';
import TablesService from '../services/TablesService';
import io from 'socket.io-client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { apiConfig } from '../services/ApiConfig';

const TablePage = () => {
    const [tables, setTables] = useState([]);
    const [clients, setClients] = useState([]);

    const socket = io(`${apiConfig.socketUrl}/tables`);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const data = await TablesService.getAllTables();
                setTables(data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchClients = async () => {
            // Assume there's a service to fetch clients
            const data = await TablesService.getAllClients();
            setClients(data);
        };

        fetchTables();
        fetchClients();

        socket.on('tableAdded', (table) => {
            setTables(prevTables => [...prevTables, table]);
        });

        socket.on('tableUpdated', (updatedTable) => {
            setTables(prevTables => prevTables.map(table =>
                table._id === updatedTable._id ? updatedTable : table
            ));
        });

        socket.on('tableDeleted', (deletedTable) => {
            setTables(prevTables => prevTables.filter(table => table._id !== deletedTable._id));
        });

        return () => {
            socket.off('tableAdded');
            socket.off('tableUpdated');
            socket.off('tableDeleted');
        };
    }, []);

    const [openDialog, setOpenDialog] = useState(false);
    const [newCapacity, setNewCapacity] = useState(4);
    const [selectedTable, setSelectedTable] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [assignedClient, setAssignedClient] = useState('');

    const moveTable = async (id, newX, newY) => {
        try {
            await TablesService.updateTable(id, { x: newX, y: newY });
            setTables(prevTables => prevTables.map(table =>
                table._id === id ? { ...table, x: newX, y: newY } : table
            ));
        } catch (err) {
            console.error("Error updating table:", err);
        }
    };

    const handleAddTableClick = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    const handleDialogConfirm = async () => {
        const newTable = {
            number: tables.length + 1,
            capacity: Number(newCapacity),
            x: 0,
            y: 0,
        };

        try {
            await TablesService.addTable(newTable);
            setOpenDialog(false);
        } catch (err) {
            console.error("Error agregando la mesa:", err);
        }
    };

    const handleEditTable = (table) => {
        setSelectedTable(table);
        setNewCapacity(table.capacity);
        setAssignedClient(table.client || ''); // Set assigned client if available
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => setOpenEditDialog(false);

    const handleEditDialogConfirm = async () => {
        const updatedTable = {
            ...selectedTable,
            capacity: newCapacity,
            client: assignedClient,
        };

        try {
            await TablesService.updateTable(updatedTable._id, updatedTable);
            setOpenEditDialog(false);
        } catch (err) {
            console.error("Error actualizando la mesa:", err);
        }
    };

    const handleDeleteTable = async (tableId) => {
        try {
            await TablesService.deleteTable(tableId);
            setTables(prevTables => prevTables.filter(table => table._id !== tableId));
            setOpenEditDialog(false);
        } catch (err) {
            console.error("Error eliminando la mesa:", err);
        }
    };

    const handleAssignClient = async (tableId) => {
        try {
            await TablesService.assignClientToTable(tableId, assignedClient);
            setTables(prevTables => prevTables.map(table =>
                table._id === tableId ? { ...table, client: assignedClient } : table
            ));
        } catch (err) {
            console.error("Error asignando cliente a la mesa:", err);
        }
    };

    const Table = ({ table }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: 'TABLE',
            item: { _id: table._id, x: table.x, y: table.y },
            end: (item, monitor) => {
                const delta = monitor.getDifferenceFromInitialOffset();
                if (item && delta) {
                    const newX = Math.round(item.x + delta.x / 120);
                    const newY = Math.round(item.y + delta.y / 120);
                    moveTable(item._id, newX, newY);
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }));

        return (
            <Paper
                ref={drag}
                className="absolute w-24 h-24 flex flex-col justify-center items-center cursor-grab rounded-lg shadow-md bg-green-500 text-white"
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    left: `${table.x * 120}px`,
                    top: `${table.y * 120}px`,
                }}
                onClick={() => handleEditTable(table)}
            >
                <Typography variant="h6"># {table.number}</Typography>
                <Typography variant="body2">Cap: {table.capacity}</Typography>
                {table.client && <Typography variant="body2">Cliente: {table.client}</Typography>}
            </Paper>
        );
    };

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    return (
        <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
            <div className="w-full min-h-screen p-4 relative">
                <Typography variant="h4" align="center" gutterBottom>
                    Mesas
                </Typography>

                <Fab variant="extended" color="primary" sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }} onClick={handleAddTableClick}>
                    <AddIcon className="mr-2" /> Agregar mesa
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

                <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
                    <DialogTitle>Editar Mesa</DialogTitle>
                    <DialogContent>
                        <TextField margin="dense" label="Capacidad" type="number" fullWidth value={newCapacity} onChange={(e) => setNewCapacity(e.target.value)} />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Asignar Cliente</InputLabel>
                            <Select value={assignedClient} onChange={(e) => setAssignedClient(e.target.value)}>
                                {clients.map(client => (
                                    <MenuItem key={client._id} value={client._id}>{client.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleDeleteTable(selectedTable._id)} color="secondary">Eliminar</Button>
                        <Button onClick={handleEditDialogClose} color="primary">Cancelar</Button>
                        <Button onClick={handleEditDialogConfirm} color="primary">Guardar</Button>
                    </DialogActions>
                </Dialog>

                <div className="relative w-full h-full">
                    {tables.map((table) => (
                        <Table key={table._id} table={table} />
                    ))}
                </div>
            </div>
        </DndProvider>
    );
};

export default TablePage;
