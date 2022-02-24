import React, { useState } from 'react'
import { Form, Button, Toast } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

function ConfigForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [submitted, setSubmitted] = useState(false)
  const [config, setConfig] = useState({ dataset: '', label: '', subgroup: '' })

  const onSubmit = (data) => {
    setSubmitted(true)
    setConfig(data)

    // POST request using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ experiment: data }),
    }
    fetch('/config', requestOptions)
    //.then((response) => response.json())
    //.then((data) => console.log(data))
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Label:</Form.Label>
          <Form.Control
            type='text'
            placeholder={'Insert label here..'}
            {...register('label')}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Dataset:</Form.Label>
          <Form.Select {...register('dataset', { required: true })}>
            <option>movielens_1m</option>
          </Form.Select>
          <Form.Text className='text-muted'>blabla.</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Subgroup:</Form.Label>
          <Form.Select {...register('subgroup', { required: true })}>
            <option>Gender</option>
            <option>Age</option>
          </Form.Select>
          <Form.Text className='text-muted'>blabla.</Form.Text>
        </Form.Group>
        <Button type='submit'>Submit</Button>
      </Form>

      <Toast
        onClose={() => setSubmitted(false)}
        show={submitted}
        delay={2000}
        autohide
        bg={'dark'}
      >
        <Toast.Header>Config submitted succesfully</Toast.Header>
      </Toast>
    </>
  )
}
export default ConfigForm
