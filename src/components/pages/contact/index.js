import React, { useState } from "react";
import Header from "../../shared/header";
import DataTable from "react-data-table-component";
import { ChevronDown, Edit, Trash } from "react-feather";
import { Button } from "reactstrap";
import "../../sass/Contact.scss";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, selectContact } from "./store";
import AddForm from "./Form";
import DeleteForm from "./deleteForm";
import toast from "react-hot-toast";

const Contact = () => {
  const { contactList } = useSelector((state) => state.contactMaster);
  const [show, setShow] = useState(false);
  const [deleteData, setDeleteData] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  console.log("contactList", contactList);
  const dispatch = useDispatch();

  const handleEditClick = async (data) => {
    setShow(true);
    dispatch(selectContact(data));
    // console.log("index", index);
  };

  const handleDelete = async () => {
    const arr = await contactList.filter((e) => e.id !== deleteData.id);
    dispatch(deleteContact(arr));

    toast.success("Contact Deleted Successfully");
    setDeleteModal(false);
  };

  const columns = [
    {
      name: "First Name",
      selector: "firstName",
      width: "25%",
      sortable: false,
      selector: (row) => row.firstName,
      cell: (row) => <span className="text-capitalize ">{row.firstName}</span>,
    },
    {
      name: "Last Name",
      selector: "lastName",
      width: "25%",
      sortable: false,
      selector: (row) => row.lastName,
      cell: (row) => <span className="text-capitalize ">{row.lastName}</span>,
    },
    {
      name: "Status",
      selector: "status",
      width: "25%",
      sortable: false,
      selector: (row) => row?.status,
      cell: (row) => (
        <span className="text-capitalize ">
          {row?.status === "active" ? "Active" : "InActive"}
        </span>
      ),
    },
    {
      name: "Actions",
      width: "25%",
      cell: (row) => {
        return (
          <div
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {/* {hasPermission("Designation_Update") && ( */}
            <Button
              color="transparent"
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              onClick={() => handleEditClick(row)}
            >
              <Edit size={20} />
            </Button>
            <Button
              size={20}
              color="transparent"
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
              onClick={() => {
                //   dispatch(selectContact(row));
                setDeleteData(row);
                setDeleteModal(true);
              }}
            >
              <Trash size={20} />
            </Button>
            {/* )} */}
          </div>
        );
      },
    },
  ];

  const dataToRender = () => {
    return contactList;
  };

  const handleAdd = () => {
    // const payload = {
    //   firstName: "bunty",
    //   lastName: "dhadve",
    // };
    // dispatch(addContact(payload));
    setShow(true);
  };

  return (
    <div className="contact">
      {show && <AddForm setShow={setShow} />}
      {deleteModal && (
        <DeleteForm
          setDeleteModal={setDeleteModal}
          handleDelete={handleDelete}
        />
      )}
      <Header title="Contacts" add={true} handleAdd={handleAdd} />
      <div className="contact__table">
        <DataTable
          pagination
          subHeader
          noHeader={true}
          responsive
          highlightOnHover
          paginationServer
          progressComponent={
            <ClipLoader
              //   color={color}
              //   loading={loading}
              //   cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              //   data-testid="loader"
            />
          }
          //   progressPending={loader}
          columns={columns}
          data={dataToRender()}
          //   data={list}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          //   paginationComponent={renderPaginationComponent}
        />
      </div>
    </div>
  );
};

export default Contact;
