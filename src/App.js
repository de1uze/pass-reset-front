import classes from "./App.module.css";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import ForgotPassword from "./Forgot Password/ForgotPassword";
import ResetPassword from "./Reset Password/ResetPassword";
import EmailVerification from "./Email Verification/EmailVerification";
import Welcome from "./Welcome/Welcome";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div className={classes.app}>
      <Navbar />
      <div className={classes.wrapper}>
        <Switch>
          <Route path="/" exact>
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/resetpassword/:token">
            <ResetPassword />
          </Route>
          <Route path="/emailverification/:emailVerificationToken">
            <EmailVerification />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="*">
            <Signup />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
