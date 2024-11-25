import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((res) => {
      setDataSource(res.books);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Courses</Typography.Title>
      <Table
        loading={loading}
        columns={[
          
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Rating",
            dataIndex: "rating",
            render: (rating) => {
              return <Rate value={rating} allowHalf disabled />;
            },
          },
          {
            title: "Stock",
            dataIndex: "stock_left",
          },

          {
            title: "Author",
            dataIndex: "author",
          },
          {
            title: "Category",
            dataIndex: "category",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Inventory;
