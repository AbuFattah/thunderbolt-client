import React from "react";
import ReactDOM from "react-dom";
const ModalConfirm = ({ orderToDelete, onCancelOrder }) => {
  const { _id: orderId, name } = orderToDelete;
  // <!-- Put this part before </body> tag -->
  // using react portal to put modal in body to avoid stacking context issues
  return ReactDOM.createPortal(
    <>
      <input type="checkbox" id="modal-confirm" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Are you sure?</h3>
          <p class="py-4">
            You want to Cancel order for{" "}
            <span className="font-semibold">{name}</span> ?
          </p>
          <div class="modal-action">
            <label for="modal-confirm" class="btn">
              Close
            </label>
            <button
              onClick={onCancelOrder.bind(null, orderId)}
              className="btn  btn-error"
            >
              Cancel order
            </button>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("body")
  );
};

export default ModalConfirm;
