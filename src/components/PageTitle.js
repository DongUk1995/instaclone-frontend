import { PropTypes } from "prop-types";
import { Helmet } from "react-helmet-async";

function PageTitle({ title }) {
  return (
    <Helmet>
      <title>{title} | Instagram</title>
    </Helmet>
  );
}

PageTitle.proptype = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
