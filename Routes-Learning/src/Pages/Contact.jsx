import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ContactPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  }, []);
  return (
    <>
      <h2>Contact Page</h2>

      <button onClick={() => navigate("/home")}>Home</button>
    </>
  );
};
