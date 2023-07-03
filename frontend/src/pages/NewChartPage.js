import Demos from "../components/NewChart/Demos";
import classes from "./NewChartPage.module.css";
import UploadForm from "../components/NewChart/UploadForm";
import MyChartsLogoV from "../components/UI/MyChartsLogoV";

function NewChartPage() {
  return (
    <div className={classes.general}>
      {/* <MyChartsLogoV /> */}
      <div className={classes.container}>
        <p>Let's create your own chart!</p>
        <Demos />
        <UploadForm />
      </div>
    </div>
  );
}

export default NewChartPage;
