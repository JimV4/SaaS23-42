import classes from "./ChartPreview.module.css";
import { useEffect, useState } from "react";

function ChartPreview(props) {
  console.log(props.imgPath);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function handleIsLoading() {
    setIsLoading(!isLoading);
  }

  useEffect(() => {
    async function loadImage() {
      const image = await import(`../../assets/charts/${props.imgPath}`);
      handleIsLoading();
      setImage(image.default);
    }

    loadImage();
  }, [props.imgPath]);

  return (
    <div className={classes["chart-preview"]}>
      {image && (
        <img className={classes.image} src={image} alt="Your Created Chart" />
      )}
    </div>
  );
}

export default ChartPreview;
