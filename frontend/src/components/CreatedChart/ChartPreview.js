import classes from "./ChartPreview.module.css";
import { useEffect, useState } from "react";

function ChartPreview(props) {
  console.log(props.imgPath);

  const imgPath = props.imgPath;
  const parts = imgPath.split("/");
  let newPath = parts[0];

  let chartTitle = newPath
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (!chartTitle.includes("Chart")) {
    chartTitle = chartTitle + " Chart";
  }

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
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && <p>{`Your ${chartTitle} is ready!`}</p>}

      <div className={classes["chart-preview"]}>
        {image && (
          <img className={classes.image} src={image} alt="Your Created Chart" />
        )}
      </div>
    </>
  );
}

export default ChartPreview;
