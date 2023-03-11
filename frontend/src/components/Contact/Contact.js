import { useState } from 'react'
import React from 'react'
import './Contact.css'
import Map from '../Map'

const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
        // add logic to send the form data to a server or an email address
    };

    return (
        <section id = "Contact">
            <div className="container">
                <div className="left">
                    <form onSubmit={handleSubmit}>
                        <h2>Contact us</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={handleNameChange}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <textarea
                            placeholder="Message"
                            value={message}
                            onChange={handleMessageChange}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="right">
                    <Map></Map>
                </div>
            </div>
        </section>
    );
}


export default Contact