import { API_URL } from "../config";
const createActionName = actionName => `app/tables/${actionName}`;
//selector
export const getAllTables = (state) => state.tables;

export const getTableById = ({tables}, id) => tables.find(table => table.id === id);

//action
const LOAD_TABLES = createActionName('LOAD_TABLES');
export const loadTables = payload => ({type: LOAD_TABLES, payload});

const EDIT_TABLE = createActionName('EDIT_TABLE');
export const editTable = payload => ({ type: EDIT_TABLE, payload });

export const fetchTables = () => {
  return (dispatch) => {
    fetch(`${API_URL}/tables`)
  .then(res => res.json())
  .then(tables => dispatch(loadTables(tables)));
  } 
}

export const updateTableRequest = (update) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: update.status,
        peopleAmount: update.peopleAmount,
        maxPeopleAmount: update.maxPeopleAmount,
        bill: update.bill,
      }),
    }
 
    fetch(`${API_URL}/tables/${update.id}`, options)
    .then(dispatch(editTable(update)));
  }
}

const tablesReducer = (statePart = [], action) =>{
  switch (action.type){
    case LOAD_TABLES:
      return [...action.payload];
    case EDIT_TABLE:
      return statePart.map(table => table.id === action.payload.id ? { ...table, ...action.payload } : table);
    default:
      return statePart;
  }  
}

export default tablesReducer;