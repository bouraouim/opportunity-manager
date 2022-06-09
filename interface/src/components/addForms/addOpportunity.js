import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useContext, Fragment, forwardRef } from 'react';
import axios from 'axios';
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { Pencil, FileEarmarkText, TicketDetailed, PersonBadge, Inboxes, Inbox, CreditCard2Front, People, Briefcase, Flag, Bullseye, ArrowDownUp, Funnel, Calendar, CurrencyEuro, ArrowRight, Save, Trash } from "react-bootstrap-icons";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AuthContext from "../../store/auth-context";
import "../../index.css";
import { NotificationManager } from 'react-notifications';
import _ from "lodash";

const steps = ["Header", "Detail","Revenue"];
const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor: "lightgrey",
    zIndex: 1,
    color: "#fff",
    width: 40,
    height: 40,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundColor: "#007AC0",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundColor: "#007AC0"
    })
}));
ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node
};
function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
    const icons = {
      1: <Pencil size={17}/>,
      2: <TicketDetailed size={17}/>,
      3: <FileEarmarkText size={17}/>,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
}
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#007AC0",
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#007AC0"
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "lightgrey",
    borderRadius: 1
  }
}));
const AddOpportunity = () => {
    const navigate = useNavigate();
    const authctx = useContext(AuthContext);
    var disabled = true;
    var disableAddRow = true;
    var currDate = new Date();
    var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
    var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
    var fullDate = currDate.getFullYear() + "-" + month + "-" + date;
    const stages = [
        {id: 1, name: "O0-Opportunity Identified"},
        {id: 2, name: "O1-RFI"},
        {id: 3, name: "O2-RFQ Expected"},
        {id: 4, name: "OX1-No Bid"},
        {id: 5, name: "OX3-Cancelled"},
        {id: 6, name: "O3-Answer in Progress"},
        {id: 7, name: "O4-Offer Submitted"},
        {id: 8, name: "O5-Won Not Booked"},
        {id: 9, name: "OX2-Lost"},
        {id: 10, name: "O6-Booked"}
    ];
    const Months = [
        {id: 1, name: "Jan"},
        {id: 2, name: "Feb"},
        {id: 3, name: "Mar"},
        {id: 4, name: "Apr"},
        {id: 5, name: "May"},
        {id: 6, name: "Jun"},
        {id: 7, name: "Jul"},
        {id: 8, name: "Aug"},
        {id: 9, name: "Sep"},
        {id: 10, name: "Oct"},
        {id: 11, name: "Nov"},
        {id: 12, name: "Dec"}
    ];
    const [id, setId] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [stage, setStage] = useState('');
    const [stageValid, setStageValid] = useState(false);
    const [inputStageStyle, setInputStageStyle] = useState("form-control form-placeholder");
    const [iconStageStyle, setIconStageStyle] = useState("input-group-text");
    const [successsRate, setSuccessRate] = useState(0);
    const [salesManagerData, setSalesManagerData] = useState([]);
    const [salesManager, setSalesManager] = useState(authctx.user.id);
    const [user, setUser] = useState('');
    const [businessUnitData, setBusinessUnitData] = useState([]);
    const [businessUnit, setBusinessUnit] = useState('');
    const [businessUnitValid, setBusinessUnitValid] = useState(true);
    const [inputBusinessUnitStyle, setInputBusinessUnitStyle] = useState("form-control form-placeholder");
    const [iconBusinessUnitStyle, setIconBusinessUnitStyle] = useState("input-group-text");
    const [businessLineData, setBusinessLineData] = useState([]);
    const [businessLine, setBusinessLine] = useState('');
    const [businessLineValid, setBusinessLineValid] = useState(true);
    const [inputBusinessLineStyle, setInputBusinessLineStyle] = useState("form-control form-placeholder");
    const [iconBusinessLineStyle, setIconBusinessLineStyle] = useState("input-group-text");
    const [disableBL, setDisableBL] = useState(true);
    const [departmentData, setDepartmentData] = useState([]);
    const [department, setDepartment] = useState('');
    const [deptValid, setDeptValid] = useState(true);
    const [inputDeptStyle, setInputDeptStyle] = useState("form-control form-placeholder");
    const [iconDeptStyle, setIconDeptStyle] = useState("input-group-text");
    const [disableDept, setDisableDept] = useState(true);
    const [areaData, setAreaData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [country, setCountry] = useState('');
    const [countryValid, setCountryValid] = useState(true);
    const [inputCountryStyle, setInputCountryStyle] = useState("form-control form-placeholder");
    const [iconCountryStyle, setIconCountryStyle] = useState("input-group-text");
    const [countryDetails, setCountryDetails] = useState([]);
    const [disableCountry, setDisableCountry] = useState(true);
    const [reference, setReference] = useState(Date.now().toString(36).substr(2,5) + Math.random().toString(36).substr(2,5));
    const [customerData, setCustomerData] = useState([]);
    const [customer, setCustomer] = useState('');
    const [customerValid, setCustomerValid] = useState(false);
    const [inputCustomerStyle, setInputCustomerStyle] = useState("form-control form-placeholder");
    const [iconCustomerStyle, setIconCustomerStyle] = useState("input-group-text");
    const [customerDetails, setCustomerDetails] = useState([]);
    const [disableCust, setDisableCust] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [inputDescriptionStyle, setInputDescriptionStyle] = useState("form-control form-placeholder");
    const [iconDescriptionStyle, setIconDescriptionStyle] = useState("input-group-text");
    const [inBudget, setInBudget] = useState(false);
    const [revenueStartPlanned, setRevenueStartPlanned] = useState("");
    const [revenueStartPlannedValid, setRevenueStartPlannedValid] = useState(false);
    const [inputrevenueStartPlannedStyle, setInputRevenueStartPlannedStyle] = useState("form-control form-placeholder");
    const [revenueStartAchieved, setRevenueStartAchieved] = useState("");
    const [contractDuration, setContractDuration] = useState("");
    const [contractDurationValid, setContractDurationValid] = useState(false);
    const [inputContractDurationStyle, setInputContractDurationStyle] = useState("form-control form-placeholder");
    const [iconContractDurationStyle, setIconContractDurationStyle] = useState("input-group-text");
    const [totalValue, setTotalValue] = useState(0);
    const [fullValue, setFullValue] = useState(0);
    const [presalesData, setPresalesData] = useState([]);
    const [presales, setPresales] = useState('');
    const [disabledPresales, setDisabledPresales] = useState(true);
    const [presalesReq, setPresalesReq] = useState(false);
    const [inputPresalesStyle, setInputPresalesStyle] = useState("form-control form-placeholder");
    const [iconPresalesStyle, setIconPresalesStyle] = useState("input-group-text");
    const [presalesValid, setPresalesValid] = useState(true);
    const [open, setOpen] = useState(false);
    const [RFQDatePlanned, setRFQDatePlanned] = useState(false);
    const [RFQDatePlannedValue, setRFQDatePlannedValue] = useState("");
    const [inputRFQDatePlannedStyle, setInputRFQDatePlannedStyle] = useState("form-control form-placeholder");
    const [RFQDatePlannedValid, setRFQDatePlannedValid] = useState(true);
    const [RFQDateAchieved, setRFQDateAchieved] = useState(false);
    const [RFQDateAchievedValue, setRFQDateAchievedValue] = useState("");
    const [bidReviewDatePlanned, setBidReviewDatePlanned] = useState(false);
    const [bidReviewDatePlannedValue, setBidReviewDatePlannedValue] = useState("");
    const [bidReviewDateAchieved, setBidReviewDateAchieved] = useState(false);
    const [bidReviewDateAchievedValue, setBidReviewDateAchievedValue] = useState("");
    const [submissionDatePlanned, setSubmissionDatePlanned] = useState(false);
    const [submissionDatePlannedValue, setSubmissionDatePlannedValue] = useState("");
    const [inputSubmissionDatePlannedStyle, setInputSubmissionDatePlannedStyle] = useState("form-control form-placeholder");
    const [submissionDatePlannedValid, setSubmissionDatePlannedValid] = useState(true);
    const [submissionDateAchieved, setSubmissionDateAchieved] = useState(false);
    const [submissionDateAchievedValue, setSubmissionDateAchievedValue] = useState("");
    const [awardDatePlanned, setAwardDatePlanned] = useState(false);
    const [awardDatePlannedValue, setAwardDatePlannedValue] = useState("");
    const [inputAwardDatePlannedStyle, setInputAwardDatePlannedStyle] = useState("form-control form-placeholder");
    const [awardDatePlannedValid, setAwardDatePlannedValid] = useState(true);
    const [awardDateAchieved, setAwardDateAchieved] = useState(false);
    const [awardDateAchievedValue, setAwardDateAchievedValue] = useState("");
    const [signatureDatePlanned, setSignatureDatePlanned] = useState(false);
    const [signatureDatePlannedValue, setSignatureDatePlannedValue] = useState("");
    const [inputSignatureDatePlannedStyle, setInputSignatureDatePlannedStyle] = useState("form-control form-placeholder");
    const [signatureDatePlannedValid, setSignatureDatePlannedValid] = useState(true);
    const [signatureDateAchieved, setSignatureDateAchieved] = useState(false);
    const [signatureDateAchievedValue, setSignatureDateAchievedValue] = useState("");
    const [reason, setReason] = useState('');
    const [comment, setComment] = useState('');
    const [currLocalPartData, setCurrLocalPartData] = useState([]);
    const [currLocalPart, setCurrLocalPart] = useState('');
    const [currLocalPartValid, setCurrLocalPartValid] = useState(false);
    const [inputCurrLocalPartStyle, setInputCurrLocalPartStyle] = useState("form-control form-placeholder");
    const [iconCurrLocalPartStyle, setIconCurrLocalPartStyle] = useState("input-group-text");
    const [currLocalPartDetails, setCurrLocalPartDetails] = useState("");
    const [currLocalPartAppDate, setCurrLocalPartAppDate] = useState("");
    const [currHQPartData, setCurrHQPartData] = useState([]);
    const [currHQPart, setCurrHQPart] = useState('');
    const [currHQPartValid, setCurrHQPartValid] = useState(false);
    const [inputCurrHQPartStyle, setInputCurrHQPartStyle] = useState("form-control form-placeholder");
    const [iconCurrHQPartStyle, setIconCurrHQPartStyle] = useState("input-group-text");
    const [currHQPartDetails, setCurrHQPartDetails] = useState("");
    const [currHQPartAppDate, setCurrHQPartAppDate] = useState("");
    const [addRow, setAddRow] = useState(false);
    const [key, setKey] = useState(1);
    const [pl, setPl] = useState('');
    const [plData, setPlData] = useState([]);
    const [plDetails, setPlDetails] = useState('');
    const [plValid, setplValid] = useState(false);
    const [inputPlStyle, setInputPlStyle] = useState("form-control form-placeholder");
    const [commentPl, setCommentPl] = useState('');
    const [localPartPL, setLocalPartPL] = useState(0);
    const [localPartPLValid, setLocalPartPLValid] = useState(false);
    const [inputLocalPartPLStyle, setInputLocalPartPLStyle] = useState("form-control form-placeholder");
    const [HQPartPL, setHQPartPL] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [data, setData] = useState([]);

    const [nbTables, setNbTables] = useState(0);
    const [revenueLocalPart, setrevenueLocalPart] = useState([]);
    const [valLocalPart, setValLocalPart] = useState(0);
    const [totalLocalPart, setTotalLocalPart] = useState(0);

    useEffect(async() => {
        axios.get('http://localhost:8000/user/salesManagers',{params: {email: authctx.user.email}},{headers: {Authorization: "Bearer "+authctx.token}})
        .then(response=>{
            const table = (response.data.map(d=>{
                return{
                    id: d.id,
                    name: d.firstname + " " + d.lastname,
                    businessUnit: d.businessunit,
                    businessline: d.businessline,
                    departement: d.departement
                } 
            }))
            setSalesManagerData(table);
        }).catch(error=>{
            console.error(error);
        })
        axios.get('http://localhost:8000/opportunity/lastId',{headers: {Authorization: "Bearer "+authctx.token}})
        .then(response=>{
            setId(Object.values(response.data[0])[0]);
        }).catch(error=>{
            console.error(error);
        })
        const r = await axios.get('http://localhost:8000/api/users/'+salesManager,{headers: {Authorization: "Bearer "+authctx.token}});
        await setUser(r.data);
    },[salesManager])
    useEffect(() => {
        setSuccessRate(0);
        setRFQDatePlanned(false);
        setRFQDatePlannedValid(true);
        setSubmissionDatePlanned(false);
        setSubmissionDatePlannedValid(true);
        setAwardDatePlanned(false);
        setAwardDatePlannedValid(true);
        setSignatureDatePlanned(false);
        setSignatureDatePlannedValid(true);
        setPresalesReq(false);
        setPresalesValid(true);
        setOpen(false);
        if(stage === "O2-RFQ Expected" || stage === "OX1-No Bid" || stage === "OX3-Cancelled" || stage === "O3-Answer in Progress" || stage === "O4-Offer Submitted" || stage === "O5-Won Not Booked" || stage === "OX2-Lost" || stage === "O6-Booked"){
            setOpen(true);
            setRFQDatePlanned(true);
            setRFQDatePlannedValid(false);
            if(stage === "O3-Answer in Progress" || stage === "O4-Offer Submitted" || stage === "O5-Won Not Booked" || stage === "OX2-Lost" || stage === "O6-Booked"){
                setSubmissionDatePlanned(true);
                setSubmissionDatePlannedValid(false);
                setAwardDatePlanned(true);
                setAwardDatePlannedValid(false);
                setSignatureDatePlanned(true);
                setSignatureDatePlannedValid(false);
                setPresalesReq(true);
                setPresalesValid(false);
                if(stage === "O5-Won Not Booked" || stage === "O6-Booked")
                    setSuccessRate(100);
            }
        }
    },[stage])
    useEffect(async() => {
        setBusinessUnit("");
        setBusinessUnitData([]);
        setBusinessLine("");
        setBusinessLineData([]);
        setDepartment("");
        setDepartmentData([]);
        setCustomer("");
        setCustomerData([]);
        setCountry("");
        setCountryData([]);
        setAreaData([]);
        setPresales("");
        setPresalesData([]);
        setBusinessUnitValid(true);
        setBusinessLineValid(true);
        setDeptValid(true);
        setCountryValid(true);
        setInputBusinessUnitStyle("form-control form-placeholder");
        setIconBusinessUnitStyle("input-group-text");
        setInputBusinessLineStyle("form-control form-placeholder");
        setIconBusinessLineStyle("input-group-text");
        setInputDeptStyle("form-control form-placeholder");
        setIconDeptStyle("input-group-text");
        setInputCountryStyle("form-control form-placeholder");
        setIconCountryStyle("input-group-text");
        if(user !== undefined){
            if(user.businessunit !== undefined){    
                if(user.businessunit.length > 0){
                    await setBusinessUnitData(user.businessunit);
                    setBusinessUnit(user.businessunit[0].id);
                    setBusinessUnitValid(true);
                    if(user.businessline.length > 0){
                        await setBusinessLineData(user.businessline);
                        setBusinessLine(user.businessline[0].id);
                        setBusinessLineValid(true);
                        setDisableBL(false);
                        if(user.department.length > 0){
                            await setDepartmentData(user.department);
                            setDepartment(user.department[0].id);
                            setDisableDept(false);
                            setDeptValid(true);
                        }
                    }
                }
                else{
                    setBusinessUnitValid(false);
                    await axios.get('http://localhost:8000/businessunit/read',{headers: {Authorization: "Bearer "+authctx.token}})
                    .then(response=>{
                        const table = (response.data.map(d=>{
                            return{
                                id: d.id,
                                name:d.name
                            } 
                        }))
                        setBusinessUnitData(table);
                    }).catch(error=>{
                        console.error(error);
                    })
                    setDisableBL(true);
                    setDisableDept(true);
                    setDisabledPresales(true);
                    setDisableCountry(true);
                }
            }
        }
    },[user])
    useEffect(async() => {
        if(businessUnit !== ""){
            setBusinessLineValid(false);
            setBusinessLine('');
            setDepartment('');
            setAreaData([]);
            setPresales('');
            setDisableDept(true);
            setDisabledPresales(true);
            setDisableBL(false);
            setDisableCountry(false);
            setCountryValid(false);
            await axios.get('http://localhost:8000/businessunit/blByBu',{params: {id: businessUnit}},{headers: {Authorization: "Bearer "+authctx.token}})
            .then(response=>{
                const table = (response.data.map(d=>{
                    return{
                        id: d.id,
                        name:d.name
                    } 
                }))
                setBusinessLineData(table);
            }).catch(error=>{
                console.error(error);
            })
            await axios.get('http://localhost:8000/businessunit/areaByBu',{params: {id: businessUnit}},{headers: {Authorization: "Bearer "+authctx.token}})
            .then(response=>{
                const table = (response.data.map(d=>{
                    return{
                        id: d.id,
                        name: d.name,
                    } 
                }))
                setAreaData(table);
            }).catch(error=>{
                console.error(error);
            })
        }
    },[businessUnit])
    useEffect(async() => {
        if(areaData.length > 0){
            var aux = [];
            await areaData.map((v)=>{
                axios.get('http://localhost:8000/area/getGeoByArea',{params: {id: v.id}},{headers: {Authorization: "Bearer "+authctx.token}}) 
                .then(response=>{
                    const table = (response.data.map(d=>{
                        return{
                            id: d.id,
                            name:d.country,
                        }
                    }))
                    aux = aux.concat(table);
                    setCountryData(aux);
                }).catch(error=>{
                    console.error(error);
                })
            })
        }
    },[areaData])
    useEffect(async() => {
        if(countryData.length === 0){
            setDisableCountry(true);
            setDisableCust(true);
            setCountryValid(false);
            setCustomerValid(false);
            setCountry("");
            setCountryStyle();
        }
    },[countryData])
    useEffect(async() => {
        if(country !== ""){
            setCustomer('');
            setDisableCust(false);
            setCustomerValid(false);
            await axios.get('http://localhost:8000/geography/custByCount',{params: {id: country}},{headers: {Authorization: "Bearer "+authctx.token}})
            .then(response=>{
                const table = (response.data.map(d=>{
                    return{
                        id: d.id,
                        name:d.name
                    } 
                }))
                setCustomerData(table);
            }).catch(error=>{
                console.error(error);
            })
            await axios.get('http://localhost:8000/api/geographies/'+country,{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                setCountryDetails(response.data);
            })
        }
    },[country])
    useEffect(async() => {
        if(businessLineData.length === 0){
            setDisableBL(true);
            setDisableDept(true);
            setBusinessLineValid(true);
            setDeptValid(true);
            setDisabledPresales(true);
            setBusinessLineStyle();
            setBusinessLine("");
            setInputBusinessLineStyle("form-control form-placeholder");
            setIconBusinessLineStyle("input-group-text");
        }
        await axios.get('http://localhost:8000/api/customers/'+customer,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setCustomerDetails(response.data);
        })
    },[businessLineData, customer])
    useEffect(async() => {
        if(businessLine !== ""){
            setDisableDept(false);
            setDeptValid(false);
            setDepartment('');
            await axios.get('http://localhost:8000/businessline/deptByBl',{params: {id: businessLine}},{headers: {Authorization: "Bearer "+authctx.token}})
            .then(response=>{
                const table = (response.data.map(d=>{
                    return{
                        id: d.id,
                        name:d.name
                    } 
                }))
                setDepartmentData(table);
            }).catch(error=>{
                console.error(error);
            })
            await axios.get('http://localhost:8000/businessline/plByBl',{params: {id: businessLine}},{headers: {Authorization: "Bearer "+authctx.token}})
            .then(response=>{
                const table = (response.data.map(d=>{
                    return{
                        id: d.id,
                        name:d.name
                    } 
                }))
                setPlData(table);
            }).catch(error=>{
                console.error(error);
            })
        }
    },[businessLine])
    useEffect(async() => {
        if(departmentData.length === 0){
            setDisableDept(true);
            setDeptValid(true);
            setDepartment("");
            setDisabledPresales(true);
            setInputDeptStyle("form-control form-placeholder");
            setIconDeptStyle("input-group-text");
        }
        if(customerData.length === 0){
            setDisableCust(true);
            setCustomerValid(true);
            setInputCustomerStyle("form-control form-placeholder");
            setIconCustomerStyle("input-group-text");
        }
    },[departmentData, customerData])
    useEffect(async() => {
        if(department !== ""){
            setDisabledPresales(false);
            setPresales('');
            await axios.get('http://localhost:8000/department/presByDept',{params: {id: department}},{headers: {Authorization: "Bearer "+authctx.token}})
            .then(response=>{
                const table = (response.data.map(d=>{
                    return{
                        id: d.id,
                        name:d.name
                    } 
                }))
                setPresalesData(table);
            }).catch(error=>{
                console.error(error);
            })
        }
    },[department])
    useEffect(async() => {
        if(presalesData.length === 0){
            setDisabledPresales(true);
            setPresalesValid(true);
        }
    },[presalesData])
    useEffect(async () => {
        if(contractDuration !== ""){
            var test = new Date(revenueStartPlanned);
            test.setMonth(test.getMonth() + parseInt(contractDuration));
            setRevenueStartAchieved(new Date(test));
        }
    },[contractDuration])




    useEffect(async () => {
        axios.get('http://localhost:8000/currency/read',{headers: {Authorization: "Bearer "+authctx.token}})
        .then(response=>{
            const table = (response.data.map(d=>{
                return{
                    name: d.code,
                } 
            }))
            setCurrHQPartData([...new Set(table.map(obj => obj.name))].map(code => {return table.find(obj => obj.name === code)}));
            setCurrLocalPartData([...new Set(table.map(obj => obj.name))].map(code => {return table.find(obj => obj.name === code)}));
        }).catch(error=>{
            console.error(error);
        })
    },[])
    useEffect(async () => {
        if(currLocalPartDetails !== ""){
            var local = new Date(currLocalPartDetails.appDate);
            setCurrLocalPartAppDate((local.getDate() <= 9 ? '0': '') + (local.getDate())+ "/" +(local.getMonth() <= 9 ? '0': '') + (local.getMonth()+1)+ "/" +local.getFullYear());
        }
    },[currLocalPartDetails])
    useEffect(async () => {
        if(currHQPartDetails !== ""){
            var HQ = new Date(currHQPartDetails.appDate);
            setCurrHQPartAppDate((HQ.getDate() <= 9 ? '0': '') + (HQ.getDate())+ "/" +(HQ.getMonth() <= 9 ? '0': '') + (HQ.getMonth()+1)+ "/" +HQ.getFullYear());
        }
    },[currHQPartDetails])
    useEffect(async () => {
        if(pl !== ""){
            await axios.get('http://localhost:8000/api/productlines/'+pl,{headers: {Authorization: "Bearer "+authctx.token}})
            .then(response=>{
                setPlDetails(response.data);
            }).catch(error=>{
                console.error(error);
            })
        }
    },[pl])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const onStageChangeHandler = (event) => {
        setStage(event.target.value);
        setStageValid(true);
    }
    const setStageStyle = () => {
        if(stageValid){
            setInputStageStyle("form-control");
            setIconStageStyle("input-group-text");
        }
        else{
            setInputStageStyle("form-control is-invalid");
            setIconStageStyle("input-group-text invalide")
        }
    }
    const handleSuccessRateChange = (event, newValue) => {
        setSuccessRate(newValue);
    };
    const onSalesManagerChangeHandler = (event) => {
        setSalesManager(event.target.value);
        setBusinessUnit('');
        setBusinessLine('');
        setDepartment('');
    }
    const onBusinessUnitChangeHandler = (event) => {
        setBusinessUnit(event.target.value);
        setBusinessUnitValid(true);
    }
    const setBusinessUnitStyle = (event) => {
        if(businessUnitValid){
            setInputBusinessUnitStyle("form-control");
            setIconBusinessUnitStyle("input-group-text");
        }
        else{
            setInputBusinessUnitStyle("form-control is-invalid");
            setIconBusinessUnitStyle("input-group-text invalide")
        }
    }
    const onBusinessLineChangeHandler = (event) => {
        setBusinessLine(event.target.value);
        setBusinessLineValid(true);
    }
    const setBusinessLineStyle = (event) => {
        if(businessLineValid){
            setInputBusinessLineStyle("form-control");
            setIconBusinessLineStyle("input-group-text");
        }
        else{
            setInputBusinessLineStyle("form-control is-invalid");
            setIconBusinessLineStyle("input-group-text invalide")
        }
    }
    const onDepartmentChangeHandler = (event) => {
        setDepartment(event.target.value);
        setDeptValid(true);
    }
    const setDepartmentStyle = (event) => {
        if(deptValid){
            setInputDeptStyle("form-control");
            setIconDeptStyle("input-group-text");
        }
        else{
            setInputDeptStyle("form-control is-invalid");
            setIconDeptStyle("input-group-text invalide")
        }
    }
    const onCountryChangeHandler = (event) => {
        setCountry(event.target.value);
        setCountryValid(true);
    }
    const setCountryStyle = () => {
        if(countryValid){
            setInputCountryStyle("form-control");
            setIconCountryStyle("input-group-text");
        }
        else{
            setInputCountryStyle("form-control is-invalid");
            setIconCountryStyle("input-group-text invalide")
        }
    }
    const onCustomerChangeHandler = (event) => {
        setCustomer(event.target.value);
        setCustomerValid(true);
    }
    const setCustomerStyle = () => {
        if(customerValid){
            setInputCustomerStyle("form-control");
            setIconCustomerStyle("input-group-text");
        }
        else{
            setInputCustomerStyle("form-control is-invalid");
            setIconCustomerStyle("input-group-text invalide")
        }
    }
    const onDescriptionChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setDescriptionValid(true);
            setDescription(event.target.value);
        }
        else{
            setDescriptionValid(false);
            setDescription("");
        }
    }
    const setDescriptionStyle = () => {
        if(descriptionValid){
            setInputDescriptionStyle("form-control");
            setIconDescriptionStyle("input-group-text");
        }
        else{
            setInputDescriptionStyle("form-control is-invalid");
            setIconDescriptionStyle("input-group-text invalide")
        }
    }
    const handleInBudgetChange = (event) => {
        setInBudget(event.target.checked);
    };
    const onRevenueStartPlannedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setRevenueStartPlannedValid(true);
            setRevenueStartPlanned(new Date(event.target.value));
        }
        else{
            setRevenueStartPlannedValid(false);
            setRevenueStartPlanned("");
        }
    }
    const setRevenueStartPlannedStyle = () => {
        if(revenueStartPlannedValid)
            setInputRevenueStartPlannedStyle("form-control");
        else
            setInputRevenueStartPlannedStyle("form-control is-invalid");
    }
    const onContractDurationChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setContractDurationValid(true);
            setContractDuration(event.target.value);
        }
        else{
            setContractDurationValid(false);
            setContractDuration("");
        }
    }
    const setContractDurationStyle = () => {
        if(contractDurationValid){
            setInputContractDurationStyle("form-control");
            setIconContractDurationStyle("input-group-text");
        }
        else{
            setInputContractDurationStyle("form-control is-invalid");
            setIconContractDurationStyle("input-group-text invalide");
        }
    }
    const onFullValueChangeHandler = (event) => {
        if((event.target.value).length > 0)
            setFullValue(event.target.value);
        else
            setFullValue(0);
    }
    const handleClick = () => {
        setOpen(!open);
    }
    const onRFQDatePlannedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setRFQDatePlannedValue(new Date(event.target.value));
            setRFQDatePlannedValid(true);
        }
        else{
            setRFQDatePlannedValue("");
            setRFQDatePlannedValid(false);
        }
    }
    const setRFQDatePlannedStyle = () => {
        if(RFQDatePlannedValid)
            setInputRFQDatePlannedStyle("form-control");
        else
            setInputRFQDatePlannedStyle("form-control is-invalid");
    }
    const onRFQDateAchievedChangeHandler = (event) => {
        if((event.target.value).length > 0)
            setRFQDateAchievedValue(new Date(event.target.value));
        else
            setRFQDateAchievedValue("");
    }
    const onBidReviewDatePlannedChangeHandler = (event) => {
        if((event.target.value).length > 0)
            setBidReviewDatePlannedValue(new Date(event.target.value));
        else
            setBidReviewDatePlannedValue("");
    }
    const onBidReviewDateAchievedChangeHandler = (event) => {
        if((event.target.value).length > 0)
            setBidReviewDateAchievedValue(new Date(event.target.value));
        else
            setBidReviewDateAchievedValue("");
    }
    const onSubmissionDatePlannedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setSubmissionDatePlannedValue(new Date(event.target.value));
            setSubmissionDatePlannedValid(true);
        }
        else{
            setSubmissionDatePlannedValue("");
            setSubmissionDatePlannedValid(false);
        }
    }
    const setSubmissionDatePlannedStyle = () => {
        if(submissionDatePlannedValid)
            setInputSubmissionDatePlannedStyle("form-control");
        else
            setInputSubmissionDatePlannedStyle("form-control is-invalid");
    }
    const onSubmissionDateAchievedChangeHandler = (event) => {
        if((event.target.value).length > 0)
            setSubmissionDateAchievedValue(new Date(event.target.value));
        else
            setSubmissionDateAchievedValue("");
    }
    const onAwardDatePlannedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setAwardDatePlannedValue(new Date(event.target.value));
            setAwardDatePlannedValid(true);
        }
        else{
            setAwardDatePlannedValue("");
            setAwardDatePlannedValid(false);
        }
    }
    const setAwardDatePlannedStyle = () => {
        if(awardDatePlannedValid)
            setInputAwardDatePlannedStyle("form-control");
        else
            setInputAwardDatePlannedStyle("form-control is-invalid");
    }
    const onAwardDateAchievedChangeHandler = (event) => {
        if((event.target.value).length > 0)
            setAwardDateAchievedValue(new Date(event.target.value));
        else
            setAwardDateAchievedValue("");
    }
    const onSignatureDatePlannedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setSignatureDatePlannedValue(new Date(event.target.value));
            setSignatureDatePlannedValid(true);
        }
        else{
            setSignatureDatePlannedValue("");
            setSignatureDatePlannedValid(false);
        }
    }
    const setSignatureDatePlannedStyle = () => {
        if(signatureDatePlannedValid)
            setInputSignatureDatePlannedStyle("form-control");
        else
            setInputSignatureDatePlannedStyle("form-control is-invalid");
    }
    const onSignatureDateAchievedChangeHandler = (event) => {
        if((event.target.value).length > 0)
            setSignatureDateAchievedValue(new Date(event.target.value));
        else
            setSignatureDateAchievedValue("");
    }
    const onPresalesChangeHandler = (event) => {
        setPresales(event.target.value);
        if(presalesReq)
            setPresalesValid(true);
    }
    const setPresalesStyle = () => {
        if(presalesValid){
            setInputPresalesStyle("form-control");
            setIconPresalesStyle("input-group-text");
        }
        else{
            setInputPresalesStyle("form-control is-invalid");
            setIconPresalesStyle("input-group-text invalide");
        }
    }
    const onReasonChangeHandler = (event) => {
        if((event.target.value).length > 0)
            setReason(event.target.value);
        else
            setReason("");
    }
    const onCommentChangeHandler = (event) => {
        if((event.target.value).length > 0)
            setComment(event.target.value);
        else
            setComment("");
    }
    const onCurrLocalPartChangeHandler = (event) => {
        if(event.target.value.length > 0){
            setCurrLocalPart(event.target.value);
            setCurrLocalPartValid(true);
            var date = (revenueStartPlanned.getDate() <= 9 ? '0': '') + (revenueStartPlanned.getDate());
            var month = (revenueStartPlanned.getMonth() <= 9 ? '0': '') + (revenueStartPlanned.getMonth()+1);
            axios.get('http://localhost:8000/currency/closestCurr',{params: {code: event.target.value, date : date + "/" + month + "/" + revenueStartPlanned.getFullYear()}},{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                setCurrLocalPartDetails(response.data[0]);
            })
        }
        else 
            setCurrLocalPartValid(false);
    }
    const setCurrLocalPartStyle = () => {
        if(currLocalPartValid){
            setInputCurrLocalPartStyle("form-control");
            setIconCurrLocalPartStyle("input-group-text");
        }
        else{
            setInputCurrLocalPartStyle("form-control is-invalid");
            setIconCurrLocalPartStyle("input-group-text invalide")
        }
    }
    const onCurrHQPartChangeHandler = (event) => {
        if(event.target.value.length > 0){
            setCurrHQPart(event.target.value);
            setCurrHQPartValid(true);
            var date = (revenueStartPlanned.getDate() <= 9 ? '0': '') + (revenueStartPlanned.getDate());
            var month = (revenueStartPlanned.getMonth() <= 9 ? '0': '') + (revenueStartPlanned.getMonth()+1);
            axios.get('http://localhost:8000/currency/closestCurr',{params: {code: event.target.value, date : date + "/" + month + "/" + revenueStartPlanned.getFullYear()}},{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                setCurrHQPartDetails(response.data[0]);
            })
        }
        else 
            setCurrHQPartValid(false);
    }
    const setCurrHQPartStyle = () => {
        if(currHQPartValid){
            setInputCurrHQPartStyle("form-control");
            setIconCurrHQPartStyle("input-group-text");
        }
        else{
            setInputCurrHQPartStyle("form-control is-invalid");
            setIconCurrHQPartStyle("input-group-text invalide")
        }
    }
    const onPlChangeHandler = (event) => {
        setPl(event.target.value);
        setplValid(true);
    }
    const setPlStyle = () => {
        if(plValid)
            setInputPlStyle("form-control");
        else
            setInputPlStyle("form-control is-invalid");
    }
    const onCommentPlChangeHandler = (event) => {
        setCommentPl(event.target.value);
    }
    const onLocalPartPLChangeHandler = (event) => {
        setLocalPartPL(event.target.value);
        setLocalPartPLValid(true);
        setHQPartPL(parseInt(event.target.value) * parseFloat(currHQPartDetails.euroCnvrRate));
        setTotalAmount(event.target.value);
    }
    const setLocalPartPLStyle = () => {
        if(localPartPL)
            setInputLocalPartPLStyle("form-control");
        else
            setInputLocalPartPLStyle("form-control is-invalid");
    }
    const saveRow = () => {
        var body = {
            id: key,
            productLine: plDetails.name,
            plid: pl,
            localPart: localPartPL,
            hqPart: HQPartPL,
            totalAmount: totalAmount,
            comment: commentPl
        }
        var aux = [];
        setTotalValue(totalValue + parseFloat(totalAmount))
        aux = aux.concat(data);
        aux.push(body);
        setData(aux);
        setKey(key + 1);
        setAddRow(false);
        setPl('');
        setCommentPl('');
        setLocalPartPL(0);
        setHQPartPL(0);
        setTotalAmount(0);
    }


    // if(activeStep === 0)
    //     disabled = stageValid && businessUnitValid && businessLineValid && deptValid && countryValid && customerValid && descriptionValid && revenueStartPlannedValid && contractDurationValid && RFQDatePlannedValid && submissionDatePlannedValid && awardDatePlannedValid && signatureDatePlannedValid && presalesValid;
    if(plValid && localPartPLValid)
        disableAddRow = false;
    // if(activeStep === 1)
    //     disabled = currLocalPartValid && currHQPartValid && (data.length >= 1);




    const updateRow = () => {
        var body = {
            id: key,
            productLine: plDetails.name,
            plid: pl,
            localPart: localPartPL,
            hqPart: HQPartPL,
            totalAmount: totalAmount,
            comment: commentPl
        }
        var aux = [];
        setTotalValue(totalValue + parseFloat(totalAmount))
        aux = aux.concat(data);
        aux.push(body);
        setData(aux);
        setKey(key + 1);
        setAddRow(false);
        setPl('');
        setCommentPl('');
        setLocalPartPL(0);
        setHQPartPL(0);
        setTotalAmount(0);
    }

    const deleteRow = (idR) => {
        console.log("test");
        // var aux = [];
        // data.map((v)=>{
        //     if(idR !== v.id){
        //         aux.push(v);
        //     }
        // })
        // setData(aux);
    }
    // console.log(data)






    const [IdMonthLocal, setIdMonthLocal] = useState("");
    const [IdYearLocal, setIdYearLocal] = useState("");

    const [revenueHQPart, setrevenueHQPart] = useState([]);
    const [valHQPart, setValHQPart] = useState(0);
    const [totalHQPart, setTotalHQPart] = useState(0);
    const [IdMonthHQ, setIdMonthHQ] = useState("");
    const [IdYearHQ, setIdYearHQ] = useState("");



    useEffect(() => {
        if(revenueStartAchieved !== ""){
            setNbTables(parseInt(revenueStartAchieved.getFullYear()) - parseInt(revenueStartPlanned.getFullYear()) + 1);
            var year = [];
            Months.map((v)=>{
                var o = {id: v.id, value: 0};
                year.push(o);
            })
            var body = [];
            for(var i = parseInt(revenueStartPlanned.getFullYear()); i <= parseInt(revenueStartAchieved.getFullYear()); i++){
                var t = {year: i, months: year};
                body.push(t);
            }
            setrevenueLocalPart(body);
            setrevenueHQPart(body);
        }
    },[revenueStartAchieved])


    useEffect(async () => {
        setTotalLocalPart(0);
        if(IdMonthLocal !== ""){
            var aux = revenueLocalPart;
            aux[IdYearLocal].months[IdMonthLocal-1].value = parseInt(valLocalPart);
            setrevenueLocalPart(aux);
        }
        var sum = 0;
        revenueLocalPart.map((v)=>{
            v.months.map((k)=>{
                sum += k.value;
            })
        })
        setTotalLocalPart(sum);
    },[valLocalPart])
    

    useEffect(async () => {
        setTotalHQPart(0);
        if(IdMonthHQ !== ""){
            var aux = revenueHQPart;
            aux[IdYearHQ].months[IdMonthHQ-1].value = parseInt(valHQPart);
            setrevenueHQPart(aux);
        }
        var sum = 0;
        revenueHQPart.map((v)=>{
            v.months.map((k)=>{
                sum += k.value;
            })
        })
        setTotalHQPart(sum);
    },[valHQPart])



    const onTotLocalPartValue = (event) => {
        if((event.target.value).length > 0)
            setValLocalPart(event.target.value);
        else
            setValLocalPart(0);
    }
    const onTotHQPartValue = (event) => {
        if((event.target.value).length > 0)
            setValHQPart(event.target.value);
        else
            setValHQPart(0);
    }
    const setLocalPartDates = (idMonth, idYear) => {
        setIdMonthLocal(idMonth);
        setIdYearLocal(idYear);
    }
    const setHQPartDates = (idMonth, idYear) => {
        setIdMonthHQ(idMonth);
        setIdYearHQ(idYear);
    }

console.log("local")
console.log(revenueLocalPart)
console.log("HQ")
console.log(revenueHQPart)



    const getStepContent = (step) => {
        switch(step){ 
            case 0 :
                return <>
                    <div className="card-body">
                        <form className="needs-validation">
                            <div className="row">
                                <div className="col-md">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Creation Date</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><Calendar/></span>
                                                    </div>
                                                    <input className="form-control" type="date" disabled value={fullDate}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Last Update Date</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><Calendar/></span>
                                                    </div>
                                                    <input className="form-control" type="date" disabled value={fullDate}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Last Stage Update Date</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><Calendar/></span>
                                                    </div>
                                                    <input className="form-control" type="date" disabled value={fullDate}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Sales Manager<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><PersonBadge size={17}/></span>
                                                    </div>
                                                    <Select sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onSalesManagerChangeHandler} className="form-control" value={salesManager} defaultValue={salesManager}>
                                                        {salesManagerData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Business Unit<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className={iconBusinessUnitStyle}><Inboxes size={17}/></span>
                                                    </div>
                                                    <Select onBlur={setBusinessUnitStyle} displayEmpty renderValue={businessUnit !== '' ? undefined : () => "Select a Business Unit"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onBusinessUnitChangeHandler} className={inputBusinessUnitStyle} value={businessUnit} defaultValue={businessUnit}>
                                                        {businessUnitData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {!businessUnitValid && <div className="invalid-feedback">Business Unit should not be empty</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Business Line<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className={iconBusinessLineStyle}><Inbox size={17}/></span>
                                                    </div>
                                                    <Select onBlur={setBusinessLineStyle} displayEmpty renderValue={businessLine !== '' ? undefined : () => "Select a Business Line"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onBusinessLineChangeHandler} className={inputBusinessLineStyle} value={businessLine} defaultValue={businessLine} disabled={disableBL}>
                                                        {businessLineData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {!businessLineValid && <div className="invalid-feedback">Business Line should not be empty</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Reference</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><CreditCard2Front size={17}/></span>
                                                    </div>
                                                    <input type="text" className="form-control" disabled placeholder="Reference" value={reference}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label className="form-control-label">Customer<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className={iconCustomerStyle}><People size={17}/></span>
                                                    </div>
                                                    <Select onBlur={setCustomerStyle} displayEmpty renderValue={customer !== '' ? undefined : () => "Select a Customer"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onCustomerChangeHandler} className={inputCustomerStyle} value={customer} disabled={disableCust}>
                                                        {customerData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {!customerValid && <div className="invalid-feedback">Customer should not be empty</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <br/>
                                            <label className="form-control-label">In Budget<span className="text-danger">*</span></label>&nbsp;&nbsp;&nbsp;
                                            <FormControlLabel control={<Switch checked={inBudget} onChange={handleInBudgetChange}/>}/>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Revenue Start Planned<span className="text-danger">*</span></label>
                                                <input type="date" onBlur={setRevenueStartPlannedStyle} onChange={onRevenueStartPlannedChangeHandler} className={inputrevenueStartPlannedStyle}/>
                                                {!revenueStartPlannedValid && <div className="invalid-feedback">Revenue Start Planned should not be empty</div>}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Contract Duration(months)<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className={iconContractDurationStyle}><CreditCard2Front size={17}/></span>
                                                    </div>
                                                    <input type="number" placeholder="Contract Duration" onBlur={setContractDurationStyle} onChange={onContractDurationChangeHandler} className={inputContractDurationStyle}/>
                                                    {!contractDurationValid && <div className="invalid-feedback">Contract Duration should not be empty</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Presales Engineer{presalesReq && <span className="text-danger">*</span>}</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className={iconPresalesStyle}><Briefcase size={17}/></span>
                                                    </div>
                                                    <Select onBlur={setPresalesStyle} displayEmpty renderValue={presales !== '' ? undefined : () => "Select a Presales Engineer"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onPresalesChangeHandler} className={inputPresalesStyle} value={presales} disabled={disabledPresales}>
                                                        {presalesData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {!presalesValid && <div className="invalid-feedback">Presales Engineer should not be empty</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label className="form-control-label">Reason (in case of lost/won)</label>
                                                <textarea rows="1" className="form-control" onChange={onReasonChangeHandler}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Stage<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className={iconStageStyle}><Briefcase size={17}/></span>
                                                    </div>
                                                    <Select onBlur={setStageStyle} displayEmpty renderValue={stage !== '' ? undefined : () => "Select a Stage"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} className={inputStageStyle} value={stage} onChange={onStageChangeHandler}>
                                                        {stages.map((d) => (
                                                            <MenuItem value={d.name} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {!stageValid && <div className="invalid-feedback">Stage should not be empty</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Success Rate<span className="text-danger">*</span></label>
                                                <br/>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs>
                                                        <Slider value={typeof successsRate === 'number' ? successsRate : 0} onChange={handleSuccessRateChange} aria-labelledby="input-slider"/>
                                                    </Grid>
                                                    <Grid item>
                                                        <label>{successsRate}%</label>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Department - Pole<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className={iconDeptStyle}><Flag size={17}/></span>
                                                    </div>
                                                    <Select multiple={false} onBlur={setDepartmentStyle} displayEmpty renderValue={department !== '' ? undefined : () => "Select a Department"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} onChange={onDepartmentChangeHandler} className={inputDeptStyle} value={department} defaultValue={department} disabled={disableDept}>
                                                        {departmentData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {!deptValid && <div className="invalid-feedback">Department should not be empty</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Country<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className={iconCountryStyle}><Bullseye size={17}/></span>
                                                    </div>
                                                    <Select onBlur={setCountryStyle} displayEmpty renderValue={country !== '' ? undefined : () => "Select a Country"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onCountryChangeHandler} className={inputCountryStyle} value={country} disabled={disableCountry}>
                                                        {countryData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    {!countryValid && <div className="invalid-feedback">Country should not be empty</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-control-label">Description<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className={iconDescriptionStyle}><FileEarmarkText size={17}/></span>
                                                    </div>
                                                    <textarea onBlur={setDescriptionStyle} onChange={onDescriptionChangeHandler} rows="1" className={inputDescriptionStyle}/>
                                                    {!descriptionValid && <div className="invalid-feedback">Description should not be empty</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Total Value</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><CurrencyEuro size={17}/></span>
                                                    </div>
                                                    <input className="form-control" type="number" disabled value={totalValue}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Full Value</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><CurrencyEuro size={17}/></span>
                                                    </div>
                                                    <input type="number" placeholder="Contract Duration(months)" className="form-control" value={fullValue} onChange={onFullValueChangeHandler}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-control-label">Comment</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><FileEarmarkText size={17}/></span>
                                                    </div>
                                                    <textarea rows="1" className="form-control" onChange={onCommentChangeHandler}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md">
                                    <List>
                                        <ListItemButton onClick={handleClick} sx={{backgroundColor:'#007AC0', '&:hover, &:focus': {backgroundColor: '#007AC0'}}}>
                                            <ListItemText primary="MILESTONES" primaryTypographyProps={{color: 'white', fontWeight: 'bold'}}/>
                                            {open ? <ExpandLess sx={{color: 'white'}}/> : <ExpandMore sx={{color: 'white'}}/>}
                                        </ListItemButton>
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                            <div className="row">
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">RFQ Date Planned{RFQDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <input type="date" onBlur={setRFQDatePlannedStyle} onChange={onRFQDatePlannedChangeHandler} className={inputRFQDatePlannedStyle}/>
                                                        {!RFQDatePlannedValid && <div className="invalid-feedback">RFQ Date Planned should not be empty</div>}

                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Bid Review Date Planned{bidReviewDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <input onChange={onBidReviewDatePlannedChangeHandler} className="form-control" type="date"/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Submission Date Planned{submissionDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <input type="date" onBlur={setSubmissionDatePlannedStyle} onChange={onSubmissionDatePlannedChangeHandler} className={inputSubmissionDatePlannedStyle}/>
                                                        {!submissionDatePlannedValid && <div className="invalid-feedback">Submission Date Planned should not be empty</div>}

                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Award Date Planned{awardDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <input type="date" onBlur={setAwardDatePlannedStyle} onChange={onAwardDatePlannedChangeHandler} className={inputAwardDatePlannedStyle}/>
                                                        {!awardDatePlannedValid && <div className="invalid-feedback">Award Date Planned should not be empty</div>}
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Signature Date Planned{signatureDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <input type="date" onBlur={setSignatureDatePlannedStyle} onChange={onSignatureDatePlannedChangeHandler} className={inputSignatureDatePlannedStyle}/>
                                                        {!signatureDatePlannedValid && <div className="invalid-feedback">Signature Date Planned should not be empty</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">RFQ Date Achieved{RFQDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <input className="form-control" type="date" onChange={onRFQDateAchievedChangeHandler}/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                <div className="form-group">
                                                        <label className="form-control-label">Bid Review Date Achieved{bidReviewDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <input className="form-control" type="date" onChange={onBidReviewDateAchievedChangeHandler}/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                <div className="form-group">
                                                        <label className="form-control-label">Submission Date Achieved{submissionDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <input className="form-control" type="date" onChange={onSubmissionDateAchievedChangeHandler}/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                <div className="form-group">
                                                        <label className="form-control-label">Award Date Achieved{awardDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <input className="form-control" type="date" onChange={onAwardDateAchievedChangeHandler}/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                <div className="form-group">
                                                        <label className="form-control-label">Signature Date Achieved{signatureDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <input className="form-control" type="date" onChange={onSignatureDateAchievedChangeHandler}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </Collapse>
                                    </List>
                                </div>
                            </div>
                        </form>
                    </div>
                </>;
            case 1 :
                return <>
                   <div className="card-body">
                        <form className="needs-validation">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="form-control-label">Country</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><Bullseye size={17}/></span>
                                            </div>
                                            <input type="text" className="form-control" value={countryDetails.country} disabled/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="form-control-label">Customer</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><People size={17}/></span>
                                            </div>
                                            <input type="text" className="form-control" value={customerDetails.name} disabled/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="form-control-label">Description</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><FileEarmarkText size={17}/></span>
                                            </div>
                                            <input type="text" className="form-control" value={description} disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label">Currency Local Part<span className="text-danger">*</span></label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className={iconCurrLocalPartStyle}><Briefcase size={17}/></span>
                                            </div>
                                            <Select onBlur={setCurrLocalPartStyle} displayEmpty renderValue={currLocalPart !== '' ? undefined : () => "Select a Currency Local Part"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onCurrLocalPartChangeHandler} className={inputCurrLocalPartStyle} value={currLocalPart}>
                                                {currLocalPartData.map((d) => (
                                                    <MenuItem value={d.name} key={d.name}>{d.name}</MenuItem>
                                                ))}
                                            </Select>
                                            {!currLocalPartValid && <div className="invalid-feedback">Currency Local Part should not be empty</div>}
                                        </div>
                                    </div>                                                
                                </div>                                            
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label">Euro ratio rate local part</label>
                                        <br/>
                                        <p>{currLocalPartDetails.euroCnvrRate}</p>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label">Update date ratio local part</label>
                                        <br/>
                                        <p>{currLocalPartAppDate}</p>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label">Currency HQ Part<span className="text-danger">*</span></label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className={iconCurrHQPartStyle}><Briefcase size={17}/></span>
                                            </div>
                                            <Select onBlur={setCurrHQPartStyle} displayEmpty renderValue={currHQPart !== '' ? undefined : () => "Select a Currency HQ Part"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onCurrHQPartChangeHandler} className={inputCurrHQPartStyle} value={currHQPart}>
                                                {currHQPartData.map((d) => (
                                                    <MenuItem value={d.name} key={d.name}>{d.name}</MenuItem>
                                                ))}
                                            </Select>
                                            {!currHQPartValid && <div className="invalid-feedback">Currency HQ Part should not be empty</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label">Euro ratio rate HQ part</label>
                                        <br/>
                                        <p>{currHQPartDetails.euroCnvrRate}</p>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label">Update date ratio HQ part</label>
                                        <br/>
                                        <p>{currHQPartAppDate}</p>
                                    </div>
                                </div>
                            </div>
                            <br/><br/><br/><br/>
                            <div className="row">
                                <div className="col-md">
                                    <div className="table-responsive">
                                        <table className="table align-items-center mb-2">
                                            <thead className="totTable">
                                                <tr>
                                                    <th className="text-center text-xs font-weight-bold">Line of products/services</th>
                                                    <th className="text-center text-xs font-weight-bold">Local Part<br/> (in currency)</th>
                                                    <th className="text-center text-xs font-weight-bold">Local Part (€)</th>
                                                    <th className="text-center text-xs font-weight-bold">HQ Part</th>
                                                    <th className="text-center text-xs font-weight-bold">Total Amount</th>
                                                    <th className="text-center text-xs font-weight-bold">Comment</th>
                                                    <th className="text-center text-xs font-weight-bold">Actions<br/><span onClick={()=>{setAddRow(true)}}><i className="ni fa-2x ni-fat-add"></i></span></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { addRow && 
                                                    <tr>
                                                        <td className="text-center text-xs font-weight-bold">
                                                            <Select onBlur={setPlStyle} displayEmpty renderValue={pl !== '' ? undefined : () => "Select a Product Line"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} className={inputPlStyle} value={pl} onChange={onPlChangeHandler}>
                                                                {plData.map((d) => (
                                                                    <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                                ))}
                                                            </Select>
                                                            {!plValid && <div className="invalid-feedback">Product Line should not be empty</div>}
                                                        </td>
                                                        <td className="text-center text-xs font-weight-bold">
                                                            <input type="number" placeholder="0 EUR" onBlur={setLocalPartPLStyle} onChange={onLocalPartPLChangeHandler} className={inputLocalPartPLStyle}/>
                                                        </td>
                                                        <td className="text-center text-xs font-weight-bold">
                                                            <input className="form-control" disabled value={localPartPL}/>
                                                        </td>
                                                        <td className="text-center text-xs font-weight-bold">
                                                            <input className="form-control" disabled value={HQPartPL}/>
                                                        </td>
                                                        <td className="text-center text-xs font-weight-bold">
                                                            <input className="form-control" disabled value={totalAmount}/>
                                                        </td>
                                                        <td className="text-center text-xs font-weight-bold">
                                                            <input placeholder="Comment" onChange={onCommentPlChangeHandler} className="form-control"/>
                                                        </td>
                                                        <td className="text-center text-xs font-weight-bold"><button className="btn bg-transparent" onClick={()=>{saveRow()}} disabled={disableAddRow}><Save size={15}/></button></td>
                                                    </tr>
                                                }
                                                { data.map((v)=>
                                                    <tr key={v.key}>
                                                        <td className="text-center text-xs font-weight-bold">{v.productLine}</td>
                                                        <td className="text-center text-xs font-weight-bold">{v.localPart}</td>
                                                        <td className="text-center text-xs font-weight-bold">{v.localPart}</td>
                                                        <td className="text-center text-xs font-weight-bold">{v.hqPart}</td>
                                                        <td className="text-center text-xs font-weight-bold">{v.totalAmount}</td>
                                                        <td className="text-center text-xs font-weight-bold">{v.comment}</td>
                                                        <td className="text-center text-xs font-weight-bold"><button className="btn bg-transparent" onClick={()=>{updateRow(v.key)}}><Pencil size={18} color="green"/></button>&nbsp;<button className="btn bg-transparent" onClick={()=>{deleteRow(v.key)}}><Trash size={18} color="red"/></button></td>
                                                    </tr>
                                                )}
                                                <tr>
                                                    <td className="text-center text-xs font-weight-bold" colSpan="4">Total</td>
                                                    <td className="text-center text-xs font-weight-bold">{totalValue} EUR</td>
                                                    <td className="text-center text-xs font-weight-bold">--</td>
                                                    <td className="text-center text-xs font-weight-bold">--</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </>;
            case 2 :
                return <>
                    <div className="card-body">
                        <form className="needs-validation">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="form-control-label">Country</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><Bullseye size={17}/></span>
                                            </div>
                                            <input type="text" className="form-control" value={countryDetails.country} disabled/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="form-control-label">Customer</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><People size={17}/></span>
                                            </div>
                                            <input type="text" className="form-control" value={customerDetails.name} disabled/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label className="form-control-label">Description</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><FileEarmarkText size={17}/></span>
                                            </div>
                                            <input type="text" className="form-control" value={description} disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="form-control-label">Revenue Start Planned</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><Calendar/></span>
                                            </div>
                                            <input className="form-control" value={(revenueStartPlanned.getDate() <= 9 ? '0': '') + (revenueStartPlanned.getDate())+ "/" +(revenueStartPlanned.getMonth() <= 9 ? '0': '') + (revenueStartPlanned.getMonth()+1)+ "/" +revenueStartPlanned.getFullYear()} disabled/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="noBorder"></th>
                                                <th scope="col" className="totTable">Total</th>
                                                <th scope="col" className="totTable">Target</th>
                                                <th scope="col" className="totTable">Difference</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row" className="totTable">Local Part</th>
                                                <td>{totalLocalPart}</td>
                                                <td>{fullValue}</td>
                                                <td rowSpan="2">{parseInt(fullValue) - parseInt(totalValue)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="totTable">HQ Part</th>
                                                <td>{totalHQPart}</td>
                                                <td>{totalValue}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="form-control-label">Contract Duration(months)</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><CreditCard2Front size={17}/></span>
                                            </div>
                                            <input className="form-control" value={contractDuration} disabled/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/><br/>
                            <div className="row">
                                {_.times(nbTables, (i) => (
                                    <>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="yearTable">{(parseInt(revenueStartPlanned.getFullYear()) + i < parseInt(revenueStartAchieved.getFullYear())) ? parseInt(revenueStartPlanned.getFullYear())+i:parseInt(revenueStartAchieved.getFullYear())}</th>
                                                    {Months.map((v)=><th className="totTable" key={v.id}>{v.name}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Local Part</td>
                                                    {Months.map((v)=>
                                                        <td>
                                                            {   
                                                                nbTables === 1 ? 
                                                                    v.id >= (parseInt(revenueStartPlanned.getMonth())+1) && v.id < (parseInt(revenueStartAchieved.getMonth())+1) ? <input onChange={(event)=>{onTotLocalPartValue(event); setLocalPartDates(v.id, i)}} className="revenue" type="number"/> : <p>--</p>
                                                                :
                                                                    i === 0 ? 
                                                                        v.id >= (parseInt(revenueStartPlanned.getMonth())+1) ? <input onChange={(event)=>{onTotLocalPartValue(event); setLocalPartDates(v.id, i)}} className="revenue" type="number"/> : <p>--</p>
                                                                    :
                                                                        i === nbTables -1 ?
                                                                            v.id < (parseInt(revenueStartAchieved.getMonth())+1) ? <input onChange={(event)=>{onTotLocalPartValue(event); setLocalPartDates(v.id, i)}} className="revenue" type="number"/> : <p>--</p>
                                                                        :
                                                                        <input onChange={(event)=>{onTotLocalPartValue(event); setLocalPartDates(v.id, i)}} className="revenue" type="number"/>
                                                            }
                                                        </td>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>HQ Part</td>
                                                    {Months.map((v)=>
                                                        <td>
                                                            {   
                                                                nbTables === 1 ? 
                                                                    v.id >= (parseInt(revenueStartPlanned.getMonth())+1) && v.id < (parseInt(revenueStartAchieved.getMonth())+1) ? <input onChange={(event)=>{onTotHQPartValue(event); setHQPartDates(v.id, i)}} className="revenue" type="number"/> : <p>--</p>
                                                                :
                                                                    i === 0 ? 
                                                                        v.id >= (parseInt(revenueStartPlanned.getMonth())+1) ? <input onChange={(event)=>{onTotHQPartValue(event); setHQPartDates(v.id, i)}} className="revenue" type="number"/> : <p>--</p>
                                                                    :
                                                                        i === nbTables -1 ?
                                                                            v.id < (parseInt(revenueStartAchieved.getMonth())+1) ? <input onChange={(event)=>{onTotHQPartValue(event); setHQPartDates(v.id, i)}} className="revenue" type="number"/> : <p>--</p>
                                                                        :
                                                                        <input onChange={(event)=>{onTotHQPartValue(event); setHQPartDates(v.id, i)}} className="revenue" type="number"/>
                                                            }
                                                        </td>
                                                    )}
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br/>
                                    </>
                                ))}
                            </div>
                        </form>
                    </div>
                </>;
        }
    }

    const submithandler = (event) => {
        event.preventDefault();
        var body = {
            "creationDate": currDate.toISOString(),
            "lastUpdateDate": currDate.toISOString(),
            "lastStageUpdateDate": currDate.toISOString(),
            "stage": stage, 
            "successRate": parseInt(successsRate),
            "salesManager": "/api/users/"+salesManager,
            "businessunit": "/api/businessunits/"+businessUnit,
            "reference": reference,
            "description": description,
            "inBudget": inBudget,
            "revenueStartPlanned": revenueStartPlanned.toISOString(),
            "contractDuration": parseInt(contractDuration),
            "revenueStartAchieved": revenueStartAchieved.toISOString(),
            "fullValue": parseFloat(fullValue),
            "totalValue": parseFloat(totalValue),
            "currLocalPart": "/api/currencies/"+currLocalPartDetails.id,
            "currHQPart": "/api/currencies/"+currHQPartDetails.id,
            "revenueLocalPart": revenueLocalPart,
            "revenueHQPart": revenueHQPart
        }
        if(businessLine !== "")
            body["businessline"] = "/api/businesslines/"+businessLine;
        if(department !== "")
            body["department"] = "/api/departments/"+department;
        if(country !== "")
            body["countries"] = "/api/geographies/"+country;
        if(customer !== "")
            body["customer"] = "/api/customers/"+customer;
        if(presales !== "")
            body["presales"] = "/api/presales/"+presales;
        if(reason !== "")
            body["reason"] = reason;
        if(comment !== "")
            body["comment"] = comment;
        if(RFQDatePlannedValue !== "")
            body["rfqDatePlanned"] = RFQDatePlannedValue.toISOString();
        if(RFQDateAchievedValue !== "")
            body["rfqDateAchieved"] = RFQDateAchievedValue.toISOString();
        if(bidReviewDatePlannedValue !== "")
            body["bidReviewDatePlanned"] = bidReviewDatePlannedValue.toISOString();
        if(bidReviewDateAchievedValue !== "")
            body["bidReviewDateAchieved"] = bidReviewDateAchievedValue.toISOString();
        if(submissionDatePlannedValue !== "")
            body["submissionDatePlanned"] = submissionDatePlannedValue.toISOString();
        if(submissionDateAchievedValue !== "")
            body["submissionDateAchieved"] = submissionDateAchievedValue.toISOString();
        if(awardDatePlannedValue !== "")
            body["awardDatePlanned"] = awardDatePlannedValue.toISOString();
        if(awardDateAchievedValue !== "")
            body["awardDateAchieved"] = awardDateAchievedValue.toISOString();
        if(signatureDatePlannedValue !== "")
            body["signatureDatePlanned"] = signatureDatePlannedValue.toISOString();
        if(signatureDateAchievedValue !== "")
            body["signatureDateAchieved"] = signatureDateAchievedValue.toISOString();
        console.log(body)
        axios.post('http://localhost:8000/api/opportunities',body,{headers: {Authorization: "Bearer "+authctx.token}})
        .then(response=> {
            console.log(body);
            data.map((v)=>{
                var plObj = {
                    "opportunity": "/api/opportunities/"+(parseInt(id)+1),
                    "productline": "/api/productlines/"+v.plid,
                    "localPart": parseFloat(v.localPart),
                    "hqPart": parseFloat(v.hqPart),
                    "totAmount": parseFloat(v.totalAmount),
                    "comment": v.comment
                } 
                console.log(plObj);
                axios.post('http://localhost:8000/api/opp_productlines',plObj,{headers: {Authorization: "Bearer "+authctx.token}})
                .then(response=> {
                    // NotificationManager.success('The Opportunity has been successfully added !');
                    console.log(plObj);
                })
                .catch(function (error) {
                    // NotificationManager.error('The Opportunity has not been added !');
                    console.log(error);
                });
            })
        })
        .catch(function (error) {
            console.log(error);
        });
        navigate('/opportunities/manage')  
    }

    return (
        <div className="card mt-5 mb-5 ml-5 mr-5 pl-4 pr-4">
            <div className="card-body">     
                <Stack>
                    <Stepper activeStep={activeStep} connector={<ColorlibConnector/>}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        navigate('/opportunities/manage')
                    ) : (
                        <Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                <Box sx={{ flex: "1 1 auto" }}/>
                                {activeStep === steps.length - 1 ?
                                    <button type="button" onClick={submithandler} className="rounded-pill btn d-flex align-items-center btn-success"><i className="ni fa-2x ni-fat-add"></i>&nbsp;&nbsp;Add</button>
                                    :
                                    <button type="button" onClick={handleNext} disabled={!disabled} className="rounded-pill btn d-flex align-items-center nextBtn"><ArrowRight size={20}/>&nbsp;&nbsp;Next</button>
                                }
                            </Box>
                        </Fragment>
                    )}
                </Stack>      
            </div>
        </div>
    );
}
export default AddOpportunity;