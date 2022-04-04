import React, { Component, useState } from 'react';
import '../Styles/homepage.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CloudUploadIconOutlined from '@mui/icons-material/CloudUploadOutlined';
import axios from 'axios';
import '../styles.css';

function HomePage() {

    const [selectedCSV, setSelectedCSV] = useState(null);
    const [displayFileName, setDisplayFileName] = useState(false);
    const [filename, setFileName] = useState(null);

    const uploadFile = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("file", selectedCSV);
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:5000/result",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log(error)
        }
    }


    const changeFile = (event) => {
        setDisplayFileName(true);
        setFileName(event.target.files[0].name);
        setSelectedCSV(event.target.files[0]);
    }


    return (
        <div className="background">
            <div className="title poppins">Review Sentiment
                Analyzer</div>
            <div className="description inter">Input your user reviews to analyze and generate suitable responses</div>
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
            <div className="OR poppins">
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
                        <form onSubmit={uploadFile}>
                            <label htmlFor="file-upload" className='custom-file-upload btn btn-primary'>Upload File</label>
                            <input type="file" onChange={changeFile} id='file-upload' />
                            {displayFileName &&
                                <div style={{ 'margin-top': '10px', 'margin-bottom': '10px' }} className="fileName">{filename}</div>
                            }
                            {
                                !displayFileName &&
                                <div style={{ 'margin-top': '10px', 'margin-bottom': '10px' }} className="fileName">No file Selected</div>
                            }
                            {
                                filename &&
                                <input class="btn btn-primary" type="submit" value="Submit" />
                            }
                            {
                                !filename &&
                                <input class="btn btn-primary" type="submit" value="Submit" disabled />
                            }

                        </form>

                    </Card.Body>
                    {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                </Card>
            </div>

        </div>
    );
}


export default HomePage;
