import { Pencil, FileEarmarkText, TicketDetailed, PersonBadge, Inboxes, Inbox, CreditCard2Front, People, Briefcase, Flag, Bullseye, ArrowDownUp, Funnel, Calendar, CurrencyEuro, ArrowRight } from "react-bootstrap-icons";
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/user-input";
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import AuthContext from "../../store/auth-context";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../../index.css";

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
    const authctx = useContext(AuthContext);
    const navigate = useNavigate();
    var currDate = new Date();
    var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
    var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
    var fullDate = currDate.getFullYear() + "-" + month + "-" + date;
    const referenceRef = useRef();
    const descRef = useRef();
    const revenueStartPlannedRef = useRef();
    const contractDuraRef = useRef();
    const totValueRef = useRef();
    const fullValueRef = useRef();
    const reasonRef = useRef();
    const commentRef = useRef();



    const RFQDatePlannedRef = useRef();
    const RFQDateAchievedRef = useRef();
    const bidReviewDatePlannedRef = useRef();
    const bidReviewDateAchievedRef = useRef();
    const submissionDatePlannedRef = useRef();
    const submissionDateAchievedRef = useRef();
    const awardDatePlannedRef = useRef();
    const awardDateAchievedRef = useRef();
    const signatureDatePlannedRef = useRef();
    const signatureDateAchievedRef = useRef();



    
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
    const [activeStep, setActiveStep] = React.useState(0);
    const [successIsValid, setSuccessIsValid] = React.useState(true);
    //SucesssRate
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [stage, setStage] = useState([]);
    const [salesManagerData, setSalesManagerData] = useState([]);
    const [salesManager, setSalesManager] = useState(authctx.user.id);
    const [user, setUser] = useState();
    const [businessUnitData, setBusinessUnitData] = useState([]);
    const [businessUnit, setBusinessUnit] = useState([]);
    const [businessLineData, setBusinessLineData] = useState([]);
    const [businessLine, setBusinessLine] = useState([]);
    const [disableBL, setDisableBL] = useState(false);
    const [departmentData, setDepartmentData] = useState([]);
    const [department, setDepartment] = useState([]);
    const [disableDept, setDisableDept] = useState(false);
    const [countryData, setCountryData] = useState([]);
    const [country, setCountry] = useState([]);
    const [countryDetails, setCountryDetails] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [customerDetails, setCustomerDetails] = useState([]);
    const [disableCust, setDisableCust] = useState(false);
    //In Budget
    const [checked, setChecked] = React.useState(false);
    const [presalesData, setPresalesData] = useState([]);
    const [presales, setPresales] = useState([]);
    const [RFQDatePlanned, setRFQDatePlanned] = useState(false);
    const [RFQDateAchieved, setRFQDateAchieved] = useState(false);
    const [bidReviewDatePlanned, setBidReviewDatePlanned] = useState(false);
    const [bidReviewDateAchieved, setBidReviewDateAchieved] = useState(false);
    const [submissionDatePlanned, setSubmissionDatePlanned] = useState(false);
    const [submissionDateAchieved, setSubmissionDateAchieved] = useState(false);
    const [awardDatePlanned, setAwardDatePlanned] = useState(false);
    const [awardDateAchieved, setAwardDateAchieved] = useState(false);
    const [signatureDatePlanned, setSignatureDatePlanned] = useState(false);
    const [signatureDateAchieved, setSignatureDateAchieved] = useState(false);
    const [presalesReq, setPresalesReq] = useState(false);
    const [currLocalPartData, setCurrLocalPartData] = useState([]);
    const [currLocalPart, setCurrLocalPart] = useState([]);
    const [currLocalPartDetails, setCurrLocalPartDetails] = useState([]);
    const [currHQPartData, setCurrHQPartData] = useState([]);
    const [currHQPart, setCurrHQPart] = useState([]);
    const [currHQPartDetails, setCurrHQPartDetails] = useState([]);

    useEffect(async () => {
        await axios.get('http://localhost:8000/user/salesManagers',{params: {email: authctx.user.email}},{headers: {Authorization: "Bearer "+authctx.token}})
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
        await axios.get('http://localhost:8000/geography/read',{headers: {Authorization: "Bearer "+authctx.token}})
        .then(response=>{
            const table = (response.data.map(d=>{
                return{
                    id: d.id,
                    name: d.country,
                } 
            }))
            setCountryData(table);
        }).catch(error=>{
            console.error(error);
        })
        const r = await axios.get('http://localhost:8000/api/users/'+salesManager,{headers: {Authorization: "Bearer "+authctx.token}});
        await setUser(r.data);
    },[salesManager])
    useEffect(async() => {
        if(user !== undefined){
            if(user.businessunit.length !== 0){
                await setBusinessUnitData(user.businessunit);
            }
            else{
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
            }
        }
    },[user])
    useEffect(async() => {
        if(businessUnitData[0] !== undefined){
            await setBusinessUnit(businessUnitData[0].id);
        }
    },[businessUnitData])
    useEffect(async() => {
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
    },[businessUnit, country])
    useEffect(async() => {
        await axios.get('http://localhost:8000/api/customers/'+customer,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setCustomerDetails(response.data);
        })
        if(businessLineData.length !== 0){
            setDisableBL(false);
            setDisableDept(false);
            setBusinessLine(businessLineData[0].id);
        }
        else{
            setDepartment([]);
            setDisableBL(true);
            setDisableDept(true);
        }
    },[businessLineData, customer])
    useEffect(async() => {
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
    },[businessLine])
    useEffect(async() => {
        if(departmentData.length !== 0){
            setDisableDept(false);
            setDepartment(departmentData[0].id);
        }
        else{
            setDisableDept(true);
        }
        if(customerData.length === 0){
            setDisableCust(true);
        }
        else{
            setDisableCust(false);
        }
    },[departmentData, customerData])
    useEffect(async() => {
        setValue(0);
        setRFQDatePlanned(false);
        setSubmissionDatePlanned(false);
        setAwardDatePlanned(false);
        setSignatureDatePlanned(false);
        setPresalesReq(false);
        setOpen(false);
        if(stage === 3 || stage === 4 || stage === 5){
            setOpen(true);
            setValue(0);
            setRFQDatePlanned(true);
            setSubmissionDatePlanned(false);
            setAwardDatePlanned(false);
            setSignatureDatePlanned(false);
            setPresalesReq(false);
        }
        if(stage === 6 || stage === 7 || stage === 8 || stage === 9 || stage === 10){
            setOpen(true);
            setRFQDatePlanned(true);
            setSubmissionDatePlanned(true);
            setAwardDatePlanned(true);
            setSignatureDatePlanned(true);
            setPresalesReq(true);
            if(stage === 8 || stage === 10)
                setValue(100);
        }
    },[stage, value])
    useEffect(async () => {
        axios.get('http://localhost:8000/currency/read',{headers: {Authorization: "Bearer "+authctx.token}})
        .then(response=>{
            const table = (response.data.map(d=>{
                return{
                    id: d.id,
                    name: d.code,
                } 
            }))
            setCurrHQPartData(table);
            setCurrLocalPartData(table);
        }).catch(error=>{
            console.error(error);
        })
    },[])
    useEffect(async() => {
        await axios.get('http://localhost:8000/api/currencies/'+currLocalPart,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setCurrLocalPartDetails(response.data);
        })
        await axios.get('http://localhost:8000/api/currencies/'+currHQPart,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setCurrHQPartDetails(response.data);
        })
        setValue(0);
        setRFQDatePlanned(false);
        setSubmissionDatePlanned(false);
        setAwardDatePlanned(false);
        setSignatureDatePlanned(false);
        setPresalesReq(false);
        setOpen(false);
        if(stage === 3 || stage === 4 || stage === 5){
            setOpen(true);
            setValue(0);
            setRFQDatePlanned(true);
            setSubmissionDatePlanned(false);
            setAwardDatePlanned(false);
            setSignatureDatePlanned(false);
            setPresalesReq(false);
        }
        if(stage === 6 || stage === 7 || stage === 8 || stage === 9 || stage === 10){
            setOpen(true);
            setRFQDatePlanned(true);
            setSubmissionDatePlanned(true);
            setAwardDatePlanned(true);
            setSignatureDatePlanned(true);
            setPresalesReq(true);
            if(stage === 8 || stage === 10)
                setValue(100);
        }
    },[stage, value, currHQPart, currLocalPart])

    const styleBtn = activeStep === steps.length - 1 ? "rounded-pill btn d-flex align-items-center btn-success":"rounded-pill btn d-flex align-items-center nextBtn";
    const iconBtn = activeStep === steps.length - 1 ? <i className="ni fa-2x ni-fat-add"></i>:<ArrowRight size={20}/>;
    var description = " ";
    console.log(descRef.current)
    if(descRef.current !== undefined)
        if(descRef.current !== "<textarea rows=\"1\" class=\"form-control\"></textarea>")
            description = descRef.current.value;
    var hqDate;
    var localDate;
    var hqRate;
    var lRate;

    if(currHQPartDetails !== []){
        var HQ = new Date(currHQPartDetails.appDate);
        var dHQ = (HQ.getDate() <= 9 ? '0': '') + (HQ.getDate());
        var mHQ = (HQ.getMonth() <= 9 ? '0': '') + (HQ.getMonth()+1);
        hqDate = dHQ + "/" + mHQ + "/" + HQ.getFullYear();
        hqRate = currHQPartDetails.euroCnvrRate;
    }
    if(currLocalPartDetails !== []){
        var local = new Date(currLocalPartDetails.appDate);
        var dLocal = (local.getDate() <= 9 ? '0': '') + (local.getDate());
        var mLocal = (local.getMonth() <= 9 ? '0': '') + (local.getMonth()+1);
        localDate = dLocal + "/" + mLocal + "/" + local.getFullYear();
        lRate = currLocalPartDetails.euroCnvrRate;
    }


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleClick = () => {
        setOpen(!open);
    };  
    const onStageChangeHandler = (event) => {
        setStage(event.target.value);
    }
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        if(value === 0)
            setSuccessIsValid(false);
    };
    const onSalesManagerChangeHandler = (event) => {
        setSalesManager(event.target.value);
    }
    const onBusinessUnitChangeHandler = (event) => {
        setBusinessUnit(event.target.value);
    }
    const onBusinessLineChangeHandler = (event) => {
        setBusinessLine(event.target.value);
    }
    const onDepartmentChangeHandler = (event) => {
        setDepartment(event.target.value);
    }
    const onCountryChangeHandler = (event) => {
        setCountry(event.target.value);
    }
    const onCustomerChangeHandler = (event) => {
        setCustomer(event.target.value);
    }
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const onPresalesChangeHandler = (event) => {
        setPresales(event.target.value);
    }
    const onCurrLocalPartChangeHandler = (event) => {
        setCurrLocalPart(event.target.value);
    }
    const onCurrHQPartChangeHandler = (event) => {
        setCurrHQPart(event.target.value);
    }





    function getStepContent(step){
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
                                                    <Select multiple={false} onChange={onSalesManagerChangeHandler} className="form-control" value={salesManager} defaultValue={salesManager}>
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
                                                        <span className="input-group-text"><Inboxes size={17}/></span>
                                                    </div>
                                                    <Select multiple={false} onChange={onBusinessUnitChangeHandler} className="form-control" value={businessUnit} defaultValue={businessUnit}>
                                                        {businessUnitData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Business Line<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><Inbox size={17}/></span>
                                                    </div>
                                                    <Select multiple={false} onChange={onBusinessLineChangeHandler} className="form-control" value={businessLine} defaultValue={businessLine} disabled={disableBL}>
                                                        {businessLineData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
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
                                                    <input type="text" ref={referenceRef} className="form-control" disabled placeholder="Reference"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label className="form-control-label">Customer<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><People size={17}/></span>
                                                    </div>
                                                    <Select multiple={false} onChange={onCustomerChangeHandler} className="form-control" value={customer} disabled={disableCust}>
                                                        {customerData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <br/>
                                            <FormControlLabel control={<Switch checked={checked} onChange={handleChange}/>} label="In Budget*" labelPlacement="start"/>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Revenue Start Planned</label>
                                                <input ref={revenueStartPlannedRef} className="form-control" type="date"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Contract Duration(months)<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><CreditCard2Front size={17}/></span>
                                                    </div>
                                                    <input type="number" ref={contractDuraRef} placeholder="Contract Duration" className="form-control"/>
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
                                                        <span className="input-group-text"><Briefcase size={17}/></span>
                                                    </div>
                                                    <Select multiple={false} onChange={onPresalesChangeHandler} className="form-control" value={presales}>
                                                        {presalesData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label className="form-control-label">Reason (in case of lost/won)</label>
                                                <textarea rows="1" ref={reasonRef} className="form-control"/>
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
                                                        <span className="input-group-text"><Briefcase size={17}/></span>
                                                    </div>
                                                    <Select multiple={false} className="form-control" value={stage} onChange={onStageChangeHandler}>
                                                        {stages.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Success Rate<span className="text-danger">*</span></label>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs>
                                                        <Slider value={typeof value === 'number' ? value : 0} onChange={handleSliderChange} aria-labelledby="input-slider"/>
                                                    </Grid>
                                                    <Grid item>
                                                        <label>{value}%</label>
                                                    </Grid>
                                                </Grid>
                                                {!successIsValid && <div className="invalid-feedback">Should not be empty</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Department - Pole<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><Flag size={17}/></span>
                                                    </div>
                                                    <Select multiple={false} onChange={onDepartmentChangeHandler} className="form-control" value={department} defaultValue={department} disabled={disableDept}>
                                                        {departmentData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Country<span className="text-danger">*</span></label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><Bullseye size={17}/></span>
                                                    </div>
                                                    <Select multiple={false} onChange={onCountryChangeHandler} className="form-control" value={country}>
                                                        {countryData.map((d) => (
                                                            <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
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
                                                        <span className="input-group-text"><FileEarmarkText size={17}/></span>
                                                    </div>
                                                    <textarea rows="1" ref={descRef} className="form-control"/>
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
                                                    <input ref={totValueRef} className="form-control" type="number" defaultValue="0" disabled/>
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
                                                    <input type="number" ref={fullValueRef} placeholder="Contract Duration(months)" className="form-control" defaultValue="0"/>
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
                                                    <textarea rows="1" ref={commentRef} className="form-control"/>
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
                                                        <input ref={revenueStartPlannedRef} className="form-control" type="date"/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Bid Review Date Planned{bidReviewDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <input ref={bidReviewDatePlannedRef} className="form-control" type="date"/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Submission Date Planned{submissionDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <input ref={submissionDatePlannedRef} className="form-control" type="date"/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Award Date Planned{awardDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <input ref={awardDatePlannedRef} className="form-control" type="date"/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Signature Date Planned{signatureDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <input ref={signatureDatePlannedRef} className="form-control" type="date"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">RFQ Date Achieved{RFQDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <input ref={RFQDateAchievedRef} className="form-control" type="date"/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                <div className="form-group">
                                                        <label className="form-control-label">Bid Review Date Achieved{bidReviewDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <input ref={bidReviewDateAchievedRef} className="form-control" type="date"/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                <div className="form-group">
                                                        <label className="form-control-label">Submission Date Achieved{submissionDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <input ref={submissionDateAchievedRef} className="form-control" type="date"/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                <div className="form-group">
                                                        <label className="form-control-label">Award Date Achieved{awardDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <input ref={awardDateAchievedRef} className="form-control" type="date"/>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                <div className="form-group">
                                                        <label className="form-control-label">Signature Date Achieved{signatureDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <input ref={signatureDateAchievedRef} className="form-control" type="date"/>
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
            case 1: 
                return<>
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
                                            <textarea rows="1" ref={commentRef} className="form-control" value={description} disabled/>
                                            <textarea rows="1" ref={commentRef} className="form-control" disabled/>
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
                                                <span className="input-group-text"><Briefcase size={17}/></span>
                                            </div>
                                            <Select multiple={false} onChange={onCurrLocalPartChangeHandler} className="form-control" value={currLocalPart}>
                                                {currLocalPartData.map((d) => (
                                                    <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>                                                
                                </div>
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label">Euro ratio rate local part</label>
                                        <br/>
                                        <p>{lRate}</p>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label">Update date ratio local part</label>
                                        <br/>
                                        <p>{localDate}</p>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label">Currency HQ part<span className="text-danger">*</span></label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><Briefcase size={17}/></span>
                                            </div>
                                            <Select multiple={false} onChange={onCurrHQPartChangeHandler} className="form-control" value={currHQPart}>
                                                {currHQPartData.map((d) => (
                                                    <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label">Euro ratio rate HQ part</label>
                                        <br/>
                                        <p>{hqRate}</p>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-group">
                                        <label className="form-control-label">Update date ratio HQ part</label>
                                        <br/>
                                        <p>{hqDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="table-responsive">
                                    <table className="table align-items-center">
                                        <thead className="table-dark">
                                            <tr>
                                                <th className="text-center text-xs font-weight-bold" data-sort="name">Line of products/services&nbsp;<span><ArrowDownUp size={15}/></span>&nbsp;<span><Funnel size={15}/></span></th>
                                                <th className="text-center text-xs font-weight-bold" data-sort="name">Local part (in currency)&nbsp;<span><ArrowDownUp size={15}/></span>&nbsp;<span><Funnel size={15}/></span></th>
                                                <th className="text-center text-xs font-weight-bold" data-sort="name">Local part (€)&nbsp;<span><ArrowDownUp size={15}/></span>&nbsp;<span><Funnel size={15}/></span></th>
                                                <th className="text-center text-xs font-weight-bold" data-sort="name">HQ part&nbsp;<span><ArrowDownUp size={15}/></span>&nbsp;<span><Funnel size={15}/></span></th>
                                                <th className="text-center text-xs font-weight-bold" data-sort="name">Total amount&nbsp;<span><ArrowDownUp size={15}/></span>&nbsp;<span><Funnel size={15}/></span></th>
                                                <th className="text-center text-xs font-weight-bold" data-sort="name">Comment&nbsp;<span><ArrowDownUp size={15}/></span>&nbsp;<span><Funnel size={15}/></span></th>
                                                <th className="text-center text-xs font-weight-bold" >Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                            




  








                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </form>
                    </div>
                </>;
            case 2:
                return <>
            </>;
        }
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
                        <React.Fragment>
                                {getStepContent(activeStep)}
                            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                                <Box sx={{ flex: "1 1 auto" }}/>
                                <button type="button" onClick={handleNext} className={styleBtn}>{iconBtn}&nbsp;&nbsp;
                                    {activeStep === steps.length - 1 ? "Add" : "Next"}
                                </button>
                            </Box>
                        </React.Fragment>
                    )}
                </Stack>      
            </div>
        </div>
    );
}
export default AddOpportunity;