import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory, getOrders,getWork } from "../../API";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getWork().then((res) => {
      setDataSource(res.jobs);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Details</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Positon",
            dataIndex: "title",
          },
          {
            title: "Salary",
            dataIndex: "salary",
            render: (value) => <span>${value}</span>,
          },
         
          {
            title: "Experience Required in Years",
            dataIndex: "experience_required",
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
export default Orders;
