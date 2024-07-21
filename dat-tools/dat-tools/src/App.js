import wiz from "./wizard.png";
import './App.css';
import {fixTimes, addLabels} from "./helpers";

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <img src={wiz} usemap="#image-map"/>

            <map name="image-map">
                <area id="left-eye" class="eye" target="" alt="" title="" href="" coords="456,346,21" shape="circle"/>
                <area id="right-eye" class="eye" target="" alt="" title="" href="" coords="545,341,20" shape="circle"/>
                <area id="label-spell" target="" alt="Labels" title="Labels" href=""
                      coords="715,383,688,593,841,631,870,641,996,605,1009,385,966,344,857,391,752,350" shape="poly"
                      onClick={()=> addLabels()}/>
                <area id="time-spell" target="" alt="Times" title="Times" href="" coords="154,516,127" shape="circle"
                      onClick={()=> fixTimes()}/>
            </map>
            <div className="right-eyeball eyes"></div>
            <div className="left-eyeball eyes"></div>
        </header>
    </div>
  );
}

export default App;
