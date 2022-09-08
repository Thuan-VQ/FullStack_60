import React, { useState, useContext } from 'react';
import {data, member} from '../data/member';

// B1: Khởi tạo context
const personContext = React.createContext([]);


export default function ContextApi () { 
    
    const [people, setPeople] = useState(member);
    const [newName, setNewName] = useState('');

    const removePerson = (id) => {
        setPeople((people) => {
            return people.filter((e) => e.id !== id )
        })
    }
    
    const addMember = (name) => {
        const newMember = {
            id: people.length + 1,
            name: name
        }

        setPeople([...people, newMember])
    }

    const handleCreate = (event) => {
        event.preventDefault();
        addMember(newName)
    }
    
    return(
        // B2: Khởi tạo provider để wrapper lại các component khác
        <personContext.Provider value= {{people, removePerson}}>
            <UserList />

            <form onSubmit={handleCreate}>
                <input onChange={(event) => setNewName(event.target.value)}></input>
                <button> add new member</button>
            </form>
        </personContext.Provider>
    )
}

const UserList = () => {
    //B3: Sử dụng data từ component gốc
    const peopleData = useContext(personContext);
    return(
       <>
        {peopleData.people.map((member, index) => {
            return <SingelPerson key={index} {...member} />
        })}
       </>
    )
}

const SingelPerson = (props) => {
    const { removePerson } = useContext(personContext)
    return(
        <>
            <h1> {props.name} </h1> <br />
            <button onClick={()=> removePerson(props.id)}> Remove User</button>
        </>
    )
}


