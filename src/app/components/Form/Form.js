'use client';
import styles from "./form.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import iconCta from '/public/svgs/icon-arrow-diagonal-right.svg';
import Image from "next/image";

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [status, setStatus] = useState('idle');

    const onSubmit = async (data) => {
        try {
            setStatus('submitting');
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            setStatus(json.ok ? 'success' : 'error');
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className={styles.form}>
            <form className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>
                {status !== 'success' && (
                    <>
                        <div className={styles.row}>
                            <h3>Get in touch</h3>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor="firstName">First Name</label>
                                <input id="firstName" {...register("firstName", { required: true })} placeholder="First Name" />
                                {errors.firstName && <span>Required</span>}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="lastName">Last Name</label>
                                <input id="lastName" {...register("lastName", { required: true })} placeholder="Last Name" />
                                {errors.lastName && <span>Required</span>}
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" {...register("email", { required: true })} placeholder="Your email address" />
                                {errors.email && <span>Required</span>}
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor="company">Company</label>
                                <input id="company" {...register("company", { required: true })} placeholder="Where do you work" />
                                {errors.company && <span>Required</span>}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="website">Website</label>
                                <input id="website" {...register("website", { required: true })} placeholder="Link to your website" />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label htmlFor="message">How can we help?</label>
                                <textarea id="message" {...register("message", { required: true })} placeholder="Your Message" />
                                {errors.message && <span>Required</span>}
                            </div>
                        </div>
                        <div className={styles.row}>
                            <button className={styles.button} type="submit" disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'Sending…' : 'Send Message'}
                            </button>
                        </div>
                    </>
                )}
                {status === 'success' &&
                    <div className={styles.row}>
                        <div className={styles.successMessage}>
                            <h3>Message received</h3>
                            <p>Thanks! We’ll be in touch.</p>
                        </div>
                    </div>
                }
                {status === 'error' &&
                    <div className={styles.row}>
                        <p>Something went wrong. Try again.</p>
                    </div>
                }
            </form>
        </div>
    );
};
export default Form;