import React, { Component, useState } from 'react';
import '../styles.css';
import '../Styles/reportpage.css';

function ReportPage() {

    return (
        <div className="background">
            <div className="title poppins" id="t1">Review Sentiment
                Analyzer</div>
            <div className="description inter">Input your user reviews to analyze and generate suitable responses</div>
            <div className="title poppins" id="t2">Your review report is ready</div>
            <div className="description inter">We have analyzed your review file and added reply suggestions</div>
            {/* <Button variant="primary btn-block">Download Report</Button> */}
            <div className="button-div" id='bd1'>
                <button type="button" class="btn btn-primary btn-lg btn-block">Download Report</button>
            </div>
            <div className="button-div" id='bd2'>
                <button type="button" class="btn btn-outline-primary btn-lg btn-block">Analyze another review</button>
            </div>
        </div>
    );
}


export default ReportPage;
