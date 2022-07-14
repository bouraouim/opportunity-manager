import { useSelect } from "@mui/base";
import {useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../store/auth-context";

function Selecthook() {
    const authctx = useContext(AuthContext);
    const [initBu, setInitBu] = useState(false);
    const [initBl, setInitBl] = useState(false); 
    const [initArea, setInitArea] = useState(false); 
    const [initDep, setInitDep] = useState(false); 
    const [bldata, setBldata] = useState([]);
    const [departmentdata, setdepartmentdata] = useState([]);
    const [areadata, setareadata] = useState([]);
    const [geographyData, setgeographydata] = useState([]);
    const [budata, setBudata] = useState([]);
    const [choiceBu, setchoiceBu] = useState(true);
    const [choiceBl, setchoiceBl] = useState(true);
    const [choiceArea, setchoiceArea] = useState(true);
    const [linkBu, setLinkBu] = useState('');
    const [linkBl, setLinkBl] = useState('');
    const [linkArea, setLinkArea] = useState('');

    const changeBuInit = () => {
        setInitBu(!initBu);
        setInitBl(!initBl);
        setInitArea(!initArea);
        setLinkBl("");
    }
    const changeBlInit = () => {
        setInitBl(!initBl);
    }
    const changeAreaInit = () => {
        setInitArea(!initArea);
    }
    useEffect( () => {
        setInitDep(!initDep);
    },[initBu,initBl])
    const blChoiceHandler = (event,s) => {
        if((event.target.value).length>0){
            setchoiceBl(false);
            let link = '';
            event.target.value.map((v)=>{
                link=link+'&businessline.id%5B%5D='+v
            })
            setLinkBl(link);
            link = link + linkBu;
            console.log('http://localhost:8000/api/departments?page=1&itemsPerPage=1&pagination=false'+link)
            //department
            axios.get('http://localhost:8000/api/departments?page=1&itemsPerPage=1&pagination=false'+link,{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                const table=(response.data["hydra:member"].map(d=>{
                    return{
                        id: d.id,
                        name:d.name,
                    } 
                }))
                setdepartmentdata(table);
            }).catch(error=>{
            console.error(error);
            }) 
        }
        else {setchoiceBl(true)
            setLinkBl("");
        }
        setdepartmentdata([]);
    }
    const [areaLink, setAreaLink] = useState('');
    useEffect(() => {
        axios.get('http://localhost:8000/api/geographies?page=1&itemsPerPage=1&pagination=false'+areaLink,{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                const table=(response.data["hydra:member"].map(d=>{
                    return{
                        id: d.id,
                        name:d.country,
                    } 
                }))
                console.log(table);
                setgeographydata(table);
            }).catch(error=>{
            console.error(error);
            }) 
    },[areaLink])
    const areaChoiceHandler = (event,s) => {
        if(((event.target.value).length>0)){
            setchoiceArea(false);
            let link = '';
            event.target.value.map((v)=>{
                link = link+'&area.id%5B%5D='+v
            })
            setAreaLink(link);
            console.log(link);
            // link=link+linkBu
            console.log('http://localhost:8000/api/geographies?page=1&itemsPerPage=30&pagination=false'+link)
        }
        else {
            setchoiceArea(true);
        }
        setgeographydata([]);
    }
    const buChoiceHandler = (event,s) => {
        if((event.target.value).length>0){
            setchoiceBu(false);
            let link = '';
            event.target.value.map((v)=>{
                link = link+'&businessunit.id%5B%5D='+v;
            })
            setLinkBu(link);
            //businessline
            axios.get('http://localhost:8000/api/businesslines?page=1&pagination=false'+link,{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                const table=(response.data["hydra:member"].map(d=>{
                    return{
                        id: d.id,
                        name:d.name,
                    } 
                }))
                setBldata(table);
            }).catch(error=>{
            console.error(error);
            })
            //area
            axios.get('http://localhost:8000/api/areas?page=1&itemsPerPage=1&pagination=false'+link,{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                const table=(response.data["hydra:member"].map(d=>{
                    return{
                        id: d.id,
                        name:d.name,
                    } 
                }))
                setareadata(table);
            }).catch(error=>{
            console.error(error);
            })
        }
        else {setchoiceBu(true)
            setLinkBu("");
            setBldata([]);
        }
        console.log("aaaaaaaaaaaa")
        setchoiceBl(true);
    // setareadata([])
    // setchoiceArea(true)
    }
    useEffect(()=>{
        //businessunit
        axios.get('http://localhost:8000/businessunit/read') 
        .then(response=>{
            const table=(response.data.map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setBudata(table);
        }).catch(error=>{
        console.error(error);
        }) 
    },[]) 

    return {buChoiceHandler, areaChoiceHandler, blChoiceHandler, changeAreaInit, changeBlInit, changeBuInit, choiceBu, choiceBl, choiceArea,
        bldata, departmentdata, areadata, geographyData, budata, initBu, initBl, initArea, initDep
    };
}
export default Selecthook;