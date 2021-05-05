import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
// import { graphql } from 'react-apollo';
import {getBuildingsQuery} from "../GraphQL/Queries"
import BuildingDetails from "./BuildingDetails"



function BuildingList() {
    const [buildingInfo, setBuildingInfo] = useState("")

    const {error, loading, data } = useQuery(getBuildingsQuery);
    console.log(data);
    const [listbuilding, setlistBuilding] = useState([])

    useEffect(()=> {
        if (data) {
        console.log("inside useEffect", data.buildings)
        setlistBuilding(data.buildings)
        }
    }, [data])


    return (
        <div>
            {" "}
            <ul id="building-list">
            {listbuilding.map((val)=> {
              return <li key={val.id} onClick={(e)=> {setBuildingInfo(val.id)}}>{val.name}</li>
            })}  
            </ul>
            <BuildingDetails buildingInfo={buildingInfo}/>
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