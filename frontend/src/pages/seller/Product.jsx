import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CloseButton,
  Dialog,
  Flex,
  Heading,
  Portal,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { TriangleAlert, Trash2, Undo2 } from "lucide-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URI from "../../utils/base_uri";
import Loader from "../../components/Loader";
import BackButton from "../../components/common/BackButton";
import WallDetailCard from "../../components/common/WallDetailCard";

function DangerRow({ title, description, action }) {
  return (
    <Flex justify="space-between" align={{ base: "start", sm: "center" }} gap={4} direction={{ base: "column", sm: "row" }}>
      <Stack gap={1} maxW="md">
        <Text fontWeight="semibold">{title}</Text>
        <Text textStyle="sm" color="fg.muted">
          {description}
        </Text>
      </Stack>
      {action}
    </Flex>
  );
}

export default function ProductSellerDetails() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { product_id } = useParams();

  //Getting the product id
  const singleProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URI}/product/single?product_id=${product_id}`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        setProduct(result?.data[0]);
      } else {
        toast.error("Unexcepted response from server");
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    singleProduct();
  }, []);

  // Function to handle delete (called after the user confirms in the dialog)
  const handleDelete = () => {
    console.log("Deleting the wall...");
    // API Call to delete
    setIsDeleteOpen(false);
  };

  // Function to handle retrieve
  const handleRetrieve = () => {
    toast("You can call the buyer and cancel the deal on some compensation.", { icon: "📞" });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box maxW="3xl" mx="auto">
      <BackButton mb={4} />
      <Stack gap={6}>
        <WallDetailCard product={product} available={!!product.is_available} />

        {/* Danger Zone */}
        <Card.Root variant="outline" borderColor="border.error" bg="bg.error/30">
          <Card.Header>
            <Heading as="h2" size="lg" color="fg.error" display="flex" alignItems="center" gap={2}>
              <TriangleAlert size={20} /> Danger Zone
            </Heading>
          </Card.Header>
          <Card.Body gap={5}>
            <DangerRow
              title="Delete this wall"
              description="Deleting this wall will permanently remove it from the database. This action CANNOT be undone."
              action={
                <Button colorPalette="red" onClick={() => setIsDeleteOpen(true)} flexShrink={0}>
                  <Trash2 /> Delete Wall
                </Button>
              }
            />
            <Separator borderColor="border.error" />
            <DangerRow
              title="Retrieve this wall"
              description="If you want to cancel the deal, you can contact the buyer and negotiate a cancellation with possible compensations."
              action={
                <Button colorPalette="orange" variant="outline" onClick={handleRetrieve} flexShrink={0}>
                  <Undo2 /> Retrieve Wall
                </Button>
              }
            />
          </Card.Body>
        </Card.Root>
      </Stack>

      <Dialog.Root role="alertdialog" open={isDeleteOpen} onOpenChange={(e) => setIsDeleteOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete this wall?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text color="fg.muted">
                  “{product.name}” will be permanently removed. This action cannot be undone.
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button colorPalette="red" onClick={handleDelete}>
                  Delete
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
