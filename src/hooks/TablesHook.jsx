import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import TablesService from '../services/TablesService';

const socket = io('http://localhost:3000');

const useTables = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const data = await TablesService.getAllTables();
                setTables(data);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        fetchTables();

        socket.on('tableCreated', (updatedTables) => {
            console.log('🔄 Actualización recibida:', updatedTables);
        });

        return () => {
            socket.off('tablesUpdate');
        };
    }, []);

    const addTable = async (table) => {
        try {
            const newX = tables.length * 150; // Espaciado de 150px entre mesas
            const newY = 50;  // Altura fija para que no todas queden en el mismo punto


            const newTable = { ...table, x: newX, y: newY };

            await TablesService.addTable(newTable);
        } catch (error) {
            console.error('Error adding table:', error);
        }
    };

    const updateTable = async (id, updates) => {
        try {
            await TablesService.updateTable(id, updates);
        } catch (error) {
            console.error('Error updating table:', error);
        }
    };

    const deleteTable = async (id) => {
        try {
            await TablesService.deleteTable(id);
        } catch (error) {
            console.error('Error deleting table:', error);
        }
    };

    return { tables, addTable, updateTable, deleteTable };
};

export default useTables;
