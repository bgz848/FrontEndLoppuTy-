import { useState, useEffect } from 'react'; 
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: 'Nimi',
            colId: 'firstname&lastname',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true,
            valueGetter: fullNameGetter
        },
        {
            headerName: 'Puhelinnumero',
            field: 'phone',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true,
            width: 150
        },
        {
            headerName: 'Osoite',
            field: 'streetaddress',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Postinumero',
            field: 'postcode',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true,
            width: 110
        },
        {
            headerName: 'Kaupunki',
            field: 'city',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        },
        {
            headerName: 'Sähköposti',
            field: 'email',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilter: true
        }
    ]);

    // Yhdistää etu ja sukunimet
    function fullNameGetter(params) {
        return `${params.data.firstname} ${params.data.lastname}`;
    }

    // Hakee asiakas tiedot APIlla
    useEffect(() => {
        fetchData();
    }, []);

    // Hakee asiakas tiedot APIlla
    const fetchData = () => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            .then((response) => response.json())
            .then((data) => {
                if (data._embedded && data._embedded.customers) {
                    setCustomers(data._embedded.customers);
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div
            className="ag-theme-material"
            style={{ width: '1270px', height: '700px', margin: 'auto', padding: '20px 0' }}
        >
            <AgGridReact
                columnDefs={columnDefs}
                rowData={customers}
                animateRows="true"
                pagination="true"
                paginationAutoPageSize="true"
            />
        </div>
    );
}

export default CustomerList;