import React from "react";
import { ButtonGroup, Flex, IconButton, Pagination } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationBar({ count, pageSize, page, onPageChange }) {
  if (!count || count <= pageSize) return null;

  return (
    <Flex justify="center" mt={10}>
      <Pagination.Root
        count={count}
        pageSize={pageSize}
        page={page}
        onPageChange={(details) => onPageChange(details.page)}
      >
        <ButtonGroup variant="ghost" size="sm" attached={false}>
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <ChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(item) => (
              <IconButton variant={{ base: "ghost", _selected: "solid" }} colorPalette="brand">
                {item.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Flex>
  );
}
