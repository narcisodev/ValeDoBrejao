import Navbar from "../../components/navbar/Navbar";
import { useAtalhosGlobais } from "../../hooks/AtalhosGlobais";

export default function Main() {
  useAtalhosGlobais();

  return (
    <>
      <Navbar />
      <div>oiii</div>
    </>
  );
}
