import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Team from "./Team";

import { useEffect } from "react";
const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/Home");
    }, 2000);
  }, []);
  return (
    <div>
      <h2>About Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="team">Our Team</Link>
          </li>
          <li>
            <Link to="company">Our Company</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/team" element={<Team />} />
      </Routes>
    </div>
  );
};

export default AboutPage;
