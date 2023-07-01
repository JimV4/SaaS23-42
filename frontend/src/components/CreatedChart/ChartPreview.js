import classes from "./ChartPreview.module.css";
import { useEffect, useState } from "react";

function ChartPreview(props) {
  // const [image, setImage] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // function handleIsLoading() {
  //   setIsLoading(!isLoading);
  // }

  /* useEffect(() => {
    async function loadImage() {
      const image = await import(`../../assets/charts/${props.imgPath}`);
      handleIsLoading();
      setImage(image.default);
    }

    loadImage();
  }, [props.imgPath]); */

  return (
    <>
      {/* {isLoading && <p>Loading...</p>} */}
      {/* {!isLoading && <p>{`Your ${chartTitle} is ready!`}</p>} */}

      <div className={classes["chart-preview"]}>
        {
          <img
            className={classes.image}
            src={props.image}
            alt="Your Created Chart"
          />
        }
      </div>
    </>
  );
}

export default ChartPreview;
