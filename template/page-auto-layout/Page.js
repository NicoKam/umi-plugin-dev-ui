import React from "react";
import { Row, Col, Card } from "antd";
import styles from "./${pascalCase(option.name)}Page.less";

const ${pascalCase(option.name)}Page = (props) => {
  return (
    <div className={styles.root}>
      {/* 一个间距为16的行 */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card className={styles.card}>100%</Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card className={styles.card}>50%</Card>
        </Col>
        <Col span={12}>
          <Card className={styles.card}>50%</Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card className={styles.card}>
                33.3%
                <br/>
                注意看这一格的布局，我们可以认为，右侧格子占用了两行。
              </Card>
            </Col>
            <Col span={12}>
              <Card className={styles.card}>
                33.3%
                <br/>
                但换过来想，是当前行的这个大格子中有两小行。
                所以我们可以在一个Col中再嵌入两个Row，实现这样的效果。
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card className={styles.card}>66.6%</Card>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Card style={{ height: 120 + 120 + 16 }}>
            33.3%
            <br/>
            你会注意到，这一个格子和其他格子的高度都不一样。
            因为左侧的结构比较复杂，里面又包含了小格子。
            你需要单独指定这个格子的尺寸，才能使视觉效果比较好。
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ${pascalCase(option.name)}Page;
