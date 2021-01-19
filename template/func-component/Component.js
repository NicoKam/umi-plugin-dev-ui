import React from "react";
import PropTypes from "prop-types";

import styles from "./${pascalCase(option.name)}.less";

const ${pascalCase(option.name)} = (props) => {
  const { className, ...otherProps } = props;
  return (
    <div className={`\${styles.root} \${className}`} {...otherProps}>
      This is ${pascalCase(option.name)}
    </div>
  );
};

${pascalCase(option.name)}.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

${pascalCase(option.name)}.defaultProps = {
  className: "",
  style: {},
};

export default ${pascalCase(option.name)};
