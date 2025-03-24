import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import  { useState } from 'react'
import * as Yup from 'yup'
import { useDispatch } from "react-redux";
import { registerUserAction } from '../../Redux/Auth/auth.action'
import { useNavigate } from 'react-router-dom';

const initialValues = {firstName: "",lastName: "",email:"",password:"",gender:""}
const validationSchema = {email:Yup.string().email("Invalid email").required("Email is required"),
password:Yup.string().min(6,"Password must be at least 6 characters").required("Password is required")}
const Register = () => {
    //const [formValues, setFormValues] = useState(setFormValues);
    const [gender, setGender] = useState("");
    const navagite = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) =>{
        values.gender = gender;
        console.log("handle submit",values);

        dispatch(registerUserAction({data:values}));
    }
    const handleChange = (event) => {
        setGender(event.target.value);
      };
  return (
    <>
        <Formik initialValues={initialValues} 
        //validationSchema={validationSchema} 
        onSubmit={handleSubmit}>
            <Form className='space-y-5'>

                <div className='space-y-5'>

                    <div>

                        <Field as={TextField} 
                        name='firstName' 
                        type='text'
                        placeholder='First Name'
                        variant='outlined'
                            fullWidth/>
                        <ErrorMessage name='firstName' component={"div"} className='text-red-500'/>

                    </div>

                    <div>

                        <Field as={TextField} 
                        name='lastName' 
                        type='text'
                        placeholder='Last Name'
                        variant='outlined'
                            fullWidth/>
                        <ErrorMessage name='lastName' component={"div"} className='text-red-500'/>

                    </div>

                    <div>

                        <Field as={TextField} 
                        name='email' 
                        type='email'
                         placeholder='Email'
                           variant='outlined'
                            fullWidth/>
                        <ErrorMessage name='email' component={"div"} className='text-red-500'/>

                    </div>
                    <div>

                        <Field as={TextField} 
                        name='password' 
                        type='password'
                        placeholder='Password'
                        variant='outlined'
                            fullWidth/>
                        <ErrorMessage name='password' component={"div"} className='text-red-500'/>

                    </div>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="gender"
                            onChange={handleChange}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" onClick={()=>alert("Your gender and you dont know? Damnn")}/>
                            
                            <ErrorMessage name='gender' component={"div"} className='text-red-500'/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <Button sx={{padding: ".8rem 0rem"}} fullWidth type='submit' variant='contained' color='primary'>Sign Up

                </Button>

            </Form>
        </Formik>

        <div className="flex gap-5 items-center pt-5 justify-center">
            <p>If you have account? </p>
            <button onClick={()=>navagite("/login")} className="text-blue-500 cursor-pointer">Login</button>
        </div>

    </>
  )
}

export default Register