const Modal = (props) => {
  return ( 
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h1 className="text-center -mt-4">{props.user} is anonymized</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Modal ;