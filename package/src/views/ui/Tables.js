import React, { useState } from "react";
import { Card, CardBody, CardTitle, Col, Row, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Tables = () => {
  // Sample data
  const tableData = [
    // time
    // temperature
    // humidity
    // brightness
    { id: 1, time: "123", temperature: "Otto", humidity: "@mdo", brightness: "123" },
    { id: 2, time: "123", temperature: "Thornton", humidity: "@fat", brightness: "123" },
    { id: 3, time: "123", temperature: "the Bird", humidity: "@twitter", brightness: "123" },
    // Add more data as needed
  ];

  // Number of items per page
  const itemsPerPage = 2;

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
                    <td>{item.time}</td>
                    <td>{item.temperature}</td>
                    <td>{item.humidity}</td>
                    <td>{item.brightness}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {Array.from({ length: Math.ceil(tableData.length / itemsPerPage) }).map((page, index) => (
                <PaginationItem key={index} active={currentPage === index + 1}>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageClick(index + 1);
                    }}
                    href='#'>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </Pagination>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Tables;
