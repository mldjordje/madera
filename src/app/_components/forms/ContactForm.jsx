"use client";

import { Formik } from 'formik';
import AppData from "@data/app.json";

const ContactForm = () => {
  return (
    <>
        {/* contact form */}
        <Formik
        initialValues = {{ email: '', name: '', message: '' }}
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
            const form = document.getElementById("contactForm");
            const status = document.getElementById("contactFormStatus");
            const data = new FormData();

            data.append('name', values.name);
            data.append('email', values.email);
            data.append('message', values.message);

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
        <form onSubmit={handleSubmit} id="contactForm" action={AppData.settings.formspreeURL}>
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
            <div className="sb-group-input">
                <textarea 
                    placeholder=" "
                    name="message" 
                    required="required"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message} 
                />
                <span className="sb-bar"></span>
                <label>Message</label>
            </div>
            <p className="sb-text sb-text-xs sb-mb-30">*We promise not to disclose your <br/>personal information to third parties.</p>
            
            {/* button */}
            <button type="submit" className="sb-btn sb-cf-submit sb-show-success">
                <span className="sb-icon">
                    <img src="/img/ui/icons/arrow.svg" alt="icon" />
                </span>
                <span>Send</span>
            </button>
            {/* button end */}
        </form>
        )}
        </Formik>
        {/* contact form end */}
    </>
  );
};
export default ContactForm;