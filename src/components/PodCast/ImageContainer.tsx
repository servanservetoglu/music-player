import styles from "./podcast.module.css";

interface ImageFlowItem {
  img: string;
  name: string;
}

interface ContainerItem {
  imageFlow: ImageFlowItem;
}

function ImageContainer({ imageFlow }: ContainerItem) {
  return (
    <div className={styles.imgContainer}>
      <div className={styles.imageWrapper}>
        <img
          src={imageFlow.img}
          alt={imageFlow.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = imageFlow.name;
          }}
          className={styles.styledImg}
        />
      </div>
    </div>
  );
}

export default ImageContainer;
