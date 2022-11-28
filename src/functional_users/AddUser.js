import { useState } from 'react'
import {Form, Row, Button, Col, Container} from 'react-bootstrap'
import {baseurl} from "../globals/Config"

function AddUser(){

    let [user,setUser] = useState({
        name:"",
        email:"",
        phone:"",
        password:""
    })

    function handleSubmit(e){
        e.preventDefault()
        fetch(baseurl+"/users", {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(user)
        }).then(res=>{
            console.log(res)
            if(res.status===201){
                alert("User Created Successfully")
                setUser({
                    name:"",
                    email:"",
                    phone:"",
                    password:""
                })
            }
            else{
                alert("Some Error")
            }
        })
    }

    function handleChange(e){
        setUser({...user, [e.target.name]:e.target.value})
        console.log(`${JSON.stringify(user)}`)
    }
    return(
        <Container>
        <Row className="justify-content-md-center">
                <Col xs={8} sm={8} lg={8} className="pt-4">
                    <h2>Add User (Functional Component)</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Control type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control type="number" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" type='submit'>Submit</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddUser;