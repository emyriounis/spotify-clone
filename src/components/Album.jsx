import { useParams } from "react-router";

const Album = () => {
  const params = useParams();
  return <div className="px-5 py-4 mb-5">{params.id}</div>;
};

export default Album;
