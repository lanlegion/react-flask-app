import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import logo from './logo.svg'
import './App.css'
import { Container, Col, Row, Stack, Spinner, Button } from 'react-bootstrap'

import ConfigForm from './components/ConfigForm'
import Table from './components/Table'

function App() {
  const [currentTime, setCurrentTime] = useState(0)
  const [elliot, setElliot] = useState({
    data: '',
    loading: false,
  })
  const [result, setResult] = useState({
    data: '',
    loading: false,
  })

  const [testTableData, setTest] = useState([
    { fruit: 'Apple', cost: 100 },
    { fruit: 'Orange', cost: 50 },
    { fruit: 'Banana', cost: 35 },
    { fruit: 'Mango', cost: 70 },
    { fruit: 'Pineapple', cost: 45 },
    { fruit: 'Papaya', cost: 40 },
    { fruit: 'Watermelon', cost: 35 },
  ])

  useEffect(() => {
    fetch('/time')
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time)
      })
  }, [])

  const runElliot = async () => {
    setElliot({ loading: true })
    fetch('/elliot')
      .then((res) => res.json())
      .then((data) => {
        setElliot({
          data: data,
          loading: false,
        })
      })
  }

  const getResult = async () => {
    fetch('/result')
      .then((res) => res.json())
      .then((data) => {
        setResult({
          data: data.result,
          loading: false,
        })
        console.log(data)
      })
  }

  return (
    <div className='App'>
      <Row className='App-header'>
        <p>The current time is {currentTime}.</p>
      </Row>
      <Container fluid className='App-container'>
        <Row>
          <Col>
            <h3>Configuration</h3>
            <ConfigForm />
          </Col>
          <Col>
            <Stack gap={2}>
              <h3>Run Elliot</h3>
              <Button onClick={runElliot}>Run Elliot rec analysis</Button>
              {elliot.loading && (
                <Spinner animation='border' role='status'>
                  <span className='visually-hidden'>Calculating result...</span>
                </Spinner>
              )}
              {/*<p>{elliot.loading ? 'Computing result..' : ''}</p>*/}
              <Button onClick={getResult}>Get Elliot result</Button>
              <p>Latest result: </p>
              {result.loading ? (
                <p>'loading result..'</p>
              ) : result.data ? (
                <Table data={testTableData} />
              ) : (
                <p>No results yet.</p>
              )}
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
