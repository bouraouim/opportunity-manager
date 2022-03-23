import React from 'react';

const Userhook = () => {
    const [budata , setBudata]=useState([])
    const [bldata , setBldata]=useState([])
    const [roledata , setRoledata]=useState([])
    const [poledata , setPoledata]=useState([])

    
    useEffect(()=>{

        //businessunit
        axios.get('http://localhost:8000/businessunit/read') 
        .then(response=>{
          console.log(response)
            const table=(response.data.map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setBudata(table)
        }).catch(error=>{
          console.error(error);
        }) 

        //businessline
        axios.get('http://localhost:8000/businessline/read') 
        .then(response=>{
          console.log(response)
            const table=(response.data.map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setBldata(table)
        }).catch(error=>{
          console.error(error);
        }) 

        //Role
        axios.get('http://localhost:8000/role/read') 
        .then(response=>{
          console.log(response)
            const table=(response.data.map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setRoledata(table)
        }).catch(error=>{
          console.error(error);
        }) 

        //pole
        axios.get('http://localhost:8000/pole/read') 
        .then(response=>{
          console.log(response)
            const table=(response.data.map(d=>{
                return{
                    id: d.id,
                    name:d.name,
                } 
            }))
            setPoledata(table)
        }).catch(error=>{
          console.error(error);
        }) 
    },[])
    
    const navigate=useNavigate();
    const submithandler=(event)=>{
      event.preventDefault(); 
      console.log(buRef.current.value)
        const inputname=nameRef.current.value
      const buinput=buRef.current.value
      const body={
        "name": inputname,
        "businessunit": {
          "id": buinput
        }
      }
      axios.post('http://localhost:8000/api/usersbusinesslines',body)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      navigate('/businessline')  
    }






    return {

    }
};

export default Userhook;