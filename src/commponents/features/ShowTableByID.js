import clsx from "clsx";
import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {  useParams } from "react-router";
import { Navigate } from "react-router-dom";
import { getTableById } from "../../redux/tablesReducer";
import styles from "../../styles/hidden.module.scss";

const ShowTableByID = () => {
  const { id } = useParams();
  
  const table = useSelector(state => getTableById(state, parseInt(id)));

  const [status, setStatus] = useState(table.status);
  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);
  const [bill, setBill] = useState(table.bill);

  const [errorAmount, setErrorAmount] = useState(false);

  useEffect(() => {
    if(status !== "Busy"){
      setBill(0)
    };
    if(status === "Clining" || status === "Free"){
      setPeopleAmount(0)
    };
  },[status]);

  useEffect(() => {

    const valuePeopleAmount = parseInt(peopleAmount);
    const valueMaxPeopleAmount = parseInt(maxPeopleAmount);
    
    if(Number.isInteger(valuePeopleAmount) && Number.isInteger(valueMaxPeopleAmount)){

      setErrorAmount(false);

      setPeopleAmount(valuePeopleAmount);
      setMaxPeopleAmount(valueMaxPeopleAmount);

      if(valueMaxPeopleAmount < 0){
        setMaxPeopleAmount(0);
      } else if(valueMaxPeopleAmount > 10){
        setMaxPeopleAmount(10);
      }

      if(valuePeopleAmount < 0){
        setPeopleAmount(0);
      } else if (valuePeopleAmount > valueMaxPeopleAmount){
        setPeopleAmount(valueMaxPeopleAmount);
      }

    } else {
      setErrorAmount(true);
    }
  },[peopleAmount, maxPeopleAmount])

  if(table === undefined){
    return ( 
      <Navigate to='/home' />
    )
  } else {
    return (
      <>
        <Row>
          <Col><h1>Table {table.id}</h1></Col>
        </Row>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Status
            </Form.Label>
            <Col sm={4}>
              <Form.Select defaultValue={status} onChange={e => setStatus(e.target.value)}>
                <option value="Reserved">Reserved</option>
                <option value="Free">Free</option>
                <option value="Clining">Clining</option>
                <option value="Busy">Busy</option>
              </Form.Select>
            </Col>    
          </Form.Group>

          <Form.Group as={Row} className="mt-4 mb-4">
            <Col sm={2}>
              <Form.Label>
                People
              </Form.Label>
            </Col>
            <Col sm={2}>
              <Form.Control type="text" value={peopleAmount} onChange={e => setPeopleAmount(e.target.value)}/>
            </Col>
            <Col sm={2}>
            <Form.Label>
              Max people
            </Form.Label>   
            </Col>
            <Col sm={2}>
              <Form.Control type="text" value={maxPeopleAmount} onChange={e => setMaxPeopleAmount(e.target.value)}/>
            </Col>
            {errorAmount && <small className="d-block form-text text-danger mt-2">Please insert correct value (0-10)</small>}
          </Form.Group>
          
          <div className={clsx(status !== "Busy" && styles.hidden)}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Bill
              </Form.Label>
              <Col sm={2}>
                <Form.Control type="text" value={bill} onChange={e => setBill(e.target.value)}/>  
              </Col>  
              <Col>$</Col>
            </Form.Group>
          </div>  
          
        
          <Button variant="primary" className="mt-4">Update</Button>

        </Form>    
      </>
    )
  }  
}
export default ShowTableByID;