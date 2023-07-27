import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Alert, Box, Button, FormControlLabel, Radio, RadioGroup, Snackbar, SnackbarCloseReason, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { loginUser } from '../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';


interface FormValues {
  name: string;
  surname: string;
  email: string;
  username: string;
  useName: boolean;
}

const initialValues: FormValues = {
  name: '',
  surname: '',
  email: '',
  username: '',
  useName: true,
};

const validationSchema = Yup.object({
  name: Yup.string().test('useName', 'Required', function (value) {
    const { useName } = this.parent;
    return useName ? Yup.string().required().isValid(value) : Yup.string().isValid(value);
  }),
  surname: Yup.string().test('useName', 'Required', function (value) {
    const { useName } = this.parent;
    return useName ? Yup.string().required().isValid(value) : Yup.string().isValid(value);
  }),
  email: Yup.string().email('Invalid email address').required('Required'),
  username: Yup.string().test('useName', 'Required', function (value) {
    const { useName } = this.parent;
    return !useName ? Yup.string().required().isValid(value) : Yup.string().isValid(value);
  }),
});

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClose = (_event: SyntheticEvent<any, Event> | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (values: FormValues) => {
    values.name = values.name.trim();
    values.surname = values.surname.trim();
  
    const resultAction = await dispatch(loginUser(values));
    const user = unwrapResult(resultAction);
  
    if (!user) {
      handleOpen();
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);



  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      padding={2}
    >
      <Typography variant="h4" gutterBottom>
        Sing in
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form style={{ display: 'flex', flexDirection: 'column', gap: '1em', width: '300px' }}>
            <RadioGroup style={{display:'flex', justifyContent:'center'}} row value={values.useName ? 'name' : 'username'} onChange={(e) => {
              setFieldValue('useName', e.target.value === 'name');
            }}>
              <FormControlLabel value="name" control={<Radio />} label="Name" />
              <FormControlLabel value="username" control={<Radio />} label="Username" />
            </RadioGroup>
            {values.useName ? (
              <>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  error={touched.name && Boolean(errors.name)}
                  helperText={<ErrorMessage name="name" />}
                />
                <Field
                  as={TextField}
                  name="surname"
                  label="Surname"
                  error={touched.surname && Boolean(errors.surname)}
                  helperText={<ErrorMessage name="surname" />}
                />
              </>
            ) : (
              <Field
                as={TextField}
                name="username"
                label="Username"
                error={touched.username && Boolean(errors.username)}
                helperText={<ErrorMessage name="username" />}
              />
            )}
            <Field
              as={TextField}
              name="email"
              label="Email"
              error={touched.email && Boolean(errors.email)}
              helperText={<ErrorMessage name="email" />}
            />
            <Button type="submit" variant="contained" endIcon={<SendIcon />} color="primary">Submit</Button>
          </Form>
        )}
      </Formik>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          The user does not exist!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;