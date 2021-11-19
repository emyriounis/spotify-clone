import "../styles/Sidebar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Loading from "./Loading";
import { Stack, InputGroup, FormControl, Offcanvas } from "react-bootstrap";
import Error from "./Error";

const Sidebar = ({ show, handleClose }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

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
    if (search === "") {
      setSongs([]);
    } else getSongs(search);
  }, [search]);

  if (error) <Error error={error} />;
  return (
    <>
      <Offcanvas className="offcanvas" show={show} onHide={handleClose}>
        <Offcanvas.Header className="pe-3" closeVariant="white" closeButton>
          <Offcanvas.Title>
            <Image
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
              alt="spotify logo"
              width="150px"
              className="p-3"
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <nav className="text-light p-1">
          <Stack
            className="stack d-flex flex-column justify-content-between"
            gap={1}
          >
            <div className="d-flex flex-column justify-content-start">
              <Link className="link d-flex align-items-center px-3 py-1" to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-house-door-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                </svg>
                <span className="ms-2">Home</span>
              </Link>
              <InputGroup className="d-flex align-items-center px-3 py-1">
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search"
                  onChange={(event) => setSearch(event.target.value)}
                />
              </InputGroup>
              <Link className="link d-flex align-items-center px-3 py-1" to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-collection-play-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z" />
                </svg>
                <span className="ms-2">Your Library</span>
              </Link>
              <Link className="link d-flex align-items-center px-3 py-1" to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                </svg>
                <span className="ms-2">Create Playlist</span>
              </Link>
              <Link className="link d-flex align-items-center px-3 py-1" to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
                <span className="ms-2">Liked Songs</span>
              </Link>
              {songs.length > 0 && (
                <div className="albumsList border-secondary border-top border-bottom mx-3">
                  {songs.map((song, index) => (
                    <Link
                      key={index}
                      className="link d-flex align-items-center py-1"
                      to="/album"
                    >
                      {song.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              className="link user d-flex align-items-center px-3 py-1 mb-5"
              to="/profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              <span className="px-2">Eleftherios Myriounis</span>
            </Link>
          </Stack>
        </nav>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
