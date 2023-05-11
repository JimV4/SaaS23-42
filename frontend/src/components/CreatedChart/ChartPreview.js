import classes from "./ChartPreview.module.css";
import { useEffect, useState } from "react";

function ChartPreview(props) {
  console.log(props.imgPath);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function loadImage() {
      const image = await import(`../../assets/charts/${props.imgPath}`);
      setImage(image.default);
    }

    loadImage();
  }, []);

  return (
    <div className={classes["chart-preview"]}>
      {image && (
        <img
          className={classes.image}
          // src="../../assets/charts/multi-axis-line-chart/multi-axis-line-chart_dhmhtrhs.vassiliou_1683718427914.png"
          // src="../../assets/charts/multi-axis-line-chart/bubble.png"
          // src="../../assets/multi-axis-line-chart_dhmhtrhs.vassiliou_1683717606331.png"
          // src={`../../assets${props.imgPath}`}
          // src={image}
          src={image}
          alt="Your Created Chart"
        />
      )}
    </div>
  );
}

export default ChartPreview;
