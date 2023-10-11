import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Col, Input, Row, Table } from "reactstrap";
import ReactPaginate from "react-paginate";

const Tables = () => {
  // Sample data
  const [searchAttribute, setSearchAttribute] = useState("timestamp");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 20;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredData.slice(itemOffset, endOffset);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/sensor-data");
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu từ máy chủ");
      }
      const data = await response.json();
      setTableData(data.sensorData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 2000);
    fetchData();
    return () => {
      clearInterval(intervalId);
    };
  }, [searchTerm]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredData.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  useEffect(() => {
    filterData(searchTerm);
  }, [tableData]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const filterData = (term) => {
    const filtered1 = tableData.filter((item) => {
      // Use the selected attribute for filtering
      return item[searchAttribute].toString().toLowerCase() === term.toLowerCase();
    });
    const filtered2 = tableData.filter((item) => {
      // Use the selected attribute for filtering
      return item[searchAttribute].toString().toLowerCase().includes(term.toLowerCase());
    });

    // filtered2.sort((a, b) => {
    //   const valueA = a[searchAttribute].toString().toLowerCase();
    //   const valueB = b[searchAttribute].toString().toLowerCase();
    //   if (valueA < valueB) {
    //     return -1;
    //   }
    //   if (valueA > valueB) {
    //     return 1;
    //   }
    //   return 0;
    // });

    setFilteredData([...filtered1, ...filtered2]);
    setItemOffset(0); // Reset to the first page when filtering
  };
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handleSubmit = (e) => {
    e.preventDefault();
    // history.push();
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
            {/* <div className='search-bar mb-3'>
              <form onSubmit={handleSubmit}>
                <Input type='text' placeholder='Tìm kiếm' value={searchTerm} onChange={handleSearch} />
                <select value={searchAttribute} onChange={(e) => setSearchAttribute(e.target.value)}>
                  <option value='timestamp'>TIME</option>
                  <option value='temperature'>TEMPERATURE</option>
                  <option value='humidity'>HUMIDITY</option>
                  <option value='light'>BRIGHTNESS</option>
                  <option value='id'>#</option>
                </select>
              </form>
            </div> */}
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

            <ReactPaginate className='react-paginate' breakLabel='...' nextLabel='>' onPageChange={handlePageClick} pageRangeDisplayed={5} pageCount={totalPages} previousLabel='<' />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Tables;
