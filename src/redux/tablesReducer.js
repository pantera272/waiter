const createActionName = actionName => `app/tables/${actionName}`;
//selector
export const getAllTables = (state) => state.tables;

export const getTableById = ({tables}, id) => tables.find(table => table.id === id);

//action
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
export const updateTables = payload => ({type: UPDATE_TABLES, payload});

export const fetchTables = dispatch =>{
  fetch('http://localhost:3131/api/tables')
  .then(res => res.json())
  .then(tables => dispatch(updateTables(tables)));
}

const tablesReducer = (statePart = [], action) =>{
  switch (action.type){
    case UPDATE_TABLES:
      return [...action.payload];
    default:
      return statePart;
  }  
}

export default tablesReducer;