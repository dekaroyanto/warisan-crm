"use client";
import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { Select, SelectItem } from "@nextui-org/react";

const businessUnit = [
  { id: "", value: "Select Office" },
  { id: "ID030", value: "ID030 - Carefour" },
  { id: "ID020", value: "ID020 - Transmart" },
  { id: "ID010", value: "ID010 - Trans Snow" },
];

export default function InviteFriends() {
  const initialValues = {
    friends: [
      {
        value: "",
      },
    ],
  };
  return (
    <div>
      <h1>Invite friends</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(props) => (
          <Form>
            <FieldArray name="friends">
              {({ insert, remove, push }) => (
                <div>
                  {props.values.friends.length > 0 &&
                    props.values.friends.map((friend, index) => (
                      <div className="row" key={index}>
                        {/* <div className="col">
                          <Select
                            size="sm"
                            radius="sm"
                            label="Business Unit"
                            variant="bordered"
                            name={`friends.${index}.value`}
                            onChange={props.handleChange}
                          >
                            {businessUnit?.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.value}
                              </SelectItem>
                            ))}
                          </Select>
                          <p className="text-small text-default-500">
                            Selected: {friend.value}
                          </p>
                        </div> */}
                        <div className="col">
                          <select
                            name={`friends.${index}.value`}
                            onChange={props.handleChange}
                            value={friend.value}
                            placeholder="select"
                          >
                            {businessUnit?.map((e) => (
                              <option key={e.value} value={e.value}>
                                {e.value}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => {
                              remove(index);
                              console.log("firned ", friend.value);
                              // let filter = props.values.friends.filter(
                              //   (e, i) => {
                              //     return (
                              //       e.value !==
                              //       props.values.friends[index].value
                              //     );
                              //   }
                              // );
                              // handleRemove(filter);
                              // console.log("filte ", filter[index]);
                              console.log(props.values.friends[index]);
                            }}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push({ value: "" })}
                  >
                    Add Friend
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit">Invite</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
