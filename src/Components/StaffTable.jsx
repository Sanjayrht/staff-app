import React from 'react';
import axios from 'axios';


const StaffTable = (props) => {
    
    let index = 0
    const onEdit = (id) => {
        props.memberID(id)
        props.toggleEditStaff(true)
    }
    
    const onDelete = (id) => {
        axios
            .delete(`http://localhost:8000/staffDetails/${id}/`)
            .then((res) => {
                if (res.status === 200) {
                    props.alert(true)
                    props.reloadData(Date())
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    
    return (
        <div className='container-fluid table-responsive table-scollable'>
            {console.log(props.data)}
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Vertical</th>
                    <th scope="col">Role</th>
                    <th scope="col">Access</th>
                    <th scope="col">Location</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody className='table-for-scroll'>
                {props.data.map((curElem) => {

                    return (
                        <tr key={curElem.id} >
                            <th scope="row">{index += 1}</th>
                            <td>{curElem.name}</td>
                            <td>{curElem.phone}</td>
                            <td>{curElem.email}</td>
                            <td>{curElem.vertical}</td>
                            <td>{curElem.role}</td>
                            <td>{curElem.access}</td>
                            <td>{curElem.location}</td>
                            <td className='action-button2'>
                                <button type="button" onClick={() => onDelete(curElem.id)}><i className="fa fa-trash"></i></button>
                                <button type="button" onClick={() => onEdit(curElem.id)}><i className="fa fa-edit"></i></button>
                            </td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    </div>
    );
}

export default StaffTable;
