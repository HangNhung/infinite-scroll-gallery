import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Collage from "./Collage/collage.component";
import FileUploadContainer from "./FileUpload/file-upload.container";
// require("dotenv").config();

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/file-upload">
            <FileUploadContainer />
          </Route>
          <Route path="/">
            <Collage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
