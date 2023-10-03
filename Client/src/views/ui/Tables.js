import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Row, Table } from "reactstrap";

import { PaginationControl } from "react-bootstrap-pagination-control";

const Tables = () => {
  // Sample data
  const [tableData, setTableData] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/sensor-data"); // Đảm bảo URL chính xác
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu từ máy chủ");
        }
        const data = await response.json();
        setTableData(data.sensorData);
        console.log(tableData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    // Gọi fetchData() lần đầu khi component được render
    fetchData();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Number of items per page
  const itemsPerPage = 10;

  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const [page, setPage] = useState(1);
  return (
    <Row>
      <Col lg='12'>
        <Card>
          <CardTitle tag='h6' className='border-bottom p-3 mb-0'>
            <i className='bi bi-card-text me-2'> </i>
            Table with Striped
          </CardTitle>
          <CardBody>
            <Table bordered striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>TIME</th>
                  <th>TEMPERATURE</th>
                  <th>HUMIDITY</th>
                  <th>BRIGHTNESS</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <th scope='row'>{item.id}</th>
                    <td>{item.timestamp}</td>
                    <td>{item.temperature}</td>
                    <td>{item.humidity}</td>
                    <td>{item.light}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <PaginationControl
              page={page}
              between={4}
              total={totalPages}
              limit={20}
              changePage={(page) => {
                setPage(page);
                handlePageClick(page);
              }}
              ellipsis={1}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Tables;
