import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => navigate("/contact")}>Go to Contact</button>
      <button onClick={() => navigate("/about")}>Go to About </button>
    </div>
  );
};

export default HomePage;
