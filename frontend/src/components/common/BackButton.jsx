import React from "react";
import { Button } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton(props) {
  const navigate = useNavigate();
  return (
    <Button type="button" variant="ghost" size="sm" onClick={() => navigate(-1)} {...props}>
      <ArrowLeft /> Back
    </Button>
  );
}
