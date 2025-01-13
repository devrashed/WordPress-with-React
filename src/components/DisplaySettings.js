import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplaySettings = () => {
    const [settings, setSettings] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address: ''
    });

    useEffect(() => {
        // Fetch data from the REST API
        axios.get(`${appLocalizer.apiUrl}/wprk/v1/settings`)
            .then((res) => {
                setSettings({
                    firstname: res.data.firstname,
                    lastname: res.data.lastname,
                    email: res.data.email,
                    address: res.data.address
                });
            })
            .catch((error) => {
                console.error("Error fetching the settings", error);
            });
    }, []);

    return (
        <div>
            <h2>User Information</h2>
            <p><strong>Firstname:</strong> {settings.firstname}</p>
            <p><strong>Lastname:</strong> {settings.lastname}</p>
            <p><strong>Email:</strong> {settings.email}</p>
            <p><strong>Address:</strong> {settings.address}</p>
        </div>
    );
}

export default DisplaySettings;
