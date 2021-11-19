import "../styles/Home.css";
import { useState, useEffect } from "react";
import { Stack } from "react-bootstrap";
import TopNav from "./TopNav";
import SingleAlbum from "./SingleAlbum";
import Error from "./Error";

const Home = ({ handleShow }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getSongs = async (query) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
      );
      if (!response.ok) {
        setError("failed to fetch");
      } else {
        const data = await response.json();
        setSongs(data.data);
        return data;
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSongs("pop");
  }, []);

  if (error) <Error error={error} />;
  return (
    <div className="p-3">
      <TopNav handleShow={handleShow} />
      <Stack
        className="d-flex justify-content-between flex-wrap"
        direction="horizontal"
        gap={3}
      >
        {songs.map((song) => (
          <SingleAlbum
            key={song.id}
            cover={song.album.cover_medium}
            title={song.title_short}
          />
        ))}
      </Stack>
    </div>
  );
};

export default Home;
