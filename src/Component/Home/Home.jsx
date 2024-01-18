import "./Home.css";
import NavBar from "../Navbar/Navbar";
import SearchBar from "../SearchBar/SearchBar";
import PostedAnnonce from "../PostedAnnonce/PostedAnnonce";

function Home() {
  return (
    <>
      <NavBar />
      <div className="parent">
        <SearchBar />
        <PostedAnnonce />
      </div>
    </>
  );
}
export default Home;
