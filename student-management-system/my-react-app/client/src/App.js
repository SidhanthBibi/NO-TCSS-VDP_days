// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TimetableCalendar from './components/TimetableCalendar';
import GPACalculator from './components/GPACalculator';
import TodoList from './components/TodoList';
import Chat from './components/Chat';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/timetable" component={TimetableCalendar} />
          <PrivateRoute path="/gpa-calculator" component={GPACalculator} />
          <PrivateRoute path="/todo" component={TodoList} />
          <PrivateRoute path="/chat/:room" component={Chat} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;