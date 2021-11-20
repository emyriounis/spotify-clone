import "../styles/Home.css";
import TopNav from "./TopNav";
import AlbumList from "./AlbumList";

const Home = ({ handleShow }) => {
  return (
    <div className="px-5 py-4 mb-5">
      <AlbumList category="Pop" />
      <AlbumList category="Jazz" />
      <AlbumList category="House" />
    </div>
  );
};

export default Home;
