import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Addmember = (props) => {
    const [vertics, setVertics] = useState([]);
    const [location, setLocation] = useState([]);
    const [role, setRole] = useState(null);
    const [access, setAccess] = useState([]);
    const [data, setData] = useState(
        {
            'name': '',
            'phone': '',
            'email': '',
            'vertical': '',
            'role': '',
            'access': '',
            'location': ''
        }
    )

    useEffect(() => {
        if (props.memberID) {
            axios
                .get(`https://sanjayrht.github.io/staff-app-api/staffDetails.json/${props.memberID}/`)
                .then((res) => {
                    setData(res.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }, [props.memberID])


    useEffect(() => {
        axios
            .get("https://sanjayrht.github.io/staff-app-api/vertical.json")
            .then((res) => {
                setVertics(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        axios
            .get("https://sanjayrht.github.io/staff-app-api/location.json")
            .then((res) => {
                setLocation(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        axios
            .get("https://sanjayrht.github.io/staff-app-api/access.json")
            .then((res) => {
                setAccess(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const HandleChange = (e) => {
        const { name, value } = e.target;
        if (name === "vertical") {

            vertics.map((curElem) => {
                if (curElem.varName === value) {
                    setRole(curElem.rName)
                }
                return null
            })
        }
        setData({ ...data, [name]: value })
    }

    const HandleSubmit = (e) => {
        e.preventDefault()

        if (props.memberID) {
            axios
                .put(`https://sanjayrht.github.io/staff-app-api/staffDetails.json/${props.memberID}`, data)
                .then(() => {
                    props.reloadData(Date())
                    props.closeModal(false)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            axios
                .post("https://sanjayrht.github.io/staff-app-api/staffDetails.json/", data)
                .then(() => {
                    props.reloadData(Date())
                    props.closeModal(false)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    return (
        <div className='my-modal container-fluid'>
            <div className='add-member-body'>
                <div className='container-fluid header1'>
                    <h4>{props.heading}</h4>
                </div>

                <form className="row g-3" onSubmit={HandleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text"
                            className="form-control"
                            name='name'
                            placeholder='Enter Name'
                            value={data.name}
                            onChange={HandleChange}
                            required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input type="tel"
                            maxLength={10}
                            pattern="[0-9]{10}"
                            className="form-control"
                            name="phone"
                            placeholder='Enter Phone Number'
                            value={data.phone}
                            onChange={HandleChange}
                            required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email"
                            className="form-control"
                            name="email"
                            placeholder='Enter Email'
                            value={data.email}
                            onChange={HandleChange}
                            required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="location" className="form-label">Location</label>

                        <select name="location" id="location" className='form-control' onChange={HandleChange}>
                            <option value="">Select Location</option>
                            {location.map((curElem) => {
                                return (
                                    <option key={curElem.id} value={curElem.locName}>{curElem.locName}</option>
                                )
                            })
                            }
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="vertical" className="form-label">Vertical</label>

                        <select name="vertical" id="vertical" className='form-control' onChange={HandleChange}>
                            <option value="">Select Vertical Options</option>

                            {vertics.map((curElem) => {

                                return (
                                    <option key={curElem.id} value={curElem.varName}>{curElem.varName}</option>
                                )
                            })
                            }
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="role" className="form-label">Role</label>

                        <select name="role" id="role" className='form-control' onChange={HandleChange}>
                            {role ?
                                <>
                                    <option value="">Select Role</option>
                                    {role.map((curElem) => {
                                        return (
                                            <option key={curElem.id} value={curElem.roleName}>{curElem.roleName}</option>
                                        )
                                    })}
                                </>
                                : ''}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="access" className="form-label">Access</label>

                        <select name="access" id="access" className='form-control' onChange={HandleChange}>
                            <option value="">Select Access</option>

                            {access.map((curElem) => {
                                return (
                                    <option key={curElem.id} value={curElem.accName}>{curElem.accName}</option>
                                )
                            })
                            }
                        </select>
                    </div>
                    <div className='col-md-12 submit-buttons'>
                        <button className='btn form-btn1' type='submit'>Submit</button>
                        <button className='btn form-btn2' type='button' onClick={() => props.closeModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Addmember;
