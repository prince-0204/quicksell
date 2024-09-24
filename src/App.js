import React, { useState, useEffect } from "react";
import Select from "react-select";
import Card from "./components/Card";
import "./App.css";
import Display from "./icons_FEtask/Display.svg";
import Down from "./icons_FEtask/down.svg";
import Backlog from "./icons_FEtask/Backlog.svg";
import Cancelled from "./icons_FEtask/Cancelled.svg";
import Done from "./icons_FEtask/Done.svg";
import InProgess from "./icons_FEtask/in-progress.svg";
import ToDo from "./icons_FEtask/To-do.svg";
import Heading from "./components/Heading";
import HighPriority from "./icons_FEtask/Img - High Priority.svg";
import LowPriority from "./icons_FEtask/Img - Low Priority.svg";
import MedPriority from "./icons_FEtask/Img - Medium Priority.svg";
import NoPriority from "./icons_FEtask/No-priority.svg";
import Urgent from "./icons_FEtask/SVG - Urgent Priority colour.svg";
import ProfieIcon from './icons_FEtask/profile.svg';

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

const icons = {
  "Todo":ToDo,
  "In progress":InProgess,
  "Backlog":Backlog,
  "Done":Done,
  "Cancelled":Cancelled,
  "4":Urgent,
  "3":HighPriority,
  "2":MedPriority,
  "1":LowPriority,
  "0":NoPriority
}

const priorities = ["NoPriority","Low","Medium","High","Urgent"]

function isUsrFormat(str) {
  const regex = /^usr-.*/; // Regex pattern to match "usr-" followed by any characters
  return regex.test(str); // Returns true if the string matches the pattern
}

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status"); // Default grouping by status
  const [ordering, setOrdering] = useState("priority"); // Default sorting by priority
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetching data from API
    const fetchTickets = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);
        // console.log(data.tickets);
        // console.log(data['users']);
        setTickets(data.tickets);
        setUsers(data["users"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTickets();
  }, []);

  // Function to group tickets based on the selected grouping option
  const groupTickets = () => {
    let groupedTickets = {};

    if (grouping === "status") {
      groupedTickets = tickets.reduce((groups, ticket) => {
        const status = ticket.status;
        if (!groups[status]) groups[status] = [];
        groups[status].push(ticket);
        return groups;
      }, {});
    } else if (grouping === "user") {
      groupedTickets = tickets.reduce((groups, ticket) => {
        const user = ticket.userId || "Unassigned";
        if (!groups[user]) groups[user] = [];
        groups[user].push(ticket);
        return groups;
      }, {});
    } else if (grouping === "priority") {
      groupedTickets = tickets.reduce((groups, ticket) => {
        const priority = ticket.priority;
        if (!groups[priority]) groups[priority] = [];
        groups[priority].push(ticket);
        return groups;
      }, {});
    }
    console.log(groupedTickets);
    return groupedTickets;
  };

  // Function to sort tickets based on the selected ordering option
  const sortTickets = (tickets) => {
    if (ordering === "priority") {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (ordering === "title") {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    console.log(tickets);
    return tickets;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const groupedTickets = groupTickets();

  const handleGroupingChange = (selectedOption) => {
    setGrouping(selectedOption.value);
    toggleDropdown()
  };

  const handleOrderingChange = (selectedOption) => {
    setOrdering(selectedOption.value);
    toggleDropdown()
  };

  return (
    <div className="board">
      <nav className="navbar">
        <button className="navbardropdown" onClick={toggleDropdown}>
          <img src={Display} alt="" />
          <div style={{margin:"0px 5px"}}>Display</div>
          <img src={Down} alt="" />
        </button>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <div className="dropdown-item-heading">Grouping</div>
              <Select
                options={[
                  { value: "status", label: "Status" },
                  { value: "user", label: "User" },
                  { value: "priority", label: "Priority" },
                ]}
                onChange={handleGroupingChange}
                defaultValue={{ value: "status", label: "Status" }}
                className="dropdown-item-heading-btn"
              />
            </div>
            <div className="dropdown-item">
              <div className="dropdown-item-heading">Ordering</div>
              <Select
                options={[
                  { value: "priority", label: "Priority" },
                  { value: "title", label: "Title" },
                ]}
                onChange={handleOrderingChange}
                defaultValue={{ value: "priority", label: "Priority" }}
                className="dropdown-item-heading-btn"
              />
            </div>
          </div>
        )}
      </nav>

      <div className="columns" style={{display:"grid",gridTemplateColumns:`repeat(${Object.keys(groupedTickets).length}, 1fr)`}}>
        {Object.keys(groupedTickets).map((group, index) => {
          const tickets = groupedTickets[group];
          const ticketCount = tickets.length;
          let Icon = icons[group];
          let heading = group;
          let arr = ['0','1','2','3','4'];
          if(arr.includes(group)) heading = priorities[Number(group)]
          if(isUsrFormat(group)){
            let index = group[4]-1;
            heading = users[index].name;
            Icon = ProfieIcon
          }
          return(
            <div className="column" key={index}>
              <Heading heading = {heading} Icon={Icon} number = {ticketCount}/>
              {sortTickets(groupedTickets[group]).map((ticket) => (
                  <Card id = {ticket.id} title={ticket.title} tag={ticket.tag}/>
              ))}
            </div>
        )})}
      </div>
    </div>
  );
}

export default App;
