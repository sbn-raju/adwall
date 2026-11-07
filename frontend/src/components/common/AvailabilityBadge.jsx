import React from "react";
import { Badge } from "@chakra-ui/react";
import { CircleCheck, CircleX } from "lucide-react";

export default function AvailabilityBadge({ available, ...rest }) {
  return (
    <Badge
      colorPalette={available ? "green" : "red"}
      variant="subtle"
      size="md"
      rounded="full"
      px={2.5}
      {...rest}
    >
      {available ? <CircleCheck /> : <CircleX />}
      {available ? "Available" : "Not Available"}
    </Badge>
  );
}
