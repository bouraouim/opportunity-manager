const Modalinput = (props) => {
    return (  
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-body">
      <input type="text" onChange={props.onchange} className="form-control" id="example3cols1Input" placeholder="search"/>
      </div>
    </div>
  </div>
</div>
     );
}
 
export default Modalinput;