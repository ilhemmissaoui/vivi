import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  getAllProjectsAction,
  getProjectByIdAction,
  selectProjectAction,
} from "./store/actions/ProjectAction";
/// Components
import axios from "axios";
import Index from "./jsx";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
// actionp
import { checkAutoLogin } from "./services/AuthService";
import { isAuthenticated } from "./store/selectors/AuthSelectors";
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

const SignUp = lazy(() => import("./jsx/pages/Registration"));

const Home = lazy(() => import("./jsx/pages/Home"));

const ForgotPassword = lazy(() => import("./jsx/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./jsx/pages/ResetPassword"));
const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./jsx/pages/Login")), 500);
  });
});

function App(props) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isCompatible = screenWidth >= 768; // 768 pixels équivalent à 10 pouces (environ)

  const token = localStorage.getItem("token");
  const [validToken, setValidToken] = useState(true);
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthenticated);
  const projects = useSelector((state) => state.project.allProjects);
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // Successful response
        // You can inspect the response here and perform actions if needed
        //console.log("API Response:", response);

        setValidToken(true);
        //history.push("/dashboard");

        return response;
      },

      (error) => {
        // Error response
        // You can inspect the error here and display error messages

        if (error.response) {
          // The error has a response from the server
          // Check for specific HTTP status codes indicating unauthorized access
          if (error.response.status === 401) {
            // Unauthorized (user not authenticated)
            // Redirect to the login page or perform other actions
            // console.error("Unauthorized Access ********");
            localStorage.removeItem("token");
            localStorage.removeItem("selectedProjectId");
            localStorage.removeItem("personalInfo");
            localStorage.removeItem("allProjects");
            localStorage.removeItem("userDetails");
            setValidToken(false);
            dispatch({
              type: "CLEAR",
            });
            // You can use react-router to redirect to the login page
            // Example: history.push('/login');
          }
        } /* else {
          // Network error or request aborted
          console.error("Network Error:_", error.message);
          // setError('Network error. Please try again later.');
        }
 */
        return Promise.reject(error);
      }
    );

    // Clean up the interceptor when the component unmounts
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  useEffect(() => {
    const currentURL = window.location.href;
    const tokenStartIndex = currentURL.indexOf("page-reset-password?token");
 
    if (tokenStartIndex == -1) {     
      checkAutoLogin(dispatch, props.history);
      
    }
  }, [dispatch, props.history]);

  let routes = (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/registration" component={SignUp} />
      <Route path="/page-forgot-password" component={ForgotPassword} />
      <Route path="/page-reset-password" component={ResetPassword} />
      <Route path="/" component={Login} />
    </Switch>
  );
  if (!isCompatible) {
    return (
      <div className="flex justify-items-center align-middle">
        <div className=" flex flex-col justify-center bg-gray-200 p-4 border border-gray-300 rounded-md text-center h-screen">
          <div className="text-lg font-bold">
            Désolé, cette application n'est pas compatible avec des écrans de
            moins de 10 pouces.
          </div>
          <div className="text-base">
            Veuillez utiliser un appareil avec une résolution d'écran supérieure
            pour une expérience optimale.
          </div>
        </div>
      </div>
    );
  }
  //checkpoint

  if (token && validToken) {
    return (
      <>
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          <Index />
        </Suspense>
      </>
    );
  } else {
    return (
      <div className="vh-100">
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          {routes}
        </Suspense>
      </div>
    );
  }
}

export default withRouter(App);
