import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Field,
  FileUpload,
  Icon,
  Input,
  InputGroup,
  NativeSelect,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Textarea,
  useFileUpload,
} from "@chakra-ui/react";
import { ImageUp } from "lucide-react";
import toast from "react-hot-toast";
import BASE_URI from "../../utils/base_uri";
import PageHeader from "../../components/common/PageHeader";

const initialFormData = {
  wallName: "",
  description: "",
  location: "",
  image: null,
  dimensions: "",
  dimensionType: "ft",
  availability: true,
  price: "",
  priceType: "daily",
};

export default function WallForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const fileUpload = useFileUpload({
    maxFiles: 1,
    accept: "image/*",
    onFileChange: (details) => setFormData((prev) => ({ ...prev, image: details.acceptedFiles[0] || null })),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image of the wall");
      return;
    }

    setIsLoading(true);

    const finalData = new FormData();

    finalData.append("name", formData.wallName);
    finalData.append("description", formData.description);
    finalData.append("location", formData.location);
    finalData.append("image", formData.image);
    finalData.append("dimensions", formData.dimensions);
    finalData.append("dimensionType", formData.dimensionType);
    finalData.append("availability", formData.availability);
    finalData.append("price", formData.price);
    finalData.append("priceType", formData.priceType);

    try {
      const response = await fetch(`${BASE_URI}/product/add`, {
        method: "POST",
        credentials: "include",
        body: finalData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Data successfully posted");
        setFormData(initialFormData);
        fileUpload.clearFiles();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW="3xl">
      <PageHeader title="Post a Wall" description="Add your wall's details so buyers can find and rent it." />

      <Card.Root variant="outline" bg="bg.panel">
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <Stack gap={6}>
              <Field.Root required>
                <Field.Label>
                  Name of Wall <Field.RequiredIndicator />
                </Field.Label>
                <Input name="wallName" value={formData.wallName} onChange={handleChange} placeholder="e.g. MG Road Corner Billboard" />
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Description <Field.RequiredIndicator />
                </Field.Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  autoresize
                  placeholder="Foot traffic, visibility, nearby landmarks…"
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Location <Field.RequiredIndicator />
                </Field.Label>
                <Input name="location" placeholder="City" value={formData.location} onChange={handleChange} />
              </Field.Root>

              <FileUpload.RootProvider value={fileUpload} alignItems="stretch">
                <FileUpload.HiddenInput name="image" />
                <FileUpload.Label>
                  Upload Wall Image{" "}
                  <Text as="span" color="fg.error">
                    *
                  </Text>
                </FileUpload.Label>
                <FileUpload.Dropzone minH="36">
                  <Icon as={ImageUp} boxSize={7} color="fg.muted" />
                  <FileUpload.DropzoneContent>
                    <Text fontWeight="medium">Drag and drop an image here</Text>
                    <Text color="fg.muted" textStyle="sm">
                      or click to browse — PNG or JPG
                    </Text>
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.List showSize clearable />
              </FileUpload.RootProvider>

              <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4}>
                <Field.Root required gridColumn={{ sm: "span 2" }}>
                  <Field.Label>
                    Dimensions <Field.RequiredIndicator />
                  </Field.Label>
                  <Input name="dimensions" placeholder="Height * Breadth" value={formData.dimensions} onChange={handleChange} />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Unit</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field name="dimensionType" value={formData.dimensionType} onChange={handleChange}>
                      <option value="ft">Feet</option>
                      <option value="meter">Meters</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4}>
                <Field.Root required gridColumn={{ sm: "span 2" }}>
                  <Field.Label>
                    Price <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup startElement="₹">
                    <Input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="In Rs." min={0} />
                  </InputGroup>
                </Field.Root>
                <Field.Root>
                  <Field.Label>Price Type</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field name="priceType" value={formData.priceType} onChange={handleChange}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>
              </SimpleGrid>

              <Switch.Root
                name="availability"
                checked={formData.availability}
                onCheckedChange={(e) => setFormData((prev) => ({ ...prev, availability: e.checked }))}
                colorPalette="brand"
              >
                <Switch.HiddenInput />
                <Switch.Control />
                <Switch.Label>Available for rent</Switch.Label>
              </Switch.Root>

              <Button type="submit" colorPalette="brand" size="lg" loading={isLoading} loadingText="Publishing…">
                Submit Wall Listing
              </Button>
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
