
import './App.css';

function App() {
    const changed=()=>{
        console.log("value");
    }
    return (
        <div class="fdd" style={{ textAlign: "center" }}>
            <div class="rrect">
                {/* <p class="upcsv">Upload csv</p> */}
                <form method="POST" action="http://localhost:5000/result" enctype="multipart/form-data" class="fclass"> 
                    <input type="file" name="file" class="btn btn-secondary" title="Choose a video please" accept=".csv"/>
                    {/*<input type="file" id="files" />
                    <label for="files" class="btn btn-secondary">Choose CSV file </label> */}
                    <button class="button">Import CSV</button>
                </form>
                {/* <img id="output" src="" width="100" height="100"/> */}
            </div>
        </div>
    )
}

export default App;

