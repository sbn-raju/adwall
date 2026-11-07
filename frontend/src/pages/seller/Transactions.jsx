import React, { useState, useEffect } from "react";
import { Alert, Badge, Box, Card, Table, Text } from "@chakra-ui/react";
import toast from "react-hot-toast";
import moment from "moment";
import BASE_URI from "../../utils/base_uri";
import Loader from "../../components/Loader";
import PageHeader from "../../components/common/PageHeader";
import PaginationBar from "../../components/common/PaginationBar";
import EmptyList from "../../components/common/EmptyList";

const statusPalette = (status) => (status === "completed" ? "green" : status === "pending" ? "orange" : "red");

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const transactionsPerPage = 10;

  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URI}/order/list?page=${currentPage}&limit=${transactionsPerPage}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setTransactions(data.data);
        setTotalCount(data.totalCount);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  return (
    <Box>
      <PageHeader title="Transaction History" description="All payments made for your wall rentals." />

      <Alert.Root status="info" mb={6} rounded="lg">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Payment status can take a moment to update</Alert.Title>
          <Alert.Description>
            If your payment status doesn't change to success after some time, please contact customercare@adwall.com.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      {isLoading ? (
        <Loader />
      ) : transactions.length === 0 ? (
        <EmptyList title="No transactions yet" description="Payments you make will show up here." />
      ) : (
        <Card.Root variant="outline" bg="bg.panel" overflow="hidden">
          <Table.ScrollArea>
            <Table.Root size="md" interactive>
              <Table.Header>
                <Table.Row bg="bg.subtle">
                  <Table.ColumnHeader>Transaction</Table.ColumnHeader>
                  <Table.ColumnHeader>Wall</Table.ColumnHeader>
                  <Table.ColumnHeader>Order ID</Table.ColumnHeader>
                  <Table.ColumnHeader>Date</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">Amount</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {transactions.map((transaction) => (
                  <Table.Row key={transaction.id}>
                    <Table.Cell fontWeight="medium">#{transaction?.id}</Table.Cell>
                    <Table.Cell>
                      <Text>{transaction?.walls?.name}</Text>
                      <Text textStyle="xs" color="fg.muted">
                        Product #{transaction?.walls?.id}
                      </Text>
                    </Table.Cell>
                    <Table.Cell fontFamily="mono" textStyle="xs" color="fg.muted">
                      {transaction?.razorpay_order_id}
                    </Table.Cell>
                    <Table.Cell whiteSpace="nowrap">{moment(transaction?.created_at).format("DD MMM YYYY")}</Table.Cell>
                    <Table.Cell textAlign="end" fontWeight="semibold" whiteSpace="nowrap">
                      ₹ {transaction?.walls?.price}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={statusPalette(transaction?.payment_status)} variant="subtle" textTransform="capitalize">
                        {transaction?.payment_status}
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
        </Card.Root>
      )}

      <PaginationBar count={totalCount} pageSize={transactionsPerPage} page={currentPage} onPageChange={setCurrentPage} />
    </Box>
  );
}
