import React, { useState } from "react";
import users from "./users";

function App() {
  const [state, setState] = useState({
    search: "ma",
    isStudentChecked: true,
    isTeacherChecked: true,
    campus: ""
  });
  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    });
  }

  function filterBySearch(user) {
    return (
      user.firstName.toUpperCase().includes(state.search.toUpperCase()) ||
      user.lastName.toUpperCase().includes(state.search.toUpperCase())
    );
  }
  function filterByRole(user) {
    return (
      (state.isTeacherChecked && user.role === "teacher") ||
      (state.isStudentChecked && user.role === "student")
    );
  }

  function filterByCampus(user) {
    // Keep the user when there is not state.campus ("All") or when the user has the same campus as the state.campus
    return state.campus === "" || user.campus === state.campus
  }

  let repeatedCampuses = users.map(user => user.campus);
  let uniqueCampuses = repeatedCampuses.filter(
    (campus, i) => repeatedCampuses.indexOf(campus) === i
  );


  return (
    <div className="App">
      <h1>IronBook</h1>
      <pre>state = {JSON.stringify(state, null, 2)}</pre>
      <pre>uniqueCampuses = {JSON.stringify(uniqueCampuses, null, 2)}</pre>
      <div className="filter-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name"
          name="search"
          value={state.search}
          onChange={handleChange}
        />
        <input
          type="checkbox"
          name="isStudentChecked"
          checked={state.isStudentChecked}
          onChange={handleChange}
        />
        <label>Student</label>
        <input
          type="checkbox"
          name="isTeacherChecked"
          checked={state.isTeacherChecked}
          onChange={handleChange}
        />
        <label>Teacher</label>

        <select name="campus" value={state.campus} onChange={handleChange}>
          <option value={""}>All</option>
          {uniqueCampuses.map(campus => (
            <option key={campus} value={campus}>
              {campus}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Campus</th>
            <th>Role</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter(user => filterBySearch(user) && filterByRole(user) && filterByCampus(user))
            .map((user, i) => (
              <tr key={i}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.campus}</td>
                <td>{user.role}</td>
                <td>
                  {user.linkedin && (
                    <a target="_blank" href={user.linkedin}>
                      <img className="link-logo" src="/linkedin.png" />
                    </a>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
