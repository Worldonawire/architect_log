import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
// import { graphql } from 'react-apollo';
import {getBuildingsQuery} from "../GraphQL/Queries"
import BuildingDetails from "./BuildingDetails"




function BuildingList() {
    const [buildingInfo, setBuildingInfo] = useState("")

    const { error, loading, data } = useQuery(getBuildingsQuery,
        {
        variables: { id: buildingInfo },
        }
    );
    
    
    const [listbuilding, setlistBuilding] = useState([])

    useEffect(()=> {
        if (data) {
            console.log("data:", data);
            console.log("inside useEffect", data.buildings)
        // setBuildingInfo(data)
        setlistBuilding(data.buildings)
        }
    }, [data])

    // if (loading) return null;
    if (error) return `Error! ${error}`;
    return (
        <div>
            {" "}
            <ul id="building-list">
            {loading && <h1>Loading...</h1>}
            {listbuilding.map((val)=> {
              return <li key={val.id} onClick={(e)=> {setBuildingInfo(val.id)}}>{val.name}</li>
            })}  
            </ul>
            {buildingInfo && <BuildingDetails buildingInfo={buildingInfo}></BuildingDetails>}
        </div>
    );
}

export default BuildingList;


// class BuildingList extends Component {
//     displayBuildings() {
//         let data = this.props.data;
//         console.log(data)
//         if(data.loading) {
//             return(<div>Loading buildings...</div>);
//         } else {
//             return data.buildings.map(building => {
//                 return (
//                     <li key={building.id}>{building.name}</li>
//                 )
//             })
//         }
//     }
// }

// render() {
//     return (
//         <div>
//             <ul id='building-list'>
//                 {this.displayBuildings()}
//             </ul>
//         </div>
//     )
// }

// export default graphql(getBuildingsQuery)(BuildingList);