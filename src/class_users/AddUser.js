// Imported bootstrap.min.css in index.js file only once
// import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Row, Button, Col} from 'react-bootstrap'
import {baseurl} from "../globals/Config"
const { Component } = require("react");

class AddUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:"",
            email:"",
            phone:"",
            password:""
        }
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        console.log(this.state)
        fetch(baseurl+"/user/new", {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(this.state)
        }).then(res=>{
            if(res.status===200){
                alert("User Created Successfully")
                this.setState({
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
    handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]:value})
    }
    render(){
        return (
            <Row className="justify-content-md-center">
                <Col xs={8} sm={8} lg={8} className="pt-4">
                    <h1>Add User</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control type="number" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Phone" />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" type='submit'>Submit</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default AddUser;