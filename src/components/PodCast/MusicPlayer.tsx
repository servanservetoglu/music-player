import { useState } from "react";
import styles from "./podcast.module.css";
import ImageContainer from "./ImageContainer";
import PodcastNavbar from "./PodcastNavbar";

interface PlayList {
  musicList: {
    name: string;
    singer: string;
    file: string;
    img: string;
  }[];
}

function MusicPlayer({ musicList }: PlayList) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMusic = musicList[currentIndex];

  return (
    <div className={`${styles.mainLayout} ${styles.fullSize}`}>
      <div className={styles.relativeFullySize}>
        <div
          className={`${styles.bgLayout} ${styles.fullSize} ${styles.styledImg}`}
        />
        <div className={styles.container}>
          <ImageContainer imageFlow={currentMusic} />
          <PodcastNavbar
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            musicListLength={musicList?.length}
            currentMusic={currentMusic}
          />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
