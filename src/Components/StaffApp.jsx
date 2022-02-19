import React, { useState, useEffect } from 'react';
import AddMember from './AddMember';
import StaffCard from './StaffCard';
import StaffTable from './StaffTable';

const Staffapp = (props) => {
    const Dataset = props.staffDetails;

    const [data, setData] = useState([])
    const [screen, setScreen] = useState(window.screen.width)
    const [alert, setAlert] = useState(false)
    const [toggleAddStaff, setToggleAddStaff] = useState(false)
    const [toggleEditStaff, setToggleEditStaff] = useState(false)
    const [memberID, setMemberID] = useState(null)
    const [val, setVal] = useState("")
    const [showCard, setShowCard] = useState(false)


    const HandleScreen = (e) => {
        setScreen(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener("resize", HandleScreen)
        if (screen <= 1160) {
            setShowCard(true)
        }
        else {
            setShowCard(false)
        }
        return () => window.removeEventListener("resize", HandleScreen)

    }, [screen])


    useEffect(() => {

        setData(props.staffDetails)

    }, [props.staffDetails]);

    useEffect(() => {
        window.setTimeout(() => {
            setAlert(false)
        }, 3000)
    }, [alert])

    const HandleSubmit = (e) => {
        e.preventDefault()
        if (val) {
            const updateItem = Dataset.filter((curVal) => {
                return (curVal.role === val | curVal.vertical === val | curVal.location === val | curVal.name === val | curVal.phone === val
                    | curVal.email === val | curVal.access === val);
            })
            setData(updateItem)
            setVal("")
        }

    }

    return (
        <div className='container-fluid main-body'>
            {toggleAddStaff ? <AddMember reloadData={props.reloadData} closeModal={setToggleAddStaff} heading={"Add Staff Details"} /> : ''}
            {toggleEditStaff ? <AddMember memberID={memberID} reloadData={props.reloadData} closeModal={setToggleEditStaff} heading={"Edit Staff Details"} /> : ''}

            {/* HEADER */}
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <h3 className="navbar-brand">SANJAY</h3>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <span className="nav-link">Manage Staff</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <section className='table-responsive main-table-body'>
                {alert ?

                    <div className="alert alert-warning d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div>
                            Staff Member Deleted
                        </div>
                    </div> :
                    // <div className="alert-warning alert-deco" role="alert">
                    //     <p><i className="fa fa-bell"></i> Staff Member Deleted</p>
                    // </div> :
                    ''}

                <div className='heading row'>
                    <div className='col-md-6 col-sm-6 action-button1 my-2'>
                        <button className='btn btn-outline-dark' onClick={() => setToggleAddStaff(!toggleAddStaff)}>Add Member</button>
                    </div>
                    <div className='col-md-6 col-sm-6 search-box my-2'>
                        <form className="d-flex float-end" onSubmit={(e) => HandleSubmit(e)}>
                            <input className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={val}
                                onChange={(e) => setVal(e.target.value)}
                            />
                            <button className="btn btn-outline-dark me-2" type="submit">Search</button>
                            <button className="btn btn-warning" type="button" onClick={() => setData(props.staffDetails)}>Refresh</button>
                        </form>
                    </div>
                </div>

                {showCard ?
                    <StaffCard
                        data={data}
                        memberID={setMemberID}
                        toggleEditStaff={setToggleEditStaff}
                        alert={setAlert}
                        reloadData={props.reloadData}
                    /> :
                    <StaffTable
                        data={data}
                        memberID={setMemberID}
                        toggleEditStaff={setToggleEditStaff}
                        alert={setAlert}
                        reloadData={props.reloadData}
                    />}
            </section>
        </div>
    );
}

export default Staffapp;
