import React from "react";
import ReactDOM from "react-dom";
const ModalConfirm = ({ itemId, onDelete, children, actionName }) => {
  // const { _id: orderId, name } = orderToDelete;
  // <!-- Put this part before </body> tag -->
  // using react portal to put modal in body to avoid stacking context issues
  return ReactDOM.createPortal(
    <>
      <input type="checkbox" id="modal-confirm" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Are you sure?</h3>
          <p class="py-4">{children}</p>
          <div class="modal-action">
            <label for="modal-confirm" class="btn">
              Close
            </label>
            <button
              onClick={onDelete.bind(null, itemId)}
              className="btn  btn-error"
            >
              {actionName}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("body")
  );
};

export default ModalConfirm;
