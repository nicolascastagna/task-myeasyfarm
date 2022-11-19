import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <section className="container-home">
      <div className="contain-btn">
        <NavLink to="/map">
          <button className="btn-start">Start</button>
        </NavLink>
      </div>
    </section>
  );
};

export default Home;
