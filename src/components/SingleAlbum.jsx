import { Image } from "react-bootstrap";

const SingleAlbum = ({ cover, title }) => {
  return (
    <div className="text-light text-center" style={{ width: "200px" }}>
      <Image
        src={cover}
        width="200px"
        height="200px"
        style={{ boxShadow: "5px 5px 50px 10px rgba(0,0,0,0.4)" }}
      />
      <div className="p-1">{title}</div>
    </div>
  );
};

export default SingleAlbum;
