import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import classes from "./ResetPassword.module.css";

const Schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must atleast 6 characters long")
    .max(15)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

function ResetPassword() {
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const submitHandler = (data, event) => {
    event.preventDefault();
    const password = data.password;
    const passwordConfirm = data.confirmPassword;

    const token = params.token;

    fetch(
      `https://loginresetflow-backend.herokuapp.com/api/v1/users/resetPassword/${token}`,
      {
        method: "PATCH",
        body: JSON.stringify({ password, passwordConfirm }),
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
        <h3>Reset Password</h3>
      </div>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <div>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            margin="normal"
            style={{ width: 300 }}
            type="password"
            name="password"
            {...register("password", {
              required: true,
            })}
          />
          <p className={classes.error}> {errors.password?.message}</p>
        </div>
        <div>
          <TextField
            name="confirmPassword"
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            style={{ width: 300 }}
            type="password"
            {...register("confirmPassword", {
              required: true,
            })}
          />
          <p className={classes.error}> {errors.passwordConfirm?.message}</p>
        </div>
        <div className={classes.btn}>
          <Button variant="contained" type="submit">
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
