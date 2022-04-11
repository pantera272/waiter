import { useSelector } from "react-redux";
import { getAllTables } from "../../redux/tablesReducer";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ShowAllTables = () => {
  const tables = useSelector(getAllTables);
  
  return(
    <Table striped bordered hover>
      <tbody>
        {tables.map(table => 
          <tr key={table.id}>
            <td><b>Table {table.id}</b></td>
            <td>Status: {table.status}</td>
            <td><NavLink to={'/table/' + table.id}><Button variant="primary">Show more</Button></NavLink></td>
          </tr>  
        )}
      </tbody>
    </Table>
  )
}

export default ShowAllTables;