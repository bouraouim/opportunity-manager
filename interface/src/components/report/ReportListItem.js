import React from 'react';

function ReportListItem(props) {
    

    let total2022=0;
    let total2023=0;
    let total2024=0;
    let total2025=0;
        props.data.revenueLocalPart.map((y)=>{
        if(y.year==2022){
             y.months.map(m=>{
                total2022=m.value+total2022
                return 0
            })
        }
        if(y.year==2023){
              y.months.map(m=>{
                total2023=m.value+total2023
                return 0
            })
        }
        if(y.year==2024){
              y.months.map(m=>{
                total2024=m.value+total2024
                return 0
            })
        }
        if(y.year>2025){
              y.months.map(m=>{
                total2025=m.value+total2025
                return 0
            })
        }
    })

    const undefinedHndler=(v)=>{
if(v==undefined){
    return "undefined"
}
else{return v}
    }
    const delvergule=(v)=>{
        if(v.length>0 && v[v.length - 1].slice(-1)==",")
     {
     v[v.length - 1]=v[v.length - 1].slice(0, -1)}
     return v
    }

    
    return (
            <>
  <tr >
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                <h4>{props.data.reference}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm"> 
                <h4>{props.data.creationDate}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.data.description}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.data.customer.name}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.data.countries.country}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.data["salesManager.firstname"]+" "+props.data["salesManager.lastname"]}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.data['businessunit.name'])}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.data['businessline.name'])}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{delvergule(props.data['department.name'])}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.data.stage}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.data.successRate}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{undefinedHndler( props.data.awardDatePlanned)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{undefinedHndler(props.data.awardDateAchieved)}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{props.data.totalValue}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{total2022}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{total2023}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{total2024}</h4>
            </td>
            <td key={Math.random().toString(36).substr(2, 9)} className="align-middle text-center text-sm">
                <h4 >{total2025}</h4>
            </td>
            
            
        </tr>
        
  </>
    );
}

export default ReportListItem;