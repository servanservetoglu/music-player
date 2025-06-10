import "./index.css";
import PodCast from "./components/PodCast/MusicPlayer";
function App() {
  const MusicList = [
    {
      name: "Bu da geçer mi sevgilim",
      singer: "yalın",
      file: "./mp3/1.mp3",
      img: "./img/1.jpeg",
    },
  ];
  return (
    <>
      <div className="bg-dark w-10 h-10"></div>
      <PodCast musicList={MusicList} />
    </>
  );
}

export default App;
