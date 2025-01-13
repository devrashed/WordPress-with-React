import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Settings = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [loader, setLoader] = useState('Save Settings');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader('Saving...');
        axios.post(`${appLocalizer.apiUrl}/wprk/v1/savesettings`, {
            firstname,
            lastname,
            email,
            address
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-WP-NONCE': appLocalizer.nonce
            }
        })
        .then((res) => {
            if (res?.data == 'success'){
              toast.success('Save Success',{ 
                 position:'top-center',
                 duration: 4000,
                 style:{
                    color: '#713200',
                    marginTop:'20px',
                    paddingTop: '10px',
                    paddingRight: '10px',
                    paddingBottom: '10px',
                    paddingTop:'10px',
                 }
              });
            }
            setLoader('Save Settings');
        })
        .catch((err) => {
            console.error('Error saving settings:', err);
            setLoader('Save Settings');
        });
    }

    useEffect(() => {
        axios.get(`${appLocalizer.apiUrl}/wprk/v1/settings`)
        .then((res) => {
            setFirstName(res.data.firstname || '');
            setLastName(res.data.lastname || '');
            setEmail(res.data.email || '');
            setAddress(res.data.address || '');
        })
        .catch((err) => {
            console.error('Error fetching settings:', err);
        });
    }, []);

    return (
        <React.Fragment>
            <h2>React Settings Form</h2>
            <form id="work-settings-form" onSubmit={handleSubmit}>
                <table className="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row">
                                <label htmlFor="firstname">Firstname</label>
                            </th>
                            <td>
                                <input id="firstname" name="firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} className="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label htmlFor="lastname">Lastname</label>
                            </th>
                            <td>
                                <input id="lastname" name="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} className="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label htmlFor="email">Email</label>
                            </th>
                            <td>
                                <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label htmlFor="address">Address</label>
                            </th>
                            <td>
                                <textarea id="address" name="address" rows="4" cols="50" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p className="submit">
                    <button type="submit" className="button button-primary">{loader}</button>
                </p>
            </form>
        </React.Fragment>
    )
}

export default Settings;
