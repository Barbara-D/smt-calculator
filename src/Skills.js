import "./Skills.css";
import { NavBar } from "./NavBar.js";
import { get_all_skills } from "./utils/demon_utils.js";
import { Link } from "react-router-dom";
import { useState } from "react";

function DemonsPossessingSkills(props) {
  return (
    <>
      {props.demonsWithSkills.map((d, i) => {
        return (
          <>
            <Link to={`/${d.name.toLowerCase()}`}>{`${d.name}`}</Link>
            {d.skillLevel > 0 && d.skillLevel !== 5277 && (
              <span>{` (${d.skillLevel})`}</span>
            )}
            {d.skillLevel === 5277 && <span> (Tm)</span>}
            {props.demonsWithSkills.length > i + 1 && <span>, </span>}
          </>
        );
      })}
    </>
  );
}

export function Skills(props) {
  let [filter, setFilter] = useState("");
  const allSkills = get_all_skills();
  const skills = allSkills
    .filter((s) => s.name.toLowerCase().startsWith(filter.toLowerCase()))
    .sort((s1, s2) => (s1.name < s2.name ? -1 : 1));

  return (
    <div>
      <div className="centeredContainer">
        <div className="skillTableContents">
          <NavBar />
          <div>
            <label>
              Search:
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </label>
          </div>
          <br />
        </div>
      </div>
      <div>
        <table className="skillTable">
          <tbody>
            <tr>
              <th className="skillTableHeader">Name</th>
              <th className="skillTableHeader">Demons</th>
            </tr>
            {skills.map((x) => {
              return (
                <tr className="skillTableRow" key={x.name}>
                  <td className="skillTableCell">{x.name}</td>
                  <td className="skillTableCell">
                    <DemonsPossessingSkills demonsWithSkills={x.demons} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
