import React from "react";
import { EmptyState, VStack } from "@chakra-ui/react";
import { Inbox } from "lucide-react";

export default function EmptyList({ title = "Nothing here yet", description, icon, children }) {
  return (
    <EmptyState.Root borderWidth="1px" borderStyle="dashed" rounded="xl" py={16}>
      <EmptyState.Content>
        <EmptyState.Indicator>{icon || <Inbox />}</EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          {description && <EmptyState.Description>{description}</EmptyState.Description>}
        </VStack>
        {children}
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
