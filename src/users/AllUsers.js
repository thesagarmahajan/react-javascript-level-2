import { Component } from "react";
import {Button, Form, Table, Modal} from "react-bootstrap"

class UserEditModal extends Component{
    constructor(props){
        super(props)
        this.state={
            udata:{
                name:"",
                email:"",
                phone:""
            }
        }
    }

    handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]:value})
        console.log(value)
    }


    render(){
        
        return(
            <Modal show={this.props.editmodal} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={(e)=>this.props.handleEditModalSubmit(e,this.state.udata)}>
                        <Form.Group className='mb-3'>
                            <Form.Control type="text" name="name" value={this.state.udata.name} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control type="email" name="email" value={this.state.udata.email} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control type="number" name="phone" value={this.state.udata.phone} onChange={this.handleChange}/>
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button type="submit">SUBMIT</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

class UserInfoRow extends Component{
    baseUrl="http://localhost:8080"

    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.email}</td>
                <td>{this.props.phone}</td>
                <td>
                    <Button variant="info" type="button" onClick={this.props.handleEdit}>E</Button>
                    <Button variant="danger" type="button" onClick={this.props.handleDelete}>D</Button>
                </td>
            </tr>
        )
    }
}

class AllUsers extends Component{

    baseUrl="http://localhost:8080"

    constructor(props){
        super(props)
        this.state = {
            udata:[],
            editModal:false,
            userToUpdate:{},
            updatedUserData:{}
        }
    }

    componentDidMount(){
        fetch(this.baseUrl+"/user/all").then(res=>res.json()).then(data=>this.setState({udata:data}))
    }


    handleUpdate = () => {
        console.log("This is handleUpdate")
    }


    handleDelete = (id) =>{
        fetch(this.baseUrl+"/user/delete/"+id, {method:"DELETE"}).then(res=>{
            if(true){
                alert("User Deleted Successfully")
                let filteredUsers = this.state.udata.filter(user=>{
                    if(user.id!=id){
                        return user
                    }
                })
                this.setState({udata:filteredUsers})
            }
            else{
                alert("Some Error")
            }
        })
    }

    handleEdit = (user)=>{
        this.setState({
            userToUpdate:user,
            editModal:true
        })
    }

    handleClose = () => {
        console.log("Closing")
        this.setState({editModal:false})
    }

    onEditModalSubmit = (e, udata) => {
        e.preventDefault()
        console.log(e)
        console.log(udata)
    }

    render(){
        return (
            <>
                <Table stripped="1" border="1" hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.udata.map(user=>{
                                return <UserInfoRow id={user.id} name={user.name} email={user.email} phone={user.phone} handleDelete={()=>this.handleDelete(user.id)} handleEdit={()=>this.handleEdit(user)}/>
                            })
                        }
                    </tbody>
                </Table>
                <UserEditModal udata={this.state.userToUpdate} editmodal={this.state.editModal} handleClose={this.handleClose} handleEditModalSubmit={(e, udata)=>this.onEditModalSubmit(e, udata)} />
            </>
        )
    }
}

export default AllUsers;