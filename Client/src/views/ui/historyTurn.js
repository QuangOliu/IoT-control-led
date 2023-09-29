import React, { useState } from "react";
import { Card, CardBody, CardTitle, Col, Row, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Tables = () => {
  // Sample data
  const tableData = [
    // time
    // temperature
    // humidity
    // brightness
    { id: 1, time: "2002-09-24-06:00", person: "Quang", type:"Light", action: "ON" },
    { id: 2, time: "2002-09-24-06:00", person: "Quang", type:"Light", action: "OFF" },
    { id: 3, time: "2002-09-24-06:00", person: "Quang", type:"FAN", action: "ON" },
    // Add more data as needed
  ];

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
                  <th>PERSON</th>
                  <th>TYPE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <th scope='row'>{item.id}</th>
                    <td>{item.time}</td>
                    <td>{item.person}</td>
                    <td>{item.type}</td>
                    <td>{item.action}</td>
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
