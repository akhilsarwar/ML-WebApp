import React, { Component } from 'react';
import '../Styles/homepage.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CloudUploadIconOutlined from '@mui/icons-material/CloudUploadOutlined';


function uploadFile() {
    //ask for file upload

}

function HomePage() {
    return (
        <div className="background">
            <div className="title">Review Sentiment
                Analyzer</div>
            <div className="description">Input your user reviews to analyze and generate suitable responses</div>
            <div className="inputForm">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter User Review" />
                    </Form.Group>
                    <div className="analyzeButton">
                        <Button variant="primary" type="submit">
                            Analyze
                        </Button>
                    </div>

                </Form>
            </div>
            <div className="OR">
                OR
            </div>
            <div className="uploadCSVCard">
                <Card className="text-center card">
                    {/* <Card.Header>Featured</Card.Header> */}
                    <Card.Body>
                        <div className='uploadIcon'>
                            <CloudUploadIconOutlined className="cloudUploadIcon" />
                        </div>
                        <div className='cardtitle'>
                            <Card.Title className="inter">Upload CSV</Card.Title>
                        </div>

                        {/* <Card.Text>
                            With supporting text below as a natural lead-in to additional content.
                        </Card.Text> */}
                        <Button variant="primary" onClick={uploadFile}>Select File</Button>
                    </Card.Body>
                    {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                </Card>
            </div>

        </div>
    );
}


export default HomePage;
