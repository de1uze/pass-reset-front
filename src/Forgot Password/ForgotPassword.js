import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import classes from "./ForgotPassword.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

function ForgotPassword() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const submitHandler = (data, event) => {
    event.preventDefault();

    const email = data.email;

    fetch(
      "https://loginresetflow-backend.herokuapp.com/api/v1/users/forgotPassword",
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            const errorMessage = `${data.message}`;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        alert(data.status);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h3>Forgot Password</h3>
        <p className={classes.subText}>
          Forgot Password! <br /> No worries we will send you password reset
          link to your email
        </p>
      </div>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <div>
          <TextField
            id="outlined-basic"
            margin="normal"
            label="Email"
            variant="outlined"
            style={{ width: 300 }}
            type="email"
            name="email"
            {...register("email", { required: true })}
          />
          <p className={classes.error}>{errors.email?.message}</p>
        </div>
        <div className={classes.btn}>
          <Button variant="contained" type="submit">
            Send Reset Email
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
