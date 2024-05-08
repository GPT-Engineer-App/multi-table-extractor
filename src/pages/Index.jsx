import React, { useState } from "react";
import { Container, VStack, Textarea, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading } from "@chakra-ui/react";

const Index = () => {
  const [inputData, setInputData] = useState("");
  const [tables, setTables] = useState([]);

  const handleInputChange = (event) => {
    setInputData(event.target.value);
  };

  const parseDataToTables = () => {
    const rows = inputData.split("\n");
    const newTables = [];
    let currentTable = [];

    rows.forEach((row) => {
      if (row.trim() === "") {
        if (currentTable.length > 0) {
          newTables.push(currentTable);
          currentTable = [];
        }
      } else {
        currentTable.push(row.split(",").map((cell) => cell.trim()));
      }
    });

    if (currentTable.length > 0) {
      newTables.push(currentTable);
    }

    setTables(newTables);
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={4} my={8}>
        <Heading as="h1" size="xl">
          Data Table Splitter
        </Heading>
        <Textarea placeholder="Enter data here, rows separated by newline, columns by commas. Use empty lines to separate tables." value={inputData} onChange={handleInputChange} height="200px" />
        <Button colorScheme="blue" onClick={parseDataToTables}>
          Generate Tables
        </Button>
        {tables.map((table, index) => (
          <TableContainer key={index}>
            <Heading as="h2" size="lg">
              Table {index + 1}
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {table[0].map((header, idx) => (
                    <Th key={idx}>{header}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {table.slice(1).map((row, idx) => (
                  <Tr key={idx}>
                    {row.map((cell, cellIdx) => (
                      <Td key={cellIdx}>{cell}</Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
