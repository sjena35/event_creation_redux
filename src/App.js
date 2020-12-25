import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import EventStore from './Event_Redux/EventStore'
import  ViewPage  from './Components/ViewPage';
import CreateEvent from './Components/CreateEvent';
import NavigationBar from './Components/NavigationBar';


function App() {
  return (
    
      <Provider store={EventStore}>
        <div className="App">
       <NavigationBar/>
        </div>
      </Provider>
    
  );
}

export default App;
