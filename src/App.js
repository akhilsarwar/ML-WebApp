
import './App.css';

function App() {
  return (
    <div class="form-label" style={{ textAlign: "center" }}>
        <p></p>
        <form method="POST" action="http://localhost:5000/result" enctype="multipart/form-data"> 
            <input type="file" name="file" class="form-control form-control-lg"/>
            <p></p>
            <button class="btn btn-secondary">IMPORT CSV2</button>
        </form>
    </div>
    )
}

export default App;

