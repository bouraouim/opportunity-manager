import { useNavigate, useParams } from "react-router-dom";
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
import { Pencil, FileEarmarkText, TicketDetailed, PersonBadge, Inboxes, Inbox, CreditCard2Front, People, Briefcase, Flag, Bullseye, ArrowDownUp, Funnel, Calendar, CurrencyEuro, ArrowRight, Save, ArrowLeft, Trash , PencilSquare } from "react-bootstrap-icons";
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
    backgroundColor: "#007AC0",
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
    backgroundColor: "#007AC0",
    borderRadius: 1
  }
}));
const EditOpportunity = () => {
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


    const [nbTables, setNbTables] = useState(0);
    const [revenueLocalPart, setrevenueLocalPart] = useState([]);
    const [valLocalPart, setValLocalPart] = useState(0);
    const [totalLocalPart, setTotalLocalPart] = useState(0);



////////////////////////////////////////////////////

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
    var { id } = useParams();
    var currDate = new Date();
    const navigate = useNavigate();
    const authctx = useContext(AuthContext);
    var disabled = true;
    var disableAddRow = true;
    const [activeStep, setActiveStep] = useState(0);
    const [opportunity, setOpportunity] = useState([]);
    const [creationDate, setCreationDate] = useState("");
    const [lastUpdateDate, setLastUpdateDate] = useState("");
    const [lastStageUpdateDate, setLastStageUpdateDate] = useState("");
    const [stage, setStage] = useState('');
    const [stageChanged, setStageChanged] = useState(false);
    const [successsRate, setSuccessRate] = useState(0);
    const [successsRateChanged, setSuccessRateChanged] = useState(false);
    const [salesManagerData, setSalesManagerData] = useState([]);
    const [salesManager, setSalesManager] = useState('');
    const [salesManagerChanged, setSalesManagerChanged] = useState(false);
    const [user, setUser] = useState('');
    const [businessUnitData, setBusinessUnitData] = useState([]);
    const [businessUnit, setBusinessUnit] = useState('');
    const [businessUnitChanged, setBusinessUnitChanged] = useState('');    
    const [businessUnitValid, setBusinessUnitValid] = useState(true);
    const [inputBusinessUnitStyle, setInputBusinessUnitStyle] = useState("form-control form-placeholder");
    const [iconBusinessUnitStyle, setIconBusinessUnitStyle] = useState("input-group-text");
    const [businessLineData, setBusinessLineData] = useState([]);
    const [businessLine, setBusinessLine] = useState('');
    const [businessLineChanged, setBusinessLineChanged] = useState(false);
    const [businessLineValid, setBusinessLineValid] = useState(true);
    const [inputBusinessLineStyle, setInputBusinessLineStyle] = useState("form-control form-placeholder");
    const [iconBusinessLineStyle, setIconBusinessLineStyle] = useState("input-group-text");
    const [disableBL, setDisableBL] = useState(true);
    const [departmentData, setDepartmentData] = useState([]);
    const [department, setDepartment] = useState('');
    const [departmentChanged, setDepartmentChanged] = useState(false);
    const [deptValid, setDeptValid] = useState(true);
    const [inputDeptStyle, setInputDeptStyle] = useState("form-control form-placeholder");
    const [iconDeptStyle, setIconDeptStyle] = useState("input-group-text");
    const [disableDept, setDisableDept] = useState(true);
    const [areaData, setAreaData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [country, setCountry] = useState('');
    const [countryChanged, setCountryChanged] = useState(false);
    const [countryValid, setCountryValid] = useState(true);
    const [inputCountryStyle, setInputCountryStyle] = useState("form-control form-placeholder");
    const [iconCountryStyle, setIconCountryStyle] = useState("input-group-text");
    const [countryDetails, setCountryDetails] = useState([]);
    const [disableCountry, setDisableCountry] = useState(true);
    const [reference, setReference] = useState();
    const [customerData, setCustomerData] = useState([]);
    const [customer, setCustomer] = useState('');
    const [customerChanged, setCustomerChanged] = useState(false);
    const [customerValid, setCustomerValid] = useState(false);
    const [inputCustomerStyle, setInputCustomerStyle] = useState("form-control form-placeholder");
    const [iconCustomerStyle, setIconCustomerStyle] = useState("input-group-text");
    const [customerDetails, setCustomerDetails] = useState([]);
    const [disableCust, setDisableCust] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionChanged, setDescriptionChanged] = useState(false);
    const [inBudget, setInBudget] = useState();
    const [inBudgetChanged, setInBudgetChanged] = useState();
    const [revenueStartPlanned, setRevenueStartPlanned] = useState("");
    const [revenueStartPlannedChanged, setRevenueStartPlannedChanged] = useState(false);
    const [revenueStartAchieved, setRevenueStartAchieved] = useState("");
    const [contractDuration, setContractDuration] = useState("");
    const [contractDurationChanged, setContractDurationChanged] = useState(false);
    const [totalValue, setTotalValue] = useState(0);
    const [fullValue, setFullValue] = useState(0);
    const [fullValueChanged, setFullValueChanged] = useState(false);
    const [presalesData, setPresalesData] = useState([]);
    const [presales, setPresales] = useState('');
    const [presalesChnaged, setPresalesChnaged] = useState(false);
    const [disabledPresales, setDisabledPresales] = useState(true);
    const [presalesReq, setPresalesReq] = useState(false);
    const [inputPresalesStyle, setInputPresalesStyle] = useState("form-control form-placeholder");
    const [iconPresalesStyle, setIconPresalesStyle] = useState("input-group-text");
    const [presalesValid, setPresalesValid] = useState(true);
    const [reason, setReason] = useState('');
    const [reasonChanged, setReasonChanged] = useState(false);
    const [comment, setComment] = useState('');
    const [commentChanged, setCommentChanged] = useState(false);
    const [open, setOpen] = useState(false);
    const [RFQDatePlanned, setRFQDatePlanned] = useState(false);
    const [RFQDatePlannedValue, setRFQDatePlannedValue] = useState("");
    const [RFQDatePlannedValueChanged, setRFQDatePlannedValueChanged] = useState(false);
    const [inputRFQDatePlannedStyle, setInputRFQDatePlannedStyle] = useState("form-control form-placeholder");
    const [iconRFQDatePlannedStyle, setIconRFQDatePlannedStyle] = useState("input-group-text");
    const [RFQDatePlannedValid, setRFQDatePlannedValid] = useState(true);
    const [bidReviewDatePlanned, setBidReviewDatePlanned] = useState(false);
    const [bidReviewDatePlannedChanged, setBidReviewDatePlannedChanged] = useState(false);
    const [bidReviewDatePlannedValue, setBidReviewDatePlannedValue] = useState("");
    const [submissionDatePlanned, setSubmissionDatePlanned] = useState(false);
    const [submissionDatePlannedValue, setSubmissionDatePlannedValue] = useState("");
    const [submissionDatePlannedValueChanged, setSubmissionDatePlannedValueChanged] = useState(false);
    const [inputSubmissionDatePlannedStyle, setInputSubmissionDatePlannedStyle] = useState("form-control form-placeholder");
    const [iconSubmissionDatePlannedStyle, setIconSubmissionDatePlannedStyle] = useState("input-group-text");
    const [submissionDatePlannedValid, setSubmissionDatePlannedValid] = useState(true);
    const [awardDatePlanned, setAwardDatePlanned] = useState(false);
    const [awardDatePlannedValue, setAwardDatePlannedValue] = useState("");
    const [awardDatePlannedValueChanged, setAwardDatePlannedValueChanged] = useState(false);
    const [inputAwardDatePlannedStyle, setInputAwardDatePlannedStyle] = useState("form-control form-placeholder");
    const [iconAwardDatePlannedStyle, setIconAwardDatePlannedStyle] = useState("input-group-text");
    const [awardDatePlannedValid, setAwardDatePlannedValid] = useState(true);
    const [signatureDatePlanned, setSignatureDatePlanned] = useState(false);
    const [signatureDatePlannedValue, setSignatureDatePlannedValue] = useState("");
    const [signatureDatePlannedValueChanged, setSignatureDatePlannedValueChanged] = useState(false);
    const [inputSignatureDatePlannedStyle, setInputSignatureDatePlannedStyle] = useState("form-control form-placeholder");
    const [iconSignatureDatePlannedStyle, setIconSignatureDatePlannedStyle] = useState("input-group-text");
    const [signatureDatePlannedValid, setSignatureDatePlannedValid] = useState(true);
    const [RFQDateAchieved, setRFQDateAchieved] = useState(false);
    const [RFQDateAchievedValue, setRFQDateAchievedValue] = useState("");
    const [RFQDateAchievedValueChanged, setRFQDateAchievedValueChanged] = useState("");
    const [bidReviewDateAchieved, setBidReviewDateAchieved] = useState(false);
    const [bidReviewDateAchievedValue, setBidReviewDateAchievedValue] = useState("");
    const [bidReviewDateAchievedValueChanged, setBidReviewDateAchievedValueChanged] = useState(false);
    const [submissionDateAchieved, setSubmissionDateAchieved] = useState(false);
    const [submissionDateAchievedValue, setSubmissionDateAchievedValue] = useState("");
    const [submissionDateAchievedValueChanged, setSubmissionDateAchievedValueChanged] = useState(false);
    const [awardDateAchieved, setAwardDateAchieved] = useState(false);
    const [awardDateAchievedValue, setAwardDateAchievedValue] = useState("");
    const [awardDateAchievedValueChanged, setAwardDateAchievedValueChanged] = useState(false);
    const [signatureDateAchieved, setSignatureDateAchieved] = useState(false);
    const [signatureDateAchievedValue, setSignatureDateAchievedValue] = useState("");
    const [signatureDateAchievedValueChanged, setSignatureDateAchievedValueChanged] = useState(false);
    const [currLocalPartData, setCurrLocalPartData] = useState([]);
    const [currLocalPart, setCurrLocalPart] = useState('');
    const [currLocalPartChanged, setCurrLocalPartChanged] = useState(false);
    const [currLocalPartDetails, setCurrLocalPartDetails] = useState("");
    const [currLocalPartAppDate, setCurrLocalPartAppDate] = useState("");
    const [currHQPartData, setCurrHQPartData] = useState([]);
    const [currHQPart, setCurrHQPart] = useState('');
    const [currHQPartChanged, setCurrHQPartChanged] = useState(false);
    const [currHQPartDetails, setCurrHQPartDetails] = useState("");
    const [currHQPartAppDate, setCurrHQPartAppDate] = useState("");
    const [data, setData] = useState([]);
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
    const [editRow, setEditRow] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    useEffect(async() => {
        await axios.get('http://localhost:8000/api/opportunities/'+id,{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setOpportunity(response.data);
        })
        },[])
    useEffect(async() => {
        var applicationDate = new Date(opportunity.creationDate);
        var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
        var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
        await setCreationDate(date + "/" + month + "/" + applicationDate.getFullYear());
        applicationDate = new Date(opportunity.lastUpdateDate);
        date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
        month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
        await setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        applicationDate = new Date(opportunity.lastStageUpdateDate);
        date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
        month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
        await setLastStageUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        await setStage(opportunity.stage);
        await setSuccessRate(opportunity.successRate);
        await setSalesManager(opportunity.salesManager.id);
        await setReference(opportunity.reference);
        await setDescription(opportunity.description);
        await setInBudget(opportunity.inBudget);
        applicationDate = new Date(opportunity.revenueStartPlanned);
        date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
        month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
        await setRevenueStartPlanned(date + "/" + month + "/" + applicationDate.getFullYear());
        await setRevenueStartAchieved(opportunity.revenueStartAchieved);
        await setContractDuration(opportunity.contractDuration);
        await setTotalValue(opportunity.totalValue);
        await setFullValue(opportunity.fullValue);
        await setReason(opportunity.reason);
        await setComment(opportunity.comment);
        if(opportunity.rfqDatePlanned !== ""){
            applicationDate = new Date(opportunity.rfqDatePlanned);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            await setRFQDatePlannedValue(date + "/" + month + "/" + applicationDate.getFullYear());
        }
        if(opportunity.bidReviewDatePlanned !== ""){
            applicationDate = new Date(opportunity.bidReviewDatePlanned);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            await setBidReviewDatePlannedValue(date + "/" + month + "/" + applicationDate.getFullYear());
        }
        if(opportunity.submissionDatePlanned !== ""){
            applicationDate = new Date(opportunity.submissionDatePlanned);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            await setSubmissionDatePlannedValue(date + "/" + month + "/" + applicationDate.getFullYear());
        }
        if(opportunity.awardDatePlanned !== ""){
            applicationDate = new Date(opportunity.awardDatePlanned);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            await setAwardDatePlannedValue(date + "/" + month + "/" + applicationDate.getFullYear());
        }
        if(opportunity.signatureDatePlanned !== ""){
            applicationDate = new Date(opportunity.signatureDatePlanned);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            await setSignatureDatePlannedValue(date + "/" + month + "/" + applicationDate.getFullYear());
        }
        if(opportunity.rfqDateAchieved !== ""){
            applicationDate = new Date(opportunity.rfqDateAchieved);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            await setRFQDateAchievedValue(date + "/" + month + "/" + applicationDate.getFullYear());
        }
        if(opportunity.bidReviewDateAchieved !== ""){
            applicationDate = new Date(opportunity.bidReviewDateAchieved);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            await setBidReviewDateAchievedValue(date + "/" + month + "/" + applicationDate.getFullYear());
        }
        if(opportunity.submissionDateAchieved !== ""){
            applicationDate = new Date(opportunity.submissionDateAchieved);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            await setSubmissionDateAchievedValue(date + "/" + month + "/" + applicationDate.getFullYear());
        }
        if(opportunity.awardDateAchieved !== ""){
            applicationDate = new Date(opportunity.awardDateAchieved);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            await setAwardDateAchievedValue(date + "/" + month + "/" + applicationDate.getFullYear());
        }
        if(opportunity.signatureDateAchieved !== ""){
            applicationDate = new Date(opportunity.signatureDateAchieved);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            await setSignatureDateAchievedValue(date + "/" + month + "/" + applicationDate.getFullYear());
        }
        if(opportunity.rfqDatePlanned !== undefined || opportunity.bidReviewDatePlanned !== undefined || opportunity.submissionDatePlanned !== undefined || opportunity.awardDatePlanned !== undefined || opportunity.signatureDatePlanned !== undefined || opportunity.rfqDateAchieved !== undefined || opportunity.bidReviewDateAchieved !== undefined || opportunity.submissionDateAchieved !== undefined || opportunity.awardDateAchieved !== undefined|| opportunity.signatureDateAchieved !== undefined)
            setOpen(true);
        await setCurrLocalPart(opportunity.currLocalPart.code);
        await setCurrHQPart(opportunity.currHQPart.code);
        await axios.get('http://localhost:8000/PLOP/plByOpp',{params: {id: id}},{headers: {Authorization: "Bearer "+authctx.token}})
        .then(response=>{
            const table = (response.data.map(d=>{
                return{
                    id: d.id,
                    productLine:d["productline.name"],
                    plid: d["productine.id"],
                    localPart:d.localPart,
                    hqPart:d.hqPart,
                    totalAmount:d.totAmount,
                    comment:d.comment
                } 
            }))
            setData(table);
        }).catch(error=>{
            console.error(error);
        })
        await axios.get('http://localhost:8000/api/productlines/'+data[0].id,{headers: {Authorization: "Bearer "+authctx.token}})
        .then(response=>{
            setPlDetails(response.data);
        }).catch(error=>{
            console.error(error);
        })

        await setrevenueLocalPart(opportunity.revenueLocalPart);
        await setrevenueHQPart(opportunity.revenueHQPart);
    },[opportunity])

    console.log(revenueStartPlanned)
    useEffect(async() => {
        await axios.get('http://localhost:8000/currency/closestCurr',{params: {code: currLocalPart, date : revenueStartPlanned}},{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setCurrLocalPartDetails(response.data[0]);
        })
    },[currLocalPart, revenueStartPlanned])
    useEffect(async() => {
        await axios.get('http://localhost:8000/currency/closestCurr',{params: {code: currHQPart, date : revenueStartPlanned}},{headers: {Authorization: "Bearer "+authctx.token}}) 
        .then(response=>{
            setCurrHQPartDetails(response.data[0]);
        })
    },[currHQPart, revenueStartPlanned])
    useEffect(async() => {
        if(opportunity !== undefined){
            if(opportunity.salesManager !== undefined){
                await axios.get('http://localhost:8000/user/salesManagers',{params: {email: opportunity.salesManager.username}},{headers: {Authorization: "Bearer "+authctx.token}})
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
                const r = await axios.get('http://localhost:8000/api/users/'+salesManager,{headers: {Authorization: "Bearer "+authctx.token}});
                await setUser(r.data);
            }   
        }
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
        setBusinessUnit('');
        setBusinessUnitData([]);
        setBusinessLine("");
        setBusinessLineData([]);
        setDisableBL(true);
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
                if(user.username === opportunity.salesManager.username){
                    await setBusinessUnitData(user.businessunit);
                    await setBusinessUnit(opportunity.businessunit.id);
                    setBusinessUnitValid(true);
                    setDisableBL(false);
                    await setBusinessLineData(user.businessline);
                    await setBusinessLine(opportunity.businessline.id);
                    setBusinessLineValid(true);
                    setDeptValid(true);
                    await setDepartmentData(user.department);
                    await setDepartment(opportunity.department.id);
                    setDeptValid(true);
                    setDisableDept(false);
                }
                else{
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
        }
    },[user])
    useEffect(async() => {
        if(businessUnit !== ""){
            setBusinessLineValid(false);
            setBusinessLine('');
            setDisableBL(false);
            setDepartment('');
            setAreaData([]);
            setPresales('');
            setDisableDept(true);
            setDisabledPresales(true);
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
        if(user !== undefined){
            if(user.username !== undefined){
                if(opportunity !== undefined){
                    if(opportunity.salesManager !== undefined){
                        if(user.username === opportunity.salesManager.username){
                            await setCountry(opportunity.countries.id);
                            setCountryValid(true);
                            setDisableCountry(false);
                            await setCustomer(opportunity.customer.id);
                            setCustomerValid(true);
                            setDisableCust(false);
                            await setPresales(opportunity.presalesEng.id);
                            setPresalesValid(true);
                            setDisabledPresales(false);
                        }
                    }
                }
            }
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
            setInputDeptStyle("form-control form-placeholder");
            setIconDeptStyle("input-group-text");
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
        var test;
        if(revenueStartPlannedChanged)
            test = new Date(revenueStartPlanned);
        else
            test = new Date(opportunity.revenueStartPlanned);
        test.setMonth(test.getMonth() + parseInt(contractDuration));
        setRevenueStartAchieved(new Date(test));
    },[contractDurationChanged, revenueStartPlannedChanged])
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

    console.log("Before")
    console.log(opportunity);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const onStageChangeHandler = (event) => {
        setStage(event.target.value);
        var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
        var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
        setLastStageUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
        setStageChanged(true);
        if(event.target.value === opportunity.stage){
            setStageChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastStageUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
    }
    const handleSuccessRateChange = (event, newValue) => {
        setSuccessRate(newValue);
        var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
        var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
        setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
        setSuccessRateChanged(true);
        if(newValue === opportunity.successRate){
            setSuccessRateChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
    };
    const onSalesManagerChangeHandler = (event) => {
        setSalesManager(event.target.value);
        setBusinessUnit('');
        setBusinessLine('');
        setDepartment('');
        var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
        var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
        setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
        setSalesManagerChanged(true);
        if(event.target.value === opportunity.salesManager.id){
            setSalesManagerChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
    }
    const onBusinessUnitChangeHandler = (event) => {
        setBusinessUnit(event.target.value);
        setBusinessUnitValid(true);
        var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
        var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
        setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
        setBusinessUnitChanged(true);
        if(event.target.value === opportunity.businessunit.id){
            setBusinessUnitChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
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
        var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
        var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
        setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
        setBusinessLineChanged(true);
        if(event.target.value === opportunity.businessline.id){
            setBusinessLineChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
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
        var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
        var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
        setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
        setDepartmentChanged(true);
        if(event.target.value === opportunity.department.id){
            setDepartmentChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
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
        var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
        var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
        setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
        setCountryChanged(true);
        if(event.target.value === opportunity.countries.id){
            setCountryChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
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
        var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
        var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
        setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
        setCustomerChanged(true);
        if(event.target.value === opportunity.customer.id){
            setCustomerChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
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
            setDescription(event.target.value);
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setDescriptionChanged(true);
        }
        else{
            setDescription(opportunity.description);
            setDescriptionChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
    }
    const handleInBudgetChange = (event) => {
        setInBudget(event.target.checked);
        var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
        var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
        setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
        setInBudgetChanged(true);
        if(event.target.checked === opportunity.inBudget){
            setInBudgetChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
    };
    const onRevenueStartPlannedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setRevenueStartPlanned(new Date(event.target.value));
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setRevenueStartPlannedChanged(true);
        }
        else{
            setRevenueStartPlannedChanged(false);
            var applicationDate = new Date(opportunity.revenueStartPlanned);
            var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setRevenueStartPlanned(date + "/" + month + "/" + applicationDate.getFullYear());
            setRevenueStartAchieved(opportunity.revenueStartAchieved);
            applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
    }
    const onContractDurationChangeHandler = (event) => {
        if((event.target.value).length > 0){
            if(event.target.value === opportunity.contractDuration.toString()){
                setContractDuration(opportunity.contractDuration);
                setContractDurationChanged(false);
                setRevenueStartAchieved(opportunity.revenueStartAchieved);
                var applicationDate = new Date(opportunity.lastUpdateDate);
                var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
            else{
                setContractDuration(event.target.value);
                var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
                var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
                setContractDurationChanged(true);
            }
        }
    }
    const onFullValueChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setFullValue(event.target.value);
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setFullValueChanged(true);
        }
        else{
            setFullValue(opportunity.fullValue);
            setFullValueChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
    }
    const onPresalesChangeHandler = (event) => {
        setPresales(event.target.value);
        var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
        var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
        setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
        setPresalesChnaged(true);
        if(event.target.value === opportunity.presalesEng.id){
            setPresalesChnaged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }        if(presalesReq)
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
        if((event.target.value).length > 0){
            if(event.target.value === opportunity.reason){
                setReason(opportunity.reason);
                setReasonChanged(false);
                var applicationDate = new Date(opportunity.lastUpdateDate);
                var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
            else{
                setReason(event.target.value);
                var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
                var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
                setReasonChanged(true);
            }
        }
        else{
            setReason(opportunity.reason);
            setReasonChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
    }
    const onCommentChangeHandler = (event) => {
        if((event.target.value).length > 0){
            if(event.target.value === opportunity.comment){
                setComment(opportunity.reason);
                setCommentChanged(false);
                var applicationDate = new Date(opportunity.lastUpdateDate);
                date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
            else{
                setComment(event.target.value);
                var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
                var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
                setCommentChanged(true);
            }
        }
        else{
            setComment(opportunity.reason);
            setCommentChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
    }
    const handleClick = () => {
        setOpen(!open);
    }
    const onRFQDatePlannedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setRFQDatePlannedValue(new Date(event.target.value));
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setRFQDatePlannedValueChanged(true);
            setRFQDatePlannedValid(true);
        }
        else{
            setRFQDatePlannedValueChanged(false);
            if(opportunity.rfqDatePlanned === ""){
                setRFQDatePlannedValue("");
                setRFQDatePlannedValid(false);
            }
            else{
                var applicationDate = new Date(opportunity.rfqDatePlanned);
                var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setRFQDatePlannedValue(date + "/" + month + "/" + applicationDate.getFullYear());
                applicationDate = new Date(opportunity.lastUpdateDate);
                date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
        }
    }
    const setRFQDatePlannedStyle = (event) => {
        event.target.type = 'text';
        if(opportunity.rfqDatePlanned === undefined){
            if(RFQDatePlannedValid){
                setInputRFQDatePlannedStyle("form-control");
                setIconRFQDatePlannedStyle("input-group-text");
            }
            else{
                setInputRFQDatePlannedStyle("form-control is-invalid");
                setIconRFQDatePlannedStyle("input-group-text invalide");
            }
        }
    }
    const onBidReviewDatePlannedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setBidReviewDatePlannedValue(new Date(event.target.value));
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setBidReviewDatePlannedChanged(true);
        }
        else{
            setBidReviewDatePlannedChanged(false);
            if(opportunity.bidReviewDatePlanned === ""){
                setBidReviewDatePlannedValue("");
            }
            else{
                var applicationDate = new Date(opportunity.bidReviewDatePlanned);
                var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setBidReviewDatePlannedValue(date + "/" + month + "/" + applicationDate.getFullYear());
                applicationDate = new Date(opportunity.lastUpdateDate);
                date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
        }
    }
    const onSubmissionDatePlannedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setSubmissionDatePlannedValue(new Date(event.target.value));
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setSubmissionDatePlannedValueChanged(true);
            setSubmissionDatePlannedValid(true);
        }
        else{
            setSubmissionDatePlannedValueChanged(false);
            if(opportunity.submissionDatePlanned === ""){
                setSubmissionDatePlannedValue("");
                setSubmissionDatePlannedValid(false);
            }
            else{
                var applicationDate = new Date(opportunity.submissionDatePlanned);
                var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setSubmissionDatePlannedValue(date + "/" + month + "/" + applicationDate.getFullYear());
                applicationDate = new Date(opportunity.lastUpdateDate);
                date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
        }
    }
    const setSubmissionDatePlannedStyle = (event) => {
        event.target.type = 'text';
        if(opportunity.submissionDatePlannedValue === undefined){
            if(submissionDatePlannedValid){
                setInputSubmissionDatePlannedStyle("form-control");
                setIconSubmissionDatePlannedStyle("input-group-text");
            }
            else{
                setInputSubmissionDatePlannedStyle("form-control is-invalid");
                setIconSubmissionDatePlannedStyle("input-group-text invalide");
            }
        }
    }
    const onAwardDatePlannedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setAwardDatePlannedValue(new Date(event.target.value));
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setAwardDatePlannedValueChanged(true);
            setAwardDatePlannedValid(true);
        }
        else{
            setAwardDatePlannedValueChanged(false);
            if(opportunity.awardDatePlanned === ""){
                setAwardDatePlannedValue("");
                setAwardDatePlannedValid(false);
            }
            else{
                var applicationDate = new Date(opportunity.awardDatePlanned);
                var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setAwardDatePlannedValue(date + "/" + month + "/" + applicationDate.getFullYear());
                applicationDate = new Date(opportunity.lastUpdateDate);
                date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
        }
    }
    const setAwardDatePlannedStyle = (event) => {
        event.target.type = 'text';
        if(opportunity.awardDatePlannedValue === undefined){
            if(awardDatePlannedValid){
                setInputAwardDatePlannedStyle("form-control");
                setIconAwardDatePlannedStyle("input-group-text");
            }
            else{
                setInputAwardDatePlannedStyle("form-control is-invalid");
                setIconAwardDatePlannedStyle("input-group-text invalide");
            }
        }
    }
    const onSignatureDatePlannedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setSignatureDatePlannedValue(new Date(event.target.value));
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setSignatureDatePlannedValueChanged(true);
            setSignatureDatePlannedValid(true);
        }
        else{
            setSignatureDatePlannedValueChanged(false);
            if(opportunity.signatureDatePlanned === ""){
                setSignatureDatePlannedValue("");
                setSignatureDatePlannedValid(false);
            }
            else{
                var applicationDate = new Date(opportunity.signatureDatePlanned);
                var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setSignatureDatePlannedValue(date + "/" + month + "/" + applicationDate.getFullYear());
                applicationDate = new Date(opportunity.lastUpdateDate);
                date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
        }
    }
    const setSignatureDatePlannedStyle = (event) => {
        event.target.type = 'text';
        if(opportunity.signatureDatePlanned === undefined){
            if(signatureDatePlannedValid){
                setInputSignatureDatePlannedStyle("form-control");
                setIconSignatureDatePlannedStyle("input-group-text");
            }
            else{
                setInputSignatureDatePlannedStyle("form-control is-invalid");
                setIconSignatureDatePlannedStyle("input-group-text invalide");
            }
        }
    }
    const onRFQDateAchievedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setRFQDateAchievedValue(new Date(event.target.value));
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setRFQDateAchievedValueChanged(true);
        }
        else{
            setRFQDateAchievedValueChanged(false);
            if(opportunity.bidReviewDatePlanned === ""){
                setRFQDateAchievedValue("");
            }
            else{
                var applicationDate = new Date(opportunity.bidReviewDatePlanned);
                var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setRFQDateAchievedValue(date + "/" + month + "/" + applicationDate.getFullYear());
                applicationDate = new Date(opportunity.lastUpdateDate);
                date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
        }
    }
    const onBidReviewDateAchievedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setBidReviewDateAchievedValue(new Date(event.target.value));
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setBidReviewDateAchievedValueChanged(true);
        }
        else{
            setBidReviewDateAchievedValueChanged(false);
            if(opportunity.bidReviewDatePlanned === ""){
                setBidReviewDateAchievedValue("");
            }
            else{
                var applicationDate = new Date(opportunity.bidReviewDatePlanned);
                var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setBidReviewDateAchievedValue(date + "/" + month + "/" + applicationDate.getFullYear());
                applicationDate = new Date(opportunity.lastUpdateDate);
                date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
        }
    }
    const onSubmissionDateAchievedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setSubmissionDateAchievedValue(new Date(event.target.value));
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setSubmissionDateAchievedValueChanged(true);
        }
        else{
            setSubmissionDateAchievedValueChanged(false);
            if(opportunity.submissionDateAchieved === ""){
                setSubmissionDateAchievedValue("");
            }
            else{
                var applicationDate = new Date(opportunity.submissionDateAchieved);
                var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setSubmissionDateAchievedValue(date + "/" + month + "/" + applicationDate.getFullYear());
                applicationDate = new Date(opportunity.lastUpdateDate);
                date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
        }
    }
    const onAwardDateAchievedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setAwardDateAchievedValue(new Date(event.target.value));
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setAwardDateAchievedValueChanged(true);
        }
        else{
            setAwardDateAchievedValueChanged(false);
            if(opportunity.awardDateAchieved === ""){
                setAwardDateAchievedValue("");
            }
            else{
                var applicationDate = new Date(opportunity.awardDateAchieved);
                var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setAwardDateAchievedValue(date + "/" + month + "/" + applicationDate.getFullYear());
                applicationDate = new Date(opportunity.lastUpdateDate);
                date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
        }
    }
    const onSignatureDateAchievedChangeHandler = (event) => {
        if((event.target.value).length > 0){
            setSignatureDateAchievedValue(new Date(event.target.value));
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
            setSignatureDateAchievedValueChanged(true);
        }
        else{
            setSignatureDateAchievedValueChanged(false);
            if(opportunity.signatureDateAchieved === ""){
                setSignatureDateAchievedValue("");
            }
            else{
                var applicationDate = new Date(opportunity.signatureDateAchieved);
                var date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                var month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setSignatureDateAchievedValue(date + "/" + month + "/" + applicationDate.getFullYear());
                applicationDate = new Date(opportunity.lastUpdateDate);
                date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
                month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
                setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
            }
        }
    }
    const onCurrLocalPartChangeHandler = (event) => {
        if(event.target.value.length > 0){
            setCurrLocalPart(event.target.value);
            setCurrLocalPartChanged(true);
            var date = (revenueStartPlanned.getDate() <= 9 ? '0': '') + (revenueStartPlanned.getDate());
            var month = (revenueStartPlanned.getMonth() <= 9 ? '0': '') + (revenueStartPlanned.getMonth()+1);
            axios.get('http://localhost:8000/currency/closestCurr',{params: {code: event.target.value, date : date + "/" + month + "/" + revenueStartPlanned.getFullYear()}},{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                setCurrLocalPartDetails(response.data[0]);
            })
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
        }
        else{
            setCurrLocalPartChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
        }
    }
    const onCurrHQPartChangeHandler = (event) => {
        if(event.target.value.length > 0){
            setCurrHQPart(event.target.value);
            setCurrHQPartChanged(true);
            var date = (revenueStartPlanned.getDate() <= 9 ? '0': '') + (revenueStartPlanned.getDate());
            var month = (revenueStartPlanned.getMonth() <= 9 ? '0': '') + (revenueStartPlanned.getMonth()+1);
            axios.get('http://localhost:8000/currency/closestCurr',{params: {code: event.target.value, date : date + "/" + month + "/" + revenueStartPlanned.getFullYear()}},{headers: {Authorization: "Bearer "+authctx.token}}) 
            .then(response=>{
                setCurrHQPartDetails(response.data[0]);
            })
            var date = (currDate.getDate() <= 9 ? '0': '') + (currDate.getDate());
            var month = (currDate.getMonth() <= 9 ? '0': '') + (currDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + currDate.getFullYear());
        }
        else {
            setCurrHQPartChanged(false);
            var applicationDate = new Date(opportunity.lastUpdateDate);
            date = (applicationDate.getDate() <= 9 ? '0': '') + (applicationDate.getDate());
            month = (applicationDate.getMonth() <= 9 ? '0': '') + (applicationDate.getMonth()+1);
            setLastUpdateDate(date + "/" + month + "/" + applicationDate.getFullYear());
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
        setTotalValue(totalValue + parseFloat(totalAmount));
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
        if(editRow)
            setEditRow(false);
    }
    const showEditRow = (idR) => {
        setSelectedRow(data.filter(element => element.id === idR));
        setPl(selectedRow[0].plid);
        setLocalPartPL(selectedRow[0].localPart);
        setHQPartPL(selectedRow[0].hqPart);
        setTotalAmount(selectedRow[0].totalAmount);
        setEditRow(true);
        deleteRow(idR);
        if(addRow)
            setAddRow(false);
    }
    const updateRow = (idR) => {
        setSelectedRow(data.filter(element => element.id === idR));
        setPl(selectedRow[0].plid);
        var body = {
            id: idR
        };
        if(pl !== selectedRow[0].plid){
            body["productLine"] =  plDetails.name;
            body["plid"] = pl;
        }
        else{
            body["productLine"] =  selectedRow[0].productLine;
            body["plid"] = selectedRow[0].plid;
        }
        if(localPartPL !== selectedRow[0].localPart)
            body["localPart"] = localPartPL;
        else
            body["localPart"] = selectedRow[0].localPart;
        if(HQPartPL !== selectedRow[0].hqPart)
            body["hqPart"] = HQPartPL;
        else
            body["hqPart"] = selectedRow[0].hqPart;
        if(totalAmount !== selectedRow[0].totalAmount)
            body["totalAmount"] = totalAmount;
        else
            body["totalAmount"] = selectedRow[0].totalAmount;
        if(data.length > 0)
            setTotalValue(totalValue - parseFloat(selectedRow[0].totalAmount));
        else
            setTotalValue(0);
        if(totalAmount !== selectedRow[0].totalAmount)
            body["totalAmount"] = totalAmount;
        else
            body["totalAmount"] = selectedRow[0].totalAmount;
        if(commentPl !== selectedRow[0].comment)
            body["comment"] = commentPl;
        else
            body["comment"] = selectedRow[0].comment;
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
        if(addRow)
            setAddRow(false);
        setEditRow(false);
    }
    const deleteRow = (idR, amount) => {
        var newData = data.filter(element => element.id !== idR);
        setData(newData);
        if(data.length > 0)
            setTotalValue(totalValue - parseFloat(amount));
        else 
            setTotalValue(0);
    }


/////////////////////////////////////////////////////////////////////////

//     // if(activeStep === 0)
//     //     disabled = stageValid && businessUnitValid && businessLineValid && deptValid && countryValid && customerValid && descriptionValid && revenueStartPlannedValid && contractDurationValid && RFQDatePlannedValid && submissionDatePlannedValid && awardDatePlannedValid && signatureDatePlannedValid && presalesValid;
//     if(plValid && localPartPLValid)
//         disableAddRow = false;
//     // if(activeStep === 1)
//     //     disabled = currLocalPartValid && currHQPartValid && (data.length >= 1);



    const [IdMonthLocal, setIdMonthLocal] = useState("");
    const [IdYearLocal, setIdYearLocal] = useState("");

    const [revenueHQPart, setrevenueHQPart] = useState([]);
    const [valHQPart, setValHQPart] = useState(0);
    const [totalHQPart, setTotalHQPart] = useState(0);
    const [IdMonthHQ, setIdMonthHQ] = useState("");
    const [IdYearHQ, setIdYearHQ] = useState("");



    useEffect(() => {
        if(!revenueStartPlannedChanged){
            var date1 = new Date(opportunity.revenueStartPlanned);
            var date2 = new Date(opportunity.revenueStartPlanned);
            setNbTables(parseInt(date2.getFullYear()) - parseInt(date1.getFullYear()) + 1);
            var year = [];
            Months.map((v)=>{
                var o = {id: v.id, value: 0};
                year.push(o);
            })
            var body = [];
            for(var i = parseInt(date1.getFullYear()); i <= parseInt(date2.getFullYear()); i++){
                var t = {year: i, months: year};
                body.push(t);
            }
            setrevenueLocalPart(body);
            setrevenueHQPart(body);
        }
        else{
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

// console.log("local")
console.log(revenueLocalPart)
// console.log("HQ")
console.log(revenueHQPart)



//////////////////////////////////////////////////////////////////////////////////
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
                                                    <input className="form-control edit" type="text" disabled placeholder={creationDate}/>
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
                                                    <input className="form-control edit" type="text" disabled placeholder={lastUpdateDate}/>
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
                                                    <input className="form-control edit" type="text" disabled placeholder={lastStageUpdateDate}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Sales Manager</label>
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
                                                    <Select onBlur={setCustomerStyle} displayEmpty renderValue={customer !== '' ? undefined : () => "Select a Customer"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onCustomerChangeHandler} className={inputCustomerStyle} value={customer} defaultValue={customer} disabled={disableCust}>
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
                                            <label className="form-control-label">In Budget</label>&nbsp;&nbsp;&nbsp;
                                            <FormControlLabel control={<Switch checked={inBudget} onChange={handleInBudgetChange}/>}/>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                               <label className="form-control-label">Revenue Start Planned</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><Calendar/></span>
                                                    </div>
                                                    <input className="form-control form-placeholder" onChange={onRevenueStartPlannedChangeHandler} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} default="" placeholder={revenueStartPlanned}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Contract Duration(months)</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><CreditCard2Front size={17}/></span>
                                                    </div>
                                                    <input type="number" onChange={onContractDurationChangeHandler} className="form-control form-placeholder" placeholder={contractDuration}/>
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
                                                    <Select onBlur={setPresalesStyle} displayEmpty renderValue={presales !== '' ? undefined : () => "Select a Presales Engineer"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onPresalesChangeHandler} className={inputPresalesStyle} value={presales} defaultValue={presales} disabled={disabledPresales}>
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
                                                <textarea rows="1" className="form-control" onChange={onReasonChangeHandler} placeholder={reason}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Stage</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><Briefcase size={17}/></span>
                                                    </div>
                                                    <Select sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} className="form-control form-placeholder" value={stage} onChange={onStageChangeHandler}>
                                                        {stages.map((d) => (
                                                            <MenuItem value={d.name} key={d.id}>{d.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Success Rate</label>
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
                                                    <Select onBlur={setCountryStyle} displayEmpty renderValue={country !== '' ? undefined : () => "Select a Country"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onCountryChangeHandler} className={inputCountryStyle} value={country} disabled={disableCountry} defaultValue={country}>
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
                                                <label className="form-control-label">Description</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><FileEarmarkText size={17}/></span>
                                                    </div>
                                                    <textarea onChange={onDescriptionChangeHandler} rows="1" className="form-control form-placeholder" placeholder={description}/>
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
                                                    <input className="form-control" type="number" disabled placeholder={totalValue}/>
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
                                                    <input type="number" className="form-control" placeholder={fullValue} onChange={onFullValueChangeHandler}/>
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
                                                    <textarea rows="1" className="form-control" onChange={onCommentChangeHandler} placeholder={comment}/>
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
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className={iconRFQDatePlannedStyle}><Calendar/></span>
                                                            </div>
                                                            <input className={inputRFQDatePlannedStyle} onChange={onRFQDatePlannedChangeHandler} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={setRFQDatePlannedStyle} default="" placeholder={RFQDatePlannedValue}/>
                                                            {!RFQDatePlannedValid && <div className="invalid-feedback">RFQ Date Planned should not be empty</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Bid Review Date Planned{bidReviewDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><Calendar/></span>
                                                            </div>
                                                            <input onChange={onBidReviewDatePlannedChangeHandler} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className="form-control"  default="" placeholder={bidReviewDatePlannedValue}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Submission Date Planned{submissionDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className={iconSubmissionDatePlannedStyle}><Calendar/></span>
                                                            </div>
                                                            <input className={inputSubmissionDatePlannedStyle} onChange={onSubmissionDatePlannedChangeHandler} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={setSubmissionDatePlannedStyle} default="" placeholder={submissionDatePlannedValue}/>
                                                            {!submissionDatePlannedValid && <div className="invalid-feedback">Submission Date Planned should not be empty</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Award Date Planned{awardDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className={iconAwardDatePlannedStyle}><Calendar/></span>
                                                            </div>
                                                            <input className={inputAwardDatePlannedStyle} onChange={onAwardDatePlannedChangeHandler} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={setAwardDatePlannedStyle} default="" placeholder={awardDatePlannedValue}/>
                                                            {!awardDatePlannedValid && <div className="invalid-feedback">Award Date Planned should not be empty</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Signature Date Planned{signatureDatePlanned && <span className="text-danger">*</span>}</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className={iconSignatureDatePlannedStyle}><Calendar/></span>
                                                            </div>
                                                            <input className={inputSignatureDatePlannedStyle} onChange={onSignatureDatePlannedChangeHandler} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={setSignatureDatePlannedStyle} default="" placeholder={signatureDatePlannedValue}/>
                                                            {!signatureDatePlannedValid && <div className="invalid-feedback">Signature Date Planned should not be empty</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">RFQ Date Achieved{RFQDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><Calendar/></span>
                                                            </div>
                                                            <input onChange={onRFQDateAchievedChangeHandler} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className="form-control" default="" placeholder={RFQDateAchievedValue}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Bid Review Date Achieved{bidReviewDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><Calendar/></span>
                                                            </div>
                                                            <input onChange={onBidReviewDateAchievedChangeHandler} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className="form-control" default="" placeholder={bidReviewDateAchievedValue}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">    
                                                        <label className="form-control-label">Submission Date Achieved{submissionDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><Calendar/></span>
                                                            </div>
                                                            <input onChange={onSubmissionDateAchievedChangeHandler} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className="form-control" default="" placeholder={submissionDateAchievedValue}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Award Date Achieved{awardDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><Calendar/></span>
                                                            </div>
                                                            <input onChange={onAwardDateAchievedChangeHandler} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className="form-control" default="" placeholder={awardDateAchievedValue}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div className="form-group">
                                                        <label className="form-control-label">Signature Date Achieved{signatureDateAchieved && <span className="text-danger">*</span>}</label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><Calendar/></span>
                                                            </div>
                                                            <input onChange={onSignatureDateAchievedChangeHandler} type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} className="form-control" default="" placeholder={signatureDateAchievedValue}/>
                                                        </div>
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
                                        <label className="form-control-label">Currency Local Part</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><Briefcase size={17}/></span>
                                            </div>
                                            <Select displayEmpty renderValue={currLocalPart !== '' ? undefined : () => "Select a Currency Local Part"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onCurrLocalPartChangeHandler} className="form-control form-placeholder" value={currLocalPart} defaultValue={currLocalPart}>
                                                {currLocalPartData.map((d) => (
                                                    <MenuItem value={d.name} key={d.name}>{d.name}</MenuItem>
                                                ))}
                                            </Select>
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
                                        <label className="form-control-label">Currency HQ Part</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><Briefcase size={17}/></span>
                                            </div>
                                            <Select displayEmpty renderValue={currHQPart !== '' ? undefined : () => "Select a Currency HQ Part"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} onChange={onCurrHQPartChangeHandler} className="form-control form-placeholder" value={currHQPart} defaultValue={currHQPart}>
                                                {currHQPartData.map((d) => (
                                                    <MenuItem value={d.name} key={d.name}>{d.name}</MenuItem>
                                                ))}
                                            </Select>
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
                                                {addRow && 
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
                                                        <td className="text-center text-xs font-weight-bold"><span className="btn bg-transparent" onClick={()=>{saveRow()}} disabled={disableAddRow}><Save size={15}/></span></td>
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
                                                        <td className="text-center text-xs font-weight-bold"><span className="btn bg-transparent" onClick={()=>{showEditRow(v.id)}}><Pencil size={18} color="green"/></span>&nbsp;<span className="btn bg-transparent" onClick={()=>{deleteRow(v.id, v.localPart)}}><Trash size={18} color="red"/></span></td>
                                                    </tr>
                                                )}
                                                {editRow &&
                                                    <tr>
                                                        <td className="text-center text-xs font-weight-bold">
                                                            <Select onBlur={setPlStyle} displayEmpty renderValue={pl !== '' ? undefined : () => "Select a Product Line"} sx={{"& .MuiOutlinedInput-notchedOutline": {border: "none"}}} multiple={false} className={inputPlStyle} value={pl} defaultValue={pl} onChange={onPlChangeHandler}>
                                                                {plData.map((d) => (
                                                                    <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </td>
                                                        <td className="text-center text-xs font-weight-bold">
                                                            <input type="number" placeholder={selectedRow[0].localPart} onChange={onLocalPartPLChangeHandler} className="form-control form-placeholder"/>
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
                                                            <input placeholder={selectedRow[0].comment} onChange={onCommentPlChangeHandler} className="form-control"/>
                                                        </td>
                                                        <td className="text-center text-xs font-weight-bold"><span className="btn bg-transparent" onClick={()=>{updateRow(selectedRow[0].id)}} disabled={disableAddRow}><PencilSquare size={15}/></span></td>
                                                    </tr>
                                                }
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
                                            <input className="form-control" value={revenueStartPlanned} disabled/>
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

    console.log("After");
    
        //     "totalValue": parseFloat(totalValue),
        //     "revenueLocalPart": revenueLocalPart,
        //     "revenueHQPart": revenueHQPart 

    const submithandler = (event) => {
        event.preventDefault();
        var body = { }
        if(stageChanged){
            body["lastStageUpdateDate"] = currDate.toISOString();
            body["stage"] = stage;
        }
        if(successsRateChanged)
            body["successRate"] = parseInt(successsRate);
        if(salesManagerChanged){
            body["salesManager"] = "/api/users/"+salesManager;
            if(businessUnit !== "")
                body["businessunit"] = "/api/businessunits/"+businessUnit;
            if(businessLine !== "")
                body["businessline"] = "/api/businesslines/"+businessLine;
            if(department !== "")
                body["department"] = "/api/departments/"+department;
            if(country !== "")
                body["countries"] = "/api/geographies/"+country;
            if(customer !== "")
                body["customer"] = "/api/customers/"+customer;
            if(presales !== "")
                body["presalesEng"] = "/api/presales/"+presales;
        }
        if(businessUnitChanged)
            body["businessunit"] = "/api/businessunits/"+businessUnit;
        if(businessLineChanged)
            body["businessline"] = "/api/businesslines/"+businessLine;
        if(departmentChanged)
            body["department"] = "/api/departments/"+department;
        if(countryChanged)
            body["countries"] = "/api/geographies/"+country;
        if(customerChanged)
            body["customer"] = "/api/customers/"+customer;
        if(descriptionChanged)
            body["description"] = description;
        if(inBudgetChanged)
            body["inBudget"] = inBudget;
        if(revenueStartPlannedChanged){
            body["revenueStartPlanned"] =  revenueStartPlanned.toISOString();
            body["revenueStartAchieved"] = (new Date (revenueStartAchieved)).toISOString();
        }    
        if(contractDurationChanged){
            body["contractDuration"] = parseInt(contractDuration);
            body["revenueStartAchieved"] = (new Date (revenueStartAchieved)).toISOString();
        }
        if(fullValueChanged)
            body["fullValue"] = parseFloat(fullValue);
        if(presalesChnaged)
            body["presalesEng"] = "/api/presales/"+presales;
        if(reasonChanged)
            body["reason"] = reason;
        if(commentChanged)
            body["comment"] = comment;
        if(RFQDatePlannedValueChanged)
            body["rfqDatePlanned"] = RFQDatePlannedValue.toISOString();
        if(bidReviewDatePlannedChanged)
            body["bidReviewDatePlanned"] = bidReviewDatePlannedValue.toISOString();
        if(submissionDatePlannedValueChanged)
            body["submissionDatePlanned"] = submissionDatePlannedValue.toISOString();
        if(awardDatePlannedValueChanged)
            body["awardDatePlanned"] = awardDatePlannedValue.toISOString();
        if(signatureDatePlannedValueChanged)
            body["signatureDatePlanned"] = signatureDatePlannedValue.toISOString();
        if(RFQDateAchievedValueChanged)
            body["rfqDateAchieved"] = RFQDateAchievedValue.toISOString();
        if(bidReviewDateAchievedValueChanged)
            body["bidReviewDateAchieved"] = bidReviewDateAchievedValue.toISOString();
        if(submissionDateAchievedValueChanged)
            body["submissionDateAchieved"] = submissionDateAchievedValue.toISOString();
        if(awardDateAchievedValueChanged)
            body["awardDateAchieved"] = awardDateAchievedValue.toISOString();
        if(signatureDateAchievedValueChanged)
            body["signatureDateAchieved"] = signatureDateAchievedValue.toISOString();
        if(currLocalPartChanged)
            body["currLocalPart"] = "/api/currencies/"+currLocalPartDetails.id;
        if(currHQPartChanged)
            body["currHQPart"] = "/api/currencies/"+currHQPartDetails.id;
    
    
        
        
        
        if(successsRateChanged || salesManagerChanged || businessUnitChanged || businessLineChanged || departmentChanged || countryChanged || customerChanged || descriptionChanged || inBudgetChanged 
            || revenueStartPlannedChanged || contractDurationChanged || fullValueChanged || presalesChnaged || reasonChanged || commentChanged || RFQDatePlannedValueChanged || bidReviewDatePlannedChanged
            || submissionDatePlannedValueChanged || awardDatePlannedValueChanged || signatureDatePlannedValueChanged || RFQDateAchievedValueChanged || bidReviewDateAchievedValueChanged
            || submissionDateAchievedValueChanged || awardDateAchievedValueChanged || signatureDateAchievedValueChanged || currLocalPartChanged || currHQPartChanged)
            body["lastUpdateDate"] = currDate.toISOString();
        console.log(body);

        axios.patch('http://localhost:8000/api/opportunities/'+id,body,{headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: "Bearer "+authctx.token
          }})
        .then(response=> {
            console.log(body);
            data.map((v)=>{
                var plObj = {
                    "opportunity": "/api/opportunities/"+(parseInt(id)),
                    "productline": "/api/productlines/"+1,
                    "localPart": parseFloat(v.localPart),
                    "hqPart": parseFloat(v.hqPart),
                    "totAmount": parseFloat(v.totalAmount),
                    "comment": v.comment
                } 
                console.log(plObj);
                axios.post('http://localhost:8000/api/opp_productlines',plObj,{headers: {Authorization: "Bearer "+authctx.token}})
                .then(response=> {
                    NotificationManager.success('The Opportunity has been successfully updated !');
                    console.log(plObj);
                })
                .catch(function (error) {
                    NotificationManager.error('The Opportunity has not been updated !');
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
                                <button type="button" className="rounded-pill btn d-flex align-items-center backBtn" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}><ArrowLeft size={20}/>&nbsp;&nbsp;Back</button>
                                <Box sx={{ flex: "1 1 auto"}}/>
                                {activeStep === steps.length - 1 ?
                                    <button type="button" onClick={submithandler} className="rounded-pill btn d-flex align-items-center btn-success"><i className="ni fa-2x ni-fat-add"></i>&nbsp;&nbsp;Edit</button>
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
export default EditOpportunity;