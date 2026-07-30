import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <h1>MyComics2026</h1>
      <p>Plateforme de streaming de comics — squelette frontend (module 9).</p> 
      <Link to="/login">Se connecter</Link>
    </section>
  );
}

export default Home;
