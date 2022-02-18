import React from 'react';
import axios from 'axios';
const StaffCard = (props) => {

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
        props.data.map((curElem) => {
            return (
                <div key={curElem.id} className="card mb-3">
                    <div className="card-header text-center text-uppercase card-header">
                        {curElem.name}
                    </div>
                    <div className="card-body row">
                        <div className='col-md-6'>
                            <p>PHONE NUMBER : {curElem.phone}</p>
                        </div>
                        <div className='col-md-6'>
                            <p>EMAIL : {curElem.email}</p>
                        </div>
                        <div className='col-md-6'>
                            <p>VERTICAL : {curElem.vertical}</p>
                        </div>
                        <div className='col-md-6'>
                            <p>ROLE : {curElem.role}</p>
                        </div>
                        <div className='col-md-6'>
                            <p>ACCESS : {curElem.access}</p>
                        </div>
                        <div className='col-md-6'>
                            <p>LOCATION : {curElem.location}</p>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <button className="delete" type="button" onClick={() => onDelete(curElem.id)}><i className="fa fa-trash"></i></button>
                        <button className="edit" type="button" onClick={() => onEdit(curElem.id)}><i className="fa fa-edit"></i></button>

                    </div>
                </div>
            )
        })
    );
}

export default StaffCard;
