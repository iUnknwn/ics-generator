import './App.css';
import EventInfo from './CalendarComponents/EventInfo'
import About from './About'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple ICS File Generator</h1>
      </header>
      <div className="mainContent">
        <p>Generate an ICS event file, compatible with Google Calendar, iCal, Outlook, and more.</p>
        <EventInfo />
        <About />
      </div>
    </div>
  );
}

export default App;
