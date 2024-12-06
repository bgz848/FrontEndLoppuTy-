import React, { useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function TrainingList() {
    const [trainings, setTrainings] = useState([]);

    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: 'Nimi',
            colId: 'lastname&firstname',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true,
            valueGetter: fullNameGetter
        },
        {
            headerName: 'Aktiviteetti',
            field: 'activity',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Pituus Minuutteina',
            field: 'duration',
            sortable: true,
            filter: 'agNumberColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Päivä',
            field: 'date',
            sortable: true,
            filter: 'agDateColumnFilter',
            suppressMenu: true,
            floatingFilter: true,
            valueFormatter: dateFormatter
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchTrainings();
            await fetchCustomers();
        };
        fetchData();
    }, []); 

    const fetchTrainings = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings');
            const data = await response.json();
            setTrainings(data);
        } catch (err) {
            console.error('Error fetching trainings:', err);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers');
            if (!response.ok) throw new Error('Failed to fetch customers');
            const data = await response.json();
            setCustomers(data.content || []);
        } catch (err) {
            console.error('Error fetching customers:', err);
        }
    };

    function dateFormatter(params) {
        return dayjs(params.data.date).format('DD/MM/YYYY HH:mm');
    }


    function fullNameGetter(params) {
        if (!params.data.customer) { // Varmistetaan että asiakasobjekti on
            return 'Unknown'; // Palautetaan jos asiakasobjektia ei ole olemassa
        }

        const customer = params.data.customer; 
        return `${customer.firstname} ${customer.lastname}`; //Yhdistetään asiakkaan etu ja sukunimi
    }

    return (
        <div className='ag-theme-material' style={{ width: '900px', height: '700px', margin: 'auto', padding: '20px 0' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={trainings}
                animateRows={true}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>
    );
}

export default TrainingList;