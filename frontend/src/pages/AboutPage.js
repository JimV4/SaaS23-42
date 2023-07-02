import classes from "./AboutPage.module.css";

function AboutPage() {
  return (
    <div className={classes.container}>
      <p className={classes.title}>about myCharts</p>

      <div className={classes.subcontainer}>
        <span className={classes.subtitle}>who we are</span>
        <div className={classes.whoweare}>
          At myCharts, we are a dedicated team of software developers passionate
          about empowering individuals and businesses with powerful chart
          creation and management tools. Our mission is to provide a seamless
          and intuitive experience for our users, allowing them to effortlessly
          create, customize, and analyze visually stunning charts. With years of
          collective expertise in software development and data visualization,
          we have poured our knowledge and creativity into crafting the myCharts
          software. Our team understands the importance of clear and compelling
          data representation, and we strive to make the process as efficient
          and enjoyable as possible.Through meticulous attention to detail and
          rigorous testing, we have built myCharts to be a reliable and robust
          tool for professionals in various industries. Whether you are a data
          analyst, researcher, educator, or business owner, our software is
          designed to meet your unique charting needs. We are committed to
          continuously improving myCharts by incorporating user feedback and
          staying up to date with the latest advancements in data visualization
          technology. We believe in the power of visual storytelling and aim to
          empower our users to effectively communicate their data-driven
          insights. Join us on this exciting journey as we revolutionize the way
          charts are created and managed. Discover the endless possibilities
          that myCharts offers and unlock the true potential of your data.
        </div>
      </div>

      <div className={classes.subcontainer}>
        <span className={classes.subtitle}>pricing</span>
        <div className={classes.whoweare}>
          We are happy to inform you that the first 10 charts you will create
          are free of charge! After 10 charts, the pricing goes as follows:
          <br></br>Line Chart:
          <br></br>Multi Axis Line Chart:
          <br></br>Polar Chart:
          <br></br>Scatter Chart:
          <br></br>Radar Chart:
          <br></br>Bubble Chart:
        </div>
      </div>

      <div className={classes.subcontainer}>
        <span className={classes.subtitle}>for developers</span>
        <div className={classes.whoweare}>
          At myCharts, we value the collaborative spirit of the developer
          community, and we welcome contributions from developers like you. By
          joining our project, you have the opportunity to shape the future of
          data visualization and make a meaningful impact. We believe in the
          power of open-source software and the collective knowledge it
          harnesses. Whether you're a seasoned developer or just starting your
          coding journey, there are numerous ways you can get involved in the
          myCharts project. You can dive into our codebase, explore the
          documentation, and help us enhance existing features or develop new
          ones. We encourage you to bring your creative ideas and
          problem-solving skills to the table, as we are always looking to
          innovate and push the boundaries of charting technology. If you have a
          knack for UX/UI design, you can contribute by improving the user
          interface and user experience of myCharts. We value user-centric
          design principles and strive to create a seamless and intuitive
          experience for our users. Not only will you have the chance to
          collaborate with a team of like-minded developers, but you'll also
          gain valuable experience, expand your knowledge, and make a difference
          in the world of data visualization. To get started, head over to our
          GitHub repository, where you'll find the project's source code, issue
          tracker, and guidelines for contributing. Join our vibrant developer
          community, engage in discussions, and let's work together to shape the
          future of myCharts.
        </div>
        <div className={classes.end}>
          <a href="https://github.com/ntua/SaaS23-42">github repo</a>
          <a href="https://www.instagram.com/example">instagram</a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
