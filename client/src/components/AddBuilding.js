import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { getArchitectsQuery, getBuildingsQuery } from "../GraphQL/Queries"
import { addBuildingMutation } from "../GraphQL/Mutations" 


function AddBuilding() {
    // Form states
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [architectId, setArchitectId] = useState("");

    const [addBuilding] = useMutation(addBuildingMutation);

    const {error, loading, data} = useQuery(getArchitectsQuery);
    console.log(data);
    const [architect, setArchitect] = useState([])

    useEffect(()=> {
        if (data) {
        setArchitect(data.architects)
        }
    }, [data])

    const addBuild = () => {
        addBuilding({
            variables: {
                name: name,
                location: location,
                architectId: architectId
            },
            refetchQueries: [{query: getBuildingsQuery}]
        })
    }

    // if (error) {
    //     console.log("Mutation error: ", error);
    // }

    return (
        <div>
        
            <form id="add-building">
            <h2>Add Building Info:</h2>
                <div className="field">
                    <label>Building name:</label>
                    <input type="text" onChange={(e)=>{setName(e.target.value)}}/> 
                </div>

                <div className="field">
                    <label>Location:</label>
                    <input type="text" onChange={(e)=>{setLocation(e.target.value)}}/> 
                </div>

                <div className="field">
                    <label>Architect:</label>
                    <select onChange={(e)=>{setArchitectId(e.target.value)}}>
                        <option>Select Architect</option> 
                        {architect.map((val)=> {
                            return <option key={val.id} value={val.id}>{val.name}</option>
                        })}
                    </select>
                </div>

                <button onClick={addBuild}>Please add me</button>

            </form>
        </div>
    )
}

export default AddBuilding