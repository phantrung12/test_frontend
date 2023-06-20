import { Button, Input, Space, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { IPost } from '../../../types/Post.type';
import axios from 'axios';
import DetailPost from './component/DetailPost';
import { debounce } from 'lodash';
import { ColumnsType } from 'antd/lib/table';
import { EyeOutlined } from '@ant-design/icons';
import './postManagement.less';

const PostManagement = () => {
  const [postList, setPostList] = useState();
  const [postDetail, setPostDetail] = useState<IPost>();

  const getPostsList = async (userId?: string) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
      params: userId ? { userId } : null,
    });
    if (res.status === 200) {
      setPostList(res.data);
    }
  };

  useEffect(() => {
    getPostsList();
  }, []);

  const columns: ColumnsType<IPost> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      key: 'action',
      render: (value: string, record: IPost) => (
        <Button
          type="primary"
          onClick={() => setPostDetail(record)}
          icon={<EyeOutlined />}
        />
      ),
    },
  ];

  const handleSearch = useCallback(
    debounce((data: string) => {
      getPostsList(data);
    }, 500),
    [],
  );

  return (
    <div className="post-manage-container">
      <Space className="w-100 justify-end mb-24">
        <Input
          defaultValue={''}
          placeholder="User ID"
          onChange={event => handleSearch(event.target.value)}
        />
      </Space>
      <Table
        rowKey={record => record.id}
        columns={columns}
        dataSource={postList}
        pagination={{ position: ['bottomRight'] }}
      />
      <DetailPost
        post={postDetail}
        open={!!postDetail}
        onClose={() => setPostDetail(undefined)}
      />
    </div>
  );
};

export default PostManagement;
