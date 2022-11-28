import {baseurl} from "../globals/Config"
import {Button, Form, Table, Modal, Container} from "react-bootstrap"
import { useEffect, useState } from "react"

function UserEditModal(props){
    return (
        <Modal show={props.modalVisibility} onHide={props.handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Control type="text" name="name" value={props.userToUpdate.name} onChange={props.handleModalFormChange}  />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control type="email" name="email" value={props.userToUpdate.email} onChange={props.handleModalFormChange} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control type="number" name="phone" value={props.userToUpdate.phone} onChange={props.handleModalFormChange} />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button type="submit">SUBMIT</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

function UserInfoRow(props){
    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>
                <Button variant="info" type="button" onClick={props.handleEditButtonClick}>E</Button>
                <Button variant="danger" type="button" onClick={props.deleteUser}>D</Button>
            </td>
        </tr>
    )
}
function AllUsers(){

    let [users, setUsers] = useState([])
    let [modalVisibility, setModalVisibility] = useState(false)
    let [userToUpdate, setUserToUpdate] = useState({
        name:"",
        email:"",
        phone:""
    })

    function deleteUser(id){
        fetch(baseurl+"/users/"+id, {method:"DELETE"}).then(res=>{
            console.log(res.status==200)
            if(true){
                alert("User Deleted Successfully")
                let filteredUsers = users.filter(user=>{
                    if(user.id!=id){
                        return user
                    }
                })
                setUsers(filteredUsers)
            }
            else{
                alert("Some Error")
            }
        })
    }

    function getData(){
        fetch(baseurl+"/users").then(res=>res.json()).then(data=>setUsers(data))
    }

    function handleEditButtonClick(user){
        setModalVisibility(true)
        setUserToUpdate(user)
    }

    function handleModalClose() {
        console.log("Closing")
        setModalVisibility(false)
    }

    function handleModalFormChange(e){
        setUserToUpdate({...userToUpdate, [e.target.name]:e.target.value})
        console.log(userToUpdate)
    }
    
    useEffect(()=>{
        getData()
    }, [])
    
    
    return (
        <>
        <Container>
        <h1>Functional CRUD</h1>
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
                            users.map(user=>{
                                return <UserInfoRow id={user.id} name={user.name} email={user.email} phone={user.phone} deleteUser={()=>deleteUser(user.id)} handleEditButtonClick={()=>handleEditButtonClick(user)}  />
                            })
                        }
                    </tbody>
                </Table>
                </Container>
                <UserEditModal userToUpdate={userToUpdate} handleModalClose={()=>handleModalClose()} modalVisibility={modalVisibility} handleModalFormChange={(e)=>handleModalFormChange(e)} />
                </>
    )
}

export default AllUsers;