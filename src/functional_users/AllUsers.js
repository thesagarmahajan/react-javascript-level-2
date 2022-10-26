import {baseurl} from "../globals/Config"
import {Button, Form, Table, Modal, Container} from "react-bootstrap"
import { useEffect, useState } from "react"

function UserInfoRow(props){
    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td>
                <Button variant="info" type="button">E</Button>
                <Button variant="danger" type="button">D</Button>
            </td>
        </tr>
    )
}
function AllUsers(){

    let [users, setUsers] = useState([])

    function getData(){
        fetch(baseurl+"/user/all").then(res=>res.json()).then(data=>setUsers(data))
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
                                return <UserInfoRow id={user.id} name={user.name} email={user.email} phone={user.phone} />
                            })
                        }
                    </tbody>
                </Table>
                </Container>
                </>
    )
}

export default AllUsers;