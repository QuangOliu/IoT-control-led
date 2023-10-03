import React, { useEffect, useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { Card, CardBody, CardTitle, Col, Row, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Tables = () => {
  // Sample data
  const [tableData, setTableData] = useState([{}]);

  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/history"); // Đảm bảo URL chính xác
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu từ máy chủ");
        }
        const data = await response.json();
        setTableData(data.historyData);
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
                  <th>TYPE</th>
                  <th>STATE</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <th scope='row'>{item.id}</th>
                    <td>{item.timestamp}</td>
                    <td>{item.led_id}</td>
                    <td>{item.state ? "ON" : "OFF"}</td>
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
