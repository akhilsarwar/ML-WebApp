import React, { Component, useState } from 'react';
import '../styles.css';
import '../Styles/reportpage.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function ReportPage() {

    const navigate = useNavigate();

    function toHomePage() {
        navigate('/', { replace: true });
    }

    const downloadCSV = async () => {
        try {
            const response = await axios({
                method: "get",
                url: "http://localhost:5000/getoutput",
                // headers: { "Content-Type": "multipart/form-data" },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'output.csv');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="background">
            <div className="title poppins" id="t1">Review Sentiment
                Analyzer</div>
            <div className="description inter">Input your user reviews to analyze and generate suitable responses</div>
            <div className="title poppins" id="t2">Your review report is ready</div>
            <div className="description inter">We have analyzed your review file and added reply suggestions</div>
            {/* <Button variant="primary btn-block">Download Report</Button> */}
            <div className="button-div" id='bd1'>
                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={downloadCSV}>Download Report</button>
            </div>
            <div className="button-div" id='bd2'>
                <button type="button" className="btn btn-outline-primary btn-lg btn-block" onClick={toHomePage}>Analyze another review</button>
            </div>
        </div>
    );
}


export default ReportPage;
