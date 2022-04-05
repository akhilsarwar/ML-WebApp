import React, { Component, useState } from 'react';
import '../styles.css';
import '../Styles/singlereview.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function SingleReview() {

    const location = useLocation();
    const result = location.state.result;
    const bussinessSugg = location.state.bussinessSuggestion;
    const navigate = useNavigate();
    function toHomePage() {
        navigate('/', { replace: true });
    }

    console.log(result)
    console.log(bussinessSugg)


    return (
        <div className="background">
            <div className="title poppins" id="t1">Review Sentiment
                Analyzer</div>
            <div className="description inter">Input your user reviews to analyze and generate suitable responses</div>{result === 1 &&
                <div>
                    <div className="title poppins" id="t2">You have a happy customer</div>
                    <div className="description inter">We suggest the following as the next steps</div>
                </div>

            }
            {
                result === -1 && <div>
                    <div className="title poppins" id="t2">Your customer needs urgent attention!</div>
                    <div className="description inter">Take care of the situation using the following steps</div>
                </div>
            }

            <div className='suggestion inter'>
                {bussinessSugg}
            </div>

            <div className="button-div" id='bd2'>
                <button type="button" className="btn btn-outline-primary btn-lg btn-block" onClick={toHomePage}>Analyze another review</button>
            </div>
        </div>
    );
}


export default SingleReview;
