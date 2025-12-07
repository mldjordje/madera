"use client";

import { Formik } from 'formik';
import AppData from "@data/app.json";

const ReservationForm = () => {
  return (
    <>
        {/* contact form */}
        <Formik
        initialValues = {{ name: '', email: '', tel: '', date: '', person: 1 }}
        validate = { values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        onSubmit = {( values, { setSubmitting } ) => {
            const form = document.getElementById("reservationForm");
            const status = document.getElementById("reservationFormStatus");
            const data = new FormData();

            data.append('name', values.name);
            data.append('email', values.email);
            data.append('tel', values.tel);
            data.append('date', values.date);
            data.append('person', values.person);

            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    status.style.opacity = "1";
                    status.style.pointerEvents = "auto";
                    form.reset()
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                        } else {
                            status.innerHTML = "<h5>Oops! There was a problem submitting your form</h5>"
                        }
                    })
                }
            }).catch(error => {
                status.innerHTML = "<h5>Oops! There was a problem submitting your form</h5>"
            });

            setSubmitting(false);
        }}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (
        <form onSubmit={handleSubmit} id="reservationForm" action={AppData.settings.formspreeURL}>
            <div className="row">
            <div className="col-lg-12">
                <div className="sb-group-input">
                    <input 
                        type="text" 
                        placeholder=" "
                        name="name" 
                        required="required" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name} 
                    />
                    <span className="sb-bar"></span>
                    <label>Name</label>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="sb-group-input">
                    <input 
                        type="email" 
                        placeholder=" "
                        name="email" 
                        required="required" 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email} 
                    />
                    <span className="sb-bar"></span>
                    <label>Email</label>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="sb-group-input">
                    <input 
                        type="tel" 
                        placeholder=" "
                        name="tel"
                        required="required"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.tel} 
                    />
                    <span className="sb-bar"></span>
                    <label>Phone</label>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="sb-group-input">
                    <input 
                        type="text" 
                        placeholder=" "
                        name="date"
                        required="required"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.date} 
                    />
                    <span className="sb-bar"></span>
                    <label>Time and Date</label>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="sb-group-input">
                    <input 
                        type="number" 
                        placeholder=" "
                        name="person"
                        required="required"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.person}
                        min={1}
                        max={6} 
                    />
                    <span className="sb-bar"></span>
                    <label>Person</label>
                </div>
            </div>
            </div>

            {/* button */}
            <button type="submit" className="sb-btn sb-cf-submit sb-show-success">
                <span className="sb-icon">
                    <img src="/img/ui/icons/arrow.svg" alt="icon" />
                </span>
                <span>Reserve</span>
            </button>
            {/* button end */}
        </form>
        )}
        </Formik>
        {/* contact form end */}
    </>
  );
};
export default ReservationForm;