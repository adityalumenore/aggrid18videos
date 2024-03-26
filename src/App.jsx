//import { useState } from 'react';
import { useState, useMemo } from 'react'; // Import React and useState
import { AgGridReact } from 'ag-grid-react'; // Corrected import statement
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import './App.css';


function App() {
  
 






  const defaultColDef = useMemo(() => ({
    filter: true,
    pagination: true,
    editable: true,
    sortable: true,
    checkboxSelection: true,
    floatingFilter: true,
    flex: 1,
    enableRowGroup: true,



  }), []);

  <select onChange={(e) => onPaginationChange(e.target.value)}>
    <option value='10'>10</option>
    <option value='25'>25</option>
    <option value='50'>50</option>
    <option value='100'>100</option>
  </select>

  const onPaginationChange = (pageSize) => {
    gridApi.api.paginationSetPageSize(Number(pageSize))
  }

  const actionTaken = (p) => {
    alert(`${p.data.model} ${p.data.price} `);
  }

  const [colDefs] = useState([
    { field: "carName", headerCheckboxSelection : true},
    { field: "model", tooltipField: "price" },

    {
      field: "price", valueFormatter: p => { return 'Rs. ' + p.value.toLocaleString(); }, headerName: "Price on road",
      cellStyle: (p) => (p.value > 500 ? { border: "4px  darkblue solid" } : { border: "4px darkgreen solid" })

    },

    { field: "color" },
    { field: "country", cellStyle : {background : "darkblue" }},
    { field: "electric", checkboxSelection: false, floatingFilter: false },
    {
      field: "Action", cellRenderer: p => {
        return (
          <div>
            <button onClick={() => { actionTaken(p) }}> Click me to buy</button>
          </div>
        )
      }, checkboxSelection: false,
      floatingFilter: false,
    }
  ]);

  const [rowData] = useState([
    { carName: "suzuki", price: 400, model: "awx", color: "red", country: "india", electric: true },
    { carName: "maruti", price: 3740, model: "wes", color: "blue", country: "india", electric: false },
    { carName: "nexa", price: 400, model: "hs", color: "pink", country: "india", electric: false },
    { carName: "audi", price: 728, model: "qd", color: "silver", country: "australia", electric: true },
    { carName: "bmw", price: 4780, model: "nkk", color: "white", country: "india", electric: false },
    { carName: "truck", price: 190, model: "awet", color: "green", country: "USA", electric: true },
    { carName: "maze", price: 473, model: "awrt", color: "yellow", country: "india", electric: true },
    { carName: "gand vitara", price: 9312, model: "nds", color: "red", country: "russia", electric: false },
  ]);

  let gridApi;

  const onGridReady = p => {
    gridApi = p.api
    // fetch("https://jsonplaceholder.typicode.com/comments")
    // .then((resp=>resp.json())).
    // then(resp=>{console.log(resp)
    // p.api.applyTransaction({add :resp})})
  }

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  }

  const rowSelectionType = 'multiple';

  const isRowSelectable = (p) => {
    return (
      p.data?p.data.price>400 : false  
    )
  }

  //const paginationPageSizeSelector = [5, 20, 50, 100];

  

  return (
    <div>

      <div
        className="ag-theme-quartz-dark"
        style={{ height: 800, width: '100%' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          onGridReady={onGridReady}
          enableBrowserTooltips={true}
          rowSelection={rowSelectionType}
          rowMultiSelectWithClick={true}
          isRowSelectable={isRowSelectable}
          // paginationAutoPageSize={true}
          //paginationPageSizeSelector={paginationPageSizeSelector}
          
          
        />
        <button> helo</button>
      </div>
      <button className='button' onClick={() => onExportClick()}>Export</button>
    </div>
  );
}

export default App;
