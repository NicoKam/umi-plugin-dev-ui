import React, { useState, useEffect, useCallback } from 'react';
import { Input, Table, Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import styles from './${pascalCase(option.name)}Page.less';

/* 示例代码 模拟搜索方法 实际开发时请移除 */
function searchService(keyword) {
  const data = {
    'pageSize': 5,
    'pageNum': 1,
    'totalCount': 100,
    'dataList': [{
      'id': '1',
      'phone': '8-650-236-1565',
      'emailAddress': 'Luna_Gosling7859@mafthy.com',
      'name': 'Luna Gosling',
      'status': '2',
      'date': '2020-01-06 14:34:39',
    }, {
      'id': '2',
      'phone': '7-841-838-4308',
      'emailAddress': 'Alan_Ebbs6976@infotech44.tech',
      'name': 'Alan Ebbs',
      'status': '0',
      'date': '2020-02-01 16:13:22',
    }, {
      'id': '3',
      'phone': '1-620-252-4376',
      'emailAddress': 'Josh_Gunn1762@brety.org',
      'name': 'Josh Gunn',
      'status': '0',
      'date': '2020-02-20 07:03:43',
    }, {
      'id': '4',
      'phone': '1-662-105-7583',
      'emailAddress': 'Jayden_Rycroft5728@gembat.bi',
      'name': 'Jayden Rycroft',
      'status': '0',
      'date': '2020-01-07 15:46:40',
    }, {
      'id': '5',
      'phone': '8-213-642-8631',
      'emailAddress': 'Martin_Yates9991@deons.tech',
      'name': 'Martin Yates',
      'status': '1',
      'date': '2020-02-17 02:28:40',
    }],
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, 100);
  });
}

/* 示例代码：结束 */

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'emailAddress',
    key: 'emailAddress',
  },
  {
    title: '变更日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
];

/* 函数组件的等价写法 */
const ${pascalCase(option.name)}Page = () => {
  const dispatch = useDispatch();

  const keyword = useSelector((store) => {
    return store.public.keyword;
  });

  const [dataList, setDataList] = useState([]);

  const search = useCallback(() => {
    const result = searchService(keyword);
    result.then((res) => {
      setDataList(res.data.dataList);
    });
  }, []);

  const handleChange = useCallback(
    (event) => {
      dispatch({
        type: 'public/update',
        keyword: event.target.value,
      });
    },
    [],
  );

  useEffect(() => {
    search();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.filter}>
        <div>关键字：</div>
        <Input className={styles.input} value={keyword} onChange={handleChange} />
        <div style={{ flex: '1' }} />
        <Button type="primary" onClick={search}>
          搜索
        </Button>
      </div>
      <div className={styles.content}>
        <Table rowKey="id" columns={columns} dataSource={dataList} />
      </div>
    </div>
  );
};

export default ${pascalCase(option.name)}Page;
