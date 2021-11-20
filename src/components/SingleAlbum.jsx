import "../styles/SingleAlbum.css";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PlayCircleFill } from "react-bootstrap-icons";

const SingleAlbum = ({ id, cover, title }) => {
  return (
    <div className="singleAlbum text-center w-100">
      <Link className="link albumLink" to={`/album/${id}`}>
        <PlayCircleFill className="playButton" size={25} />
        <Image className="albumImg" src={cover} />
        <div className="text-light p-1">{title}</div>
      </Link>
    </div>
  );
};

export default SingleAlbum;
