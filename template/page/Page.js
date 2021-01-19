import React from "react";

import styles from "./${pascalCase(option.name)}Page.less";

class ${pascalCase(option.name)}Page extends React.Component{
  render() {
    return (
      <div className={styles.root}>
        This is ${pascalCase(option.name)}
      </div>
    );
  }
};

export default ${pascalCase(option.name)}Page;
