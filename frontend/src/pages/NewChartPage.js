import Demos from "../components/NewChart/Demos";
import classes from "./NewChartPage.module.css";
import UploadForm from "../components/NewChart/UploadForm";

function NewChartPage() {
  return (
    <div className={classes.container}>
      <p>Let's create your own chart!</p>
      <Demos />
      <UploadForm />
    </div>
  );
}

export default NewChartPage;
