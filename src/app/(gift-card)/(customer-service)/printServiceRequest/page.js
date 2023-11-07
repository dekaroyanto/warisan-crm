"use client";
import React, { useEffect, useState } from "react";

import { Button, Input } from "@nextui-org/react";
import { Formik, Form, FieldArray, useFormik, ErrorMessage } from "formik";

import * as Yup from "yup";

const printServiceRequest = () => {
  const initialValues = {
    date_filled: "",
    time_from: "",
    time_to: "",
    filed_by: "",
  };

  return (
    <div className="md:container mx-auto py-2 pb-10">
      <h1 className="text-5xl font-thin text-title mb-6 mt-4">
        Print Service Request
      </h1>

      <div className="border-b-4 font-thin text-red-500 border-red-700 decoration-pink-500 opacity-100 text-2xl font-thin">
        <strong>Report Filters</strong>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          date_filled: Yup.string().required("Date Filled must be required"),
          time_from: Yup.string().required("Time From must be required"),
          time_to: Yup.string().required("Time To must be required"),
        })}
      >
        {(props) => (
          <Form>
            <div className="w-full grid grid-cols-12 gap-4 mt-4">
              <div className="col-span-6">
                <Input
                  isRequired
                  size="sm"
                  placeholder="dd/mm/yy"
                  label="Date Filled"
                  name="date_filled"
                  type="date"
                  variant="bordered"
                  //   onChange={props.handleChange}
                  //   onBlur={props.handleBlur}
                />
                {props.touched.date_filled && props.errors.date_filled ? (
                  <div className="text-sm text-primary font-semibold">
                    {props.errors.date_filled}
                  </div>
                ) : null}
              </div>

              <div className="col-span-6">
                <Input
                  isRequired
                  size="sm"
                  label="Filed By"
                  name="filed_by"
                  variant="bordered"
                  //   onChange={props.handleChange}
                  //   onBlur={props.handleBlur}
                />
                {props.touched.filed_by && props.errors.filed_by ? (
                  <div className="text-sm text-primary font-semibold">
                    {props.errors.filed_by}
                  </div>
                ) : null}
              </div>
              <div className="col-span-6">
                <Input
                  isRequired
                  size="sm"
                  placeholder="h:m"
                  label="Time From"
                  name="time_from"
                  type="time"
                  variant="bordered"
                  //   onChange={props.handleChange}
                  //   onBlur={props.handleBlur}
                />
                {props.touched.time_from && props.errors.time_from ? (
                  <div className="text-sm text-primary font-semibold">
                    {props.errors.time_from}
                  </div>
                ) : null}
              </div>
              <div className="col-span-6">
                <Input
                  isRequired
                  size="sm"
                  placeholder="h:m"
                  label="Time To"
                  name="time_to"
                  type="time"
                  variant="bordered"
                  //   onChange={props.handleChange}
                  //   onBlur={props.handleBlur}
                />
                {props.touched.time_to && props.errors.time_to ? (
                  <div className="text-sm text-primary font-semibold">
                    {props.errors.time_to}
                  </div>
                ) : null}
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Button color="primary" className="mt-5">
        Print
      </Button>
    </div>
  );
};

export default printServiceRequest;
