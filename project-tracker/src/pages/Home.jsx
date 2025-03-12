import { Link } from "react-router-dom";
import { Container } from "../components/Container";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-loGreen p-6 text-center">
      <h1 className="font-poppins text-7xl font-bold mb-20">My Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/dsa">
          <Container title="DSA" />
        </Link>
        <Link to="/mern">
          <Container title="MERN" />
        </Link>
        <Link to="/others">
          <Container title="Others" />
        </Link>
      </div>
    </div>
  );
}
