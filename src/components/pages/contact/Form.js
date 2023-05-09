import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "../../sass/AddForm.scss";

import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import { addContact, editContact, selectContact, setLoader } from "./store";

const defaultValues = {
  firstName: "",
  lastName: "",
  status: "",
};
const AddForm = ({ setShow }) => {
  const { selected, contactList } = useSelector(
    (state) => state?.contactMaster
  );
  const dispatch = useDispatch();
  const {
    reset,
    control,
    setError,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleModalClosed = () => {
    setShow(false);
    reset();
    dispatch(selectContact(null));
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    let response = "";
    if (selected) {
      await dispatch(setLoader(true));

      const modifiedArray = contactList.map((obj) => {
        if (obj.id === data.id) {
          return {
            ...obj,
            firstName: data.firstName,
            lastName: data.lastName,
            status: data.status,
          };
        }
        return obj;
      });

      response = await dispatch(editContact(modifiedArray));
      toast.success("Contact Edited Successfully");
    } else {
      await dispatch(setLoader(true));
      response = await dispatch(
        addContact({
          id: contactList.length + 1,
          firstName: data.firstName,
          lastName: data.lastName,
          status: data.status,
        })
      );
      toast.success("Contact Added Successfully");
    }
    if (response) {
      handleModalClosed();
    }
  };

  useEffect(() => {
    if (selected) {
      setValue("id", selected.id);
      setValue("firstName", selected.firstName);
      setValue("lastName", selected.lastName);
      setValue("status", selected.status);
    }
  }, []);

  return (
    <div className="addModal">
      <div className="addModal__content">
        <div className="addModal__content--header">
          <h2 className="mb-0">{selected ? "Edit" : "Add"} Contact</h2>
        </div>

        <Row tag={Form} className="p-2" onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12} className="addModal__content--body">
            <div className="addModal__content--input">
              <Label className="form-label" for="Users">
                First Name <span className="text-danger">*</span>
              </Label>
              <Controller
                id="firstName"
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    className="addModal__content--input-1"
                    placeholder="Enter First Name"
                    {...register("firstName", {
                      required: "Please enter First Name ",
                      // pattern: {
                      //   value: characterRegex,
                      //   message: 'Allow Only 100 Character'
                      // }
                    })}
                    invalid={errors.firstName ? true : false}
                    {...field}
                  />
                )}
              />
              {errors && errors.firstName && (
                <FormFeedback style={{ color: "orangered" }}>
                  {errors.firstName.message}
                </FormFeedback>
              )}
            </div>

            <div className="addModal__content--input">
              <Label className="form-label" for="Users">
                Last Name <span className="text-danger">*</span>
              </Label>
              <Controller
                id="lastName"
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    className="addModal__content--input-1"
                    placeholder="Enter Last Name"
                    {...register("lastName", {
                      required: "Please enter Last Name ",
                      // pattern: {
                      //   value: characterRegex,
                      //   message: 'Allow Only 100 Character'
                      // }
                    })}
                    // invalid={errors.lastName ? true : false}
                    {...field}
                  />
                )}
              />
              {errors && errors.lastName && (
                <FormFeedback style={{ color: "orangered" }}>
                  {errors.lastName.message}
                </FormFeedback>
              )}
            </div>
            <div className="addModal__content--input">
              <Label className="form-label" for="Users">
                Status <span className="text-danger">*</span>
              </Label>
              <Controller
                name="status"
                control={control}
                defaultValue="active"
                render={({ field }) => (
                  <div
                    style={{
                      display: "grid",
                      gridAutoFlow: "column",
                      alignItems: "center",
                      gap: "50px",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridAutoFlow: "column",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <input
                        {...field}
                        type="radio"
                        id="active"
                        value="active"
                        style={{ cursor: "pointer" }}
                        //   style={{ height: "20px", width: "20px" }}
                        checked={field.value === "active"}
                      />
                      <label htmlFor="active" style={{ color: "black" }}>
                        Active
                      </label>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridAutoFlow: "column",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <input
                        {...field}
                        type="radio"
                        id="inactive"
                        value="inactive"
                        style={{ cursor: "pointer" }}
                        checked={field.value === "inactive"}
                      />
                      <label htmlFor="inactive" style={{ color: "black" }}>
                        Inactive
                      </label>
                    </div>
                  </div>
                )}
              />

              {errors && errors.status && (
                <FormFeedback>{errors.status.message}</FormFeedback>
              )}
            </div>
          </Col>

          <Col xs={12} className="addModal__content--footer">
            <Button className="addModal__content--footer-btn" type="submit">
              Submit
            </Button>
            <button
              className="addModal__content--footer-btn addModal__content--footer-btn-close"
              onClick={() => setShow(false)}
            >
              Close
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddForm;
