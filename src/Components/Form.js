import React, { useState } from "react";
import { Button, FormLayout, Page, TextField } from "@shopify/polaris";
import { show } from "../Redux/Action";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Form = (props) => {
  let navigate = useNavigate();
  const [info, setInfo] = useState({
    customer: "",
    username: "",
    password: "",
  });

  const login = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
      },
    };
    fetch(
      `https://fbapi.sellernext.com/user/login?username=${info.username}&password=${info.password}`,
      requestOptions
    )
      .then((response) => response.json())

      .then((actualData) => {
        if (!actualData.success) {
          throw new Error(
            "Username or Password is Invalid, Please fill correct Details"
          );
        } else {
          console.log(actualData);

          sessionStorage.setItem(
            "data",
            JSON.stringify({ ...info, token: actualData.data.token })
          );
          props.show();
          navigate("./home");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Page>
      <FormLayout>
        <TextField
          label="Customer Name"
          requiredIndicator
          onChange={(value) => setInfo({ ...info, customer: value })}
          value={info.customer}
          autoComplete="off"
        />
        <TextField
          type="text"
          label="Username"
          requiredIndicator
          onChange={(value) => setInfo({ ...info, username: value })}
          value={info.username}
          autoComplete="off"
        />
        <TextField
          type="password"
          label="password"
          requiredIndicator
          onChange={(value) => setInfo({ ...info, password: value })}
          value={info.password}
          autoComplete="off"
        />
        <Button primary onClick={login}>
          LOGIN
        </Button>
      </FormLayout>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUsername: state.loggedUsername,
    loggedCustomer: state.loggedCustomer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    show: () => dispatch({ type: "Show_Data" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
