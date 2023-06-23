import React, { useState,useEffect } from "react";
import "./Accordion.css";
import users from "../../data/celebrities.json";
import { MdOutlineDelete, MdOutlineEdit, MdOutlineCancel, MdOutlineCheckCircle } from 'react-icons/md';
import { useGlobalContext } from "../Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Accordion = () => {
    const [selected, setSelected] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [userData, setUserData] = useState(users);
    const [selectedUser, setSelectedUser] = useState({ age: '', gender: '', country: '', description: '' });
    const [checkEmpty,setCheckEmpty]=useState(false);
    const [showSave,setShowSave]=useState(false);
    const [originalData,setOriginalData]=useState(userData);

    var {userTyped} = useGlobalContext();

    const toggle = (key) => {
        if (editMode == true) {
            toast.error('You are in Edit Mode', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        if (deleteMode == true) {
            return;
        }

        if (selected === key) {
            setSelected(null);

            return;
        }
        setSelected(key);

    };

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const userDelete = (index) => {
        setDeleteMode(true);
        if (!toast.isActive('deleteConfirmation')) {
            toast.error(
                <div id="user-delete">
                    <p>Are you sure you want to delete ?</p>
                    <div>
                        <button title="Cancel" className="button" onClick={() => setDeleteMode(false)} >Cancel</button>
                        <button title="Delete" className="button-delete" onClick={() => deleteUser(index)} >Delete</button>
                    </div>
                </div>,
                {
                    toastId: 'deleteConfirmation',
                    position: "top-center",
                    autoClose: false,
                    closeButton: false,
                    draggable: true,
                    hideProgressBar: true,
                    theme: "colored",

                }
            )
        };

    }

    const deleteUser = (index) => {
        setDeleteMode(false);
        toggle(index);
        setUserData((prev) => {
            const newArray = [...prev];
            newArray.splice(index, 1);
            return newArray;
        });
    }

    const userEdit = (first, last, dob, age) => {
        if (age == "") {
            age = calculateAge(dob);
        }
        if (age >= 18) {
            setEditMode(true);
        }
        else {
            callAgeWarning(first, last);
        }
    }

    const userCancel = () => {
        setSelectedUser({ age: '', gender: '', country: '', description: '' });
        setUserData(userData);
        setEditMode(false);
        setShowSave(false);
    }

    const userSave = (id) => {
       if(checkEmpty == true)
       {
           return;
       }
        setEditMode(false);
        const newUser = userData;
        newUser.map((user) => {
            if (user.id == id) {
                selectedUser.age != "" ? user.age = selectedUser.age : "";
                selectedUser.gender != "" ? user.gender = selectedUser.gender : "";
                selectedUser.country != "" ? user.country = selectedUser.country : "";
                selectedUser.description != "" ? user.description = selectedUser.description : "";
            }
        });
        setUserData(newUser);
        setShowSave(false);
    }

 


    const handleInputChange = (event) => {
        if (event.target.value == "") {
            setCheckEmpty(true);
            toast.warning(`${event.target.name} Field can't be kept empty`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
        const { value } = event.target;        
        const sanitizedValue = value.replace(/[^A-Za-z\s]/g, '');
        event.target.value = sanitizedValue;
        setSelectedUser((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            };
        })
        setShowSave(true);
        setCheckEmpty(false);
    }
    };



    const callAgeWarning = (first, last) => {
        toast.warn(`Hey ${first} ${last} , You can't Edit this Form as your age is below 18`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleUserChange = (event) => {
        if (event.target.value == "") {
            setCheckEmpty(true);
            toast.warning(`${event.target.name} Field can't be kept empty`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
            setShowSave(true);
        setSelectedUser((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            };
                })
        setCheckEmpty(false);
    }

    }
    

    useEffect(() => {    
              userTyped = userTyped.toLowerCase();   
            if(userTyped != "") 
            {
            const filteredResults = originalData.filter((user) =>
            {               
               return (user.first.toLowerCase() + " " + user.last.toLowerCase()).includes(userTyped);
            }            
          );
          setUserData(filteredResults);
        }
        else{
            setUserData(originalData);
        }      
          return () => {};
    },[userTyped]);
   

    

    return (
        <>
            <ToastContainer
                position="top-center"
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme="colored"
                toastStyle={{ backgroundColor: "white", width: "100%", height: '100%' }}
            />
            {
                userData.map(({ id, first, last, dob, age, gender, email, picture, country, description }, index) => (
                    <div className="accordion-item" id={id} key={id}>
                        <div className="accordion-title" key={index} onClick={() => toggle(index)}>
                            <div className="accordion-title-box">
                                <img src={picture} alt="picture" className="accordion-profile" />
                                <h2>{first} {last}</h2>
                            </div>
                            <span>{selected === index ? '-' : '+'}</span>
                        </div>
                        <div className={
                            selected === index ? 'accordion-content show' : 'accordion-content'
                        }>
                            {
                                editMode ? (
                                    <div>
                                        <div className="accordion-content-wrapper">
                                            <div className='accordion-content-age'>
                                                <h4>Age</h4>
                                                <input className="accordion-edit-input" name="age" type="number" defaultValue={calculateAge(dob)} onChange={handleUserChange} /> Years

                                            </div>
                                            <div className='accordion-content-gender'>
                                                <h4>Gender</h4>
                                                <select className="accordion-edit-input select-input" name="gender" id="gender" defaultValue={gender} onChange={handleUserChange}>
                                                    <option value="male">MALE</option>
                                                    <option value="female">FEMALE</option>
                                                    <option value="transgender">TRANSGENDER</option>
                                                    <option value="rather not say">RATHER NOT SAY</option>
                                                    <option value="other">OTHER</option>
                                                </select>

                                            </div>
                                            <div className='accordion-content-country'>
                                                <h4>Country</h4>
                                                <input className="accordion-edit-input"
                                                    type="text"
                                                    name="country"
                                                    onChange={handleInputChange}
                                                    defaultValue={country} />

                                            </div>
                                        </div>


                                        <div className='accordion-content-description'>
                                            <h4>Description</h4>

                                            <textarea className="accordion-textarea" defaultValue={description} rows="5" cols="100"
                                                name="description" onChange={handleUserChange} >
                                            </textarea>


                                        </div>

                                    </div>


                                ) : (
                                    <div>

                                        <div className="accordion-content-wrapper">
                                            <div className='accordion-content-age'>
                                                <h4>Age</h4>
                                                <p>{age != "" ? age : calculateAge(dob)} Years</p>

                                            </div>
                                            <div className='accordion-content-gender'>
                                                <h4>Gender</h4>
                                                <p>{gender.toUpperCase()}</p>

                                            </div>
                                            <div className='accordion-content-country'>
                                                <h4>Country</h4>
                                                <p>{country}</p>

                                            </div>

                                        </div>
                                        <div className='accordion-content-description'>
                                            <h4>Description</h4>
                                            <p>
                                                {description}
                                            </p>

                                        </div>
                                    </div>


                                )
                            }



                            <div>
                                {
                                    editMode ? (
                                        <div className="accordion-icons">
                                            <MdOutlineCancel id="accordion-cancel" onClick={userCancel} />
                                          {showSave && <MdOutlineCheckCircle id="accordion-save" onClick={() => { userSave(id) }} />}
                                        </div>
                                    ) : (
                                        <div className="accordion-icons">
                                            <MdOutlineDelete id="accordion-delete" onClick={() => userDelete(index)} />
                                            <MdOutlineEdit id="accordion-edit" onClick={() => userEdit(first, last, dob, age)} />
                                        </div>



                                    )

                                }

                            </div>

                        </div>
                    </div >



                ))
            }




        </>

    )


}

export default Accordion;






