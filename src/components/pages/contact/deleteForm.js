import React from "react";
import { Trash } from "react-feather";

const DeleteForm = ({ setDeleteModal, handleDelete }) => {
  return (
    <div className="addModal">
      <div className="addModal__content addModal__content--padding">
        <div className="addModal__content--header">
          <h3 className="mb-0">Are You Sure ?</h3>
        </div>
        <div style={{ display: "grid", justifyContent: "center" }}>
          <Trash size={30} />
        </div>

        <div className="addModal__content--footer">
          <button
            className="addModal__content--footer-btn"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="addModal__content--footer-btn addModal__content--footer-btn-close"
            onClick={() => setDeleteModal(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;
