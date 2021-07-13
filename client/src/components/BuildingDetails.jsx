import React from 'react'
import { useQuery } from '@apollo/client'
import { getBuildingQuery} from "../GraphQL/Queries"


export default function BuildingDetails({ buildingInfo }) {
    // console.log("Building info value: ", {buildingInfo});
    const { error, loading, data } = useQuery(getBuildingQuery,
        {
       variables: { id: buildingInfo },
        }
    )
    
    

    if (loading) return null;
    if (error) return `Error! ${error}`;
    // console.log("BuildingDetails", data)
  
    return (
        <div id="building-details">
            <h2>Building Details:</h2>
             <ul>
            {/* {loading && <h2>Loading...</h2>} */}
                <li>Name: {data.building.name}</li>
                <li><p>Location: {data.building.location}</p></li>
                <li><p>Architect: {data.building.architect.name}</p></li>
                
                <p>All buildings by architect:</p>
                <ul className="other-buildings">
                    {
                        data.building.architect.buildings.map((item)=>{
                            return <li key={ item.id}>{item.name}</li>
                        })
                    }
                </ul>
            </ul>
        </div>
    )
}
