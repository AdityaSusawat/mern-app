import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"; //icon
import { Formik } from "formik"; //form library
import * as yup from "yup"; //validation library
import { useNavigate, usenavigate } from "react-router-dom"; //to navigate when registered or loggedIn
import { useDispatch } from "react-redux"; //react redux used to store our data
import { setLogin } from "state";
import Dropzone from "react-dropzone"; //let the user upload a file
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  //for the register page
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
}); //yup validation schema which determines the shape of how the form library saves it

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
}); //schema just sets up the validation

const initialValuesRegister = {
  //this sets the initial values of Register page
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const handleFormSubmit = async (values, onSubmitProps) => {}; //these "values" will come from Formik

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, //targeting any div of this box as a child component
            }}
          >
            {/* split in equal fractions of 4 */}
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName) //boolean might be redundant
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{}}
                />
              </>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
